<?php
// public/auth.php
// Modernized login + register page with Bootstrap 5 & jQuery front-end.
session_start();
if (isset($_SESSION['user_id'])) {
    header('Location: /view/main.php');
    exit;
}
?>
<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Auth - Contact Manager</title>
  <link rel="stylesheet" href="/css/auth.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">

</head>
<body>

  <div class="auth-card shadow">
    <h4 class="mb-4 text-center">🔐 Contact Manager</h4>

    <div id="alertBox" class="alert alert-danger text-center py-2" style="display:none;"></div>

    <!-- Login Form -->
    <form id="loginForm">
      <div class="mb-3">
        <label class="form-label fw-semibold">Username atau Email</label>
        <input id="loginUsername" class="form-control" placeholder="Masukkan username atau email" required>
      </div>
      <div class="mb-3">
        <label class="form-label fw-semibold">Password</label>
        <input id="loginPassword" type="password" class="form-control" placeholder="Masukkan password" required>
      </div>
      <div class="d-grid gap-2 mt-4">
        <button type="submit" class="btn btn-primary">Masuk</button>
        <button type="button" id="showRegister" class="btn btn-outline-secondary toggle-btn">Belum punya akun? Daftar</button>
      </div>
    </form>

    <!-- Register Form -->
    <form id="registerForm" style="display:none;">
      <div class="mb-3">
        <label class="form-label fw-semibold">Username</label>
        <input id="regUsername" class="form-control" placeholder="Pilih username" required>
      </div>
      <div class="mb-3">
        <label class="form-label fw-semibold">Email</label>
        <input id="regEmail" type="email" class="form-control" placeholder="Masukkan email aktif" required>
      </div>
      <div class="mb-3">
        <label class="form-label fw-semibold">Password</label>
        <input id="regPassword" type="password" class="form-control" placeholder="Buat password" required>
      </div>
      <div class="d-grid gap-2 mt-4">
        <button type="submit" class="btn btn-success">Daftar</button>
        <button type="button" id="showLogin" class="btn btn-outline-secondary toggle-btn">Sudah punya akun? Masuk</button>
      </div>
    </form>
  </div>

  <script src="/js/auth.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>
