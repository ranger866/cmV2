<!-- Modal -->
<div class="modal fade" id="contactModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-md modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalTitle">Tambah Kontak</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <form id="contactForm">
          <input type="hidden" id="contactId" name="id">
          <div class="mb-3">
            <label class="form-label fw-semibold">Nama</label>
            <input id="name" name="name" class="form-control" required>
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Email</label>
            <input id="email" name="email" type="email" class="form-control">
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Telepon</label>
            <input id="phone" name="phone" class="form-control">
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Jenis Kelamin</label>
            <select id="gender" name="gender" class="form-control">
              <option value="">--Pilih Jenis Kelamin--</option>
              <option value="Laki-Laki">Laki-Laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Group</label>
            <select id="group" name="group" class="form-control">
              <option value="">--Pilih Group Contact--</option>
              <option value="Keluarga">Keluarga</option>
              <option value="Kantor">Kantor</option>
              <option value="Teman">Teman</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Alamat</label>
            <textarea id="address" name="address" class="form-control" rows="2"></textarea>
          </div>
        </form>
        <div id="formErrors" class="text-danger small mt-2"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Batal</button>
        <button id="saveBtn" type="button" class="btn btn-primary">Simpan</button>
      </div>
    </div>
  </div>
</div>