<?php
// api/auth.php
// Authentication API: register, login, logout
header('Content-Type: application/json');
require_once __DIR__ . '/../config/config.php';

$action = $_POST['action'] ?? ($_GET['action'] ?? '');

function respond($arr){ echo json_encode($arr); exit; }

if ($action === 'register') {
    $username = trim($_POST['username'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');
    if ($username === '' || $email === '' || $password === '') respond(['success'=>false,'message'=>'All fields required']);
    // check exists
    $stmt = $pdo->prepare('SELECT id FROM users WHERE username = :u OR email = :e');
    $stmt->execute(['u'=>$username,'e'=>$email]);
    if ($stmt->fetch()) respond(['success'=>false,'message'=>'Username or email already exists']);
    $hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare('INSERT INTO users (username, email, password_hash) VALUES (:u, :e, :p)');
    $stmt->execute(['u'=>$username,'e'=>$email,'p'=>$hash]);
    respond(['success'=>true,'message'=>'Registered successfully']);
}

if ($action === 'login') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');
    if ($username === '' || $password === '') respond(['success'=>false,'message'=>'All fields required']);
    $stmt = $pdo->prepare('SELECT id, username, password_hash FROM users WHERE username = :u OR email = :e LIMIT 1');
    $stmt->execute(['u'=>$username, 'e'=>$username]);
    $user = $stmt->fetch();
    if ($user && password_verify($password, $user['password_hash'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        respond(['success'=>true,'message'=>'Login successful']);
    } else respond(['success'=>false,'message'=>'Invalid credentials']);
}

if ($action === 'logout') {
    session_unset();
    session_destroy();
    respond(['success'=>true,'message'=>'Logged out']);
}

respond(['success'=>false,'message'=>'Invalid action']);
?>