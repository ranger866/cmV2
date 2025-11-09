<link rel="stylesheet" href="/css/contacts.css">
<script src="/js/contacts.js"></script>

<div class="container-fluid">
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h3 class="fw-semibold mb-0">Daftar Contacts</h3>
    <div class="d-flex flex-row align-items-center card shadow-sm border-0 p-2 h100 sf">
      <input class="form-control search" type="text" name="search" id="search" placeholder="Cari Kontak">
      <select name="filterGender" id="filterGender" class="form-select">
        <option value="">Semua Gender</option>
        <option value="Laki-Laki">Laki-Laki</option>
        <option value="Perempuan">Perempuan</option>
      </select>
      <select name="filterGroup" id="filterGroup" class="form-select">
        <option value="">Semua Group</option>
        <option value="Keluarga">Keluarga</option>
        <option value="Kantor">Kantor</option>
        <option value="Teman">Teman</option>
      </select>
      <button class="btn btn-primary add d-flex " id="addBtn"><i class="bi bi-plus-lg me-1"></i>Tambah</button>
    </div>
  </div>
  <div class="contact-wrap p-3">
    <div id="contactArea" class="mt-3">
      <div class="alert alert-info">No contacts available yet.</div>
    </div>
  </div>

  <?php include "modal.php" ?>
