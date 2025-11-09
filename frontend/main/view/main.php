<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: /view/auth.php");
    exit;
}
$user = $_SESSION['username'] ?? 'Guest';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard - Contact Manager</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
  <link rel="stylesheet" href="/css/main.css">
</head>
<body>
  <div class="d-flex" id="wrapper">
    <!-- Sidebar -->
    <div class="sidebar p-3 border-end">
      <h4 class="text-center mb-4 side-text">📇 Manager</h4>
      <ul class="nav flex-column" id="menuLinks">
        <li class="nav-item"><a href="#" data-page="dashboard" class="nav-link active"><i class="bi bi-speedometer2 me-2"></i>Dashboard</a></li>
        <li class="nav-item"><a href="#" data-page="contacts" class="nav-link"><i class="bi bi-person-lines-fill me-2"></i>Contacts</a></li>
      </ul>
    </div>

    <!-- Content -->
    <div class="flex-grow-1">
      <div class="topbar p-3 d-flex justify-content-between align-items-center border-bottom">
        <div class="fw-bold fs-5" id="pageTitle">Dashboard</div>
        <div>
          <button id="toggleDarkMode" class="btn btn-outline-secondary rounded-circle me-2">
            <i class="bi bi-moon-fill"></i>
          </button>
          <span class="me-3"><?= htmlspecialchars($user) ?></span>
          <a href="/view/logout.php" class="btn btn-outline-danger btn-sm">Logout</a>
        </div>
      </div>

      <div class="p-4" id="content-area">
        <div class="text-center py-5 text-secondary">Loading content...</div>
      </div>
    </div>
  </div>

  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  <script src="/js/main.js"></script>
</body>
</html>
