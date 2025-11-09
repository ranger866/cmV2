$(function () {
  const contentArea = $("#content-area");
  const title = $("#pageTitle");
  const body = $("body, .sidebar, .topbar, .nav-link, button, #content-area, .card, .side-text");
  const darkBtn = $("#toggleDarkMode i");

  // === DARK MODE ===
  if (localStorage.getItem("theme") === "dark") {
    body.addClass("dark-mode");
    darkBtn.removeClass("bi-moon-fill").addClass("bi-sun-fill");
  }
  $("#toggleDarkMode").click(function () {
    body.toggleClass("dark-mode");
    const isDark = body.hasClass("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    darkBtn.toggleClass("bi-moon-fill bi-sun-fill");
  });

  // === LOAD PAGE VIA AJAX ===
  function loadPage(page) {
    contentArea.html('<div class="text-center py-5 text-secondary">Loading...</div>');
    $.get(`/pages/${page}.php`, function (res) {
      contentArea.html(res);
      title.text(page.charAt(0).toUpperCase() + page.slice(1));
      localStorage.setItem("lastPage", page);

      // Reinit script if contacts page
      if (page === "contacts" && typeof loadContacts === "function") {
        loadContacts();
      }
    }).fail(() => {
      contentArea.html('<div class="alert alert-danger text-center">Failed to load page.</div>');
    });
  }

  // === NAVLINK CLICK HANDLER ===
  $("#menuLinks a").on("click", function (e) {
    e.preventDefault();
    $("#menuLinks a").removeClass("active");
    $(this).addClass("active");
    const page = $(this).data("page");
    loadPage(page);
  });

  // === INITIAL LOAD (remember last page) ===
  const last = localStorage.getItem("lastPage") || "dashboard";
  $(`#menuLinks a[data-page="${last}"]`).addClass("active");
  loadPage(last);
});
