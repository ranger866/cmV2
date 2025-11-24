<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../config/config.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

function parse_input(): array {
    $raw = file_get_contents('php://input');
    $json = json_decode($raw, true);
    if (json_last_error() === JSON_ERROR_NONE && is_array($json)) {
        return $json;
    }
    parse_str($raw, $parsed);
    return $parsed ?: [];
}

try {
    switch ($method) {
        case 'GET':
            if (isset($_GET['id'])) {
                $id = (int)$_GET['id'];
                $stmt = $pdo->prepare("SELECT * FROM contacts WHERE id = :id AND user_id = :uid");
                $stmt->execute(['id' => $id, 'uid' => $_SESSION['user_id']]);
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                if (!$row) {
                    http_response_code(404);
                    echo json_encode(['success' => false, 'message' => 'Contact not found']);
                } else {
                    echo json_encode(['success' => true, 'data' => $row]);
                }
                exit;
            };

            $q = trim($_GET['q'] ?? '');
            $gender = trim($_GET['gender'] ?? '');
            $group = trim($_GET['group'] ?? '');
            $where = "WHERE user_id = :uid";
            $params = ['uid' => $_SESSION['user_id']];

            if ($q !== '') {
                $where .= " AND (LOWER(name) LIKE :q_name OR LOWER(email) LIKE :q_email OR LOWER(phone) LIKE :q_phone)";
                $params['q_name'] = '%' . strtolower($q) . '%';
                $params['q_email'] = '%' . strtolower($q) . '%';
                $params['q_phone'] = '%' . strtolower($q) . '%';
            }
            if ($gender !== '') {
                $where .= " AND gender = :gender";
                $params['gender'] = $gender;
            }
            if ($group !== '') {
                $where .= " AND group_contacts = :groupVal";
                $params['groupVal'] = $group;
            }

            $countStmt = $pdo->prepare("SELECT COUNT(*) FROM contacts $where");
            $countStmt->execute($params);
            $total = (int)$countStmt->fetchColumn();

            $sql = "SELECT * FROM contacts $where ORDER BY created_at DESC";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode([
                'success' => true,
                'data' => $rows,
                'meta' => [
                    'total' => $total,
                ]
            ]);
            exit;

        case 'POST':
            $input = $_POST;
            if (empty($input)) {
                $raw = parse_input();
                if (is_array($raw)) $input = $raw;
            }

            $name = trim($input['name'] ?? '');
            $email = trim($input['email'] ?? '');
            $phone = trim($input['phone'] ?? '');
            $gender = trim($input['gender'] ?? '');
            $group = trim($input['group'] ?? '');
            $address = trim($input['address'] ?? '');

            $errors = [];
            if ($name === '') $errors[] = 'Name is required';
            if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Invalid email format';
            if (strlen($name) > 255) $errors[] = 'Name too long';
            if (strlen($email) > 320) $errors[] = 'Email too long';
            if (strlen($phone) > 30) $errors[] = 'Phone too long';
            if (strlen($address) > 1000) $errors[] = 'Address too long';

            if (!empty($errors)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'errors' => $errors]);
                exit;
            }

            $stmt = $pdo->prepare("INSERT INTO contacts 
                (user_id, name, email, phone, gender, group_contacts, address) 
                VALUES (:uid, :name, :email, :phone, :gender, :groupVal, :address)");
            $stmt->execute([
                'uid' => $_SESSION['user_id'],
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'gender' => $gender,
                'groupVal' => $group,
                'address' => $address
            ]);

            echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
            exit;

        case 'PUT':
            $input = parse_input();
            $id = (int)($input['id'] ?? 0);
            if ($id <= 0) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Invalid ID']);
                exit;
            }

            $name = trim($input['name'] ?? '');
            $email = trim($input['email'] ?? '');
            $phone = trim($input['phone'] ?? '');
            $gender = trim($input['gender'] ?? '');
            $group = trim($input['group'] ?? '');
            $address = trim($input['address'] ?? '');

            $errors = [];
            if ($name === '') $errors[] = 'Name is required';
            if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Invalid email format';

            if (!empty($errors)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'errors' => $errors]);
                exit;
            }

            $stmt = $pdo->prepare("UPDATE contacts 
                SET name=:name, email=:email, phone=:phone, gender=:gender, group_contacts=:groupVal, address=:address 
                WHERE id=:id AND user_id=:uid");
            $stmt->execute([
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'gender' => $gender,
                'groupVal' => $group,
                'address' => $address,
                'id' => $id,
                'uid' => $_SESSION['user_id']
            ]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Contact not found or unchanged']);
                exit;
            }

            echo json_encode(['success' => true]);
            exit;

        case 'DELETE':
            $input = parse_input();
            $id = (int)($input['id'] ?? 0);

            if ($id <= 0) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Invalid ID']);
                exit;
            }

            $stmt = $pdo->prepare("DELETE FROM contacts WHERE id=:id AND user_id=:uid");
            $stmt->execute(['id' => $id, 'uid' => $_SESSION['user_id']]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Contact not found or not owned by user']);
                exit;
            }

            echo json_encode(['success' => true]);
            exit;

        default:
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Method not allowed']);
            exit;
    }
} catch (PDOException $e) {
    error_log("contacts.php PDO Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error']);
    exit;
}
