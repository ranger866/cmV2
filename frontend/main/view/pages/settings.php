<div class="container-fluid">
  <h3 class="fw-semibold mb-4">Settings</h3>
  <form id="settingsForm" class="w-50">
    <div class="mb-3">
      <label class="form-label">Username</label>
      <input type="text" class="form-control" value="<?= htmlspecialchars($_SESSION['username'] ?? '') ?>" disabled>
    </div>
    <div class="mb-3">
      <label class="form-label">Email Notifications</label>
      <select class="form-select" name="notifications">
        <option>Enabled</option>
        <option>Disabled</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Theme Preference</label>
      <select class="form-select" name="theme">
        <option>Light</option>
        <option>Dark</option>
        <option>System Default</option>
      </select>
    </div>
    <button type="submit" class="btn btn-primary">Save Changes</button>
  </form>
</div>
