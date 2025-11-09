// public/assets/js/auth.js
// Uses jQuery 2.1.3 to call api/auth.php for login/register/logout

$(function(){
    // Show register form
    $('#showRegister').on('click', function(){
        $('#loginForm').hide();
        $('#registerForm').show();
    });
    $('#showLogin').on('click', function(){
        $('#registerForm').hide();
        $('#loginForm').show();
    });

    // Login submit
    $('#loginForm').on('submit', function(e){
        e.preventDefault();
        var username = $('#loginUsername').val().trim();
        var password = $('#loginPassword').val().trim();
        if (!username || !password) { showAlert('Please fill all fields','danger'); return; }
        $.post('../api/auth.php', { action: 'login', username: username, password: password }, function(res){
            if (res.success) window.location.href = '/view/main.php';
            else showAlert(res.message || 'Login failed','danger');
        }, 'json').fail(function(){ showAlert('Server error','danger'); });
    });

    // Register submit
    $('#registerForm').on('submit', function(e){
        e.preventDefault();
        var username = $('#regUsername').val().trim();
        var email = $('#regEmail').val().trim();
        var password = $('#regPassword').val().trim();
        if (!username || !email || !password) { showAlert('Please fill all fields','danger'); return; }
        $.post('../api/auth.php', { action: 'register', username: username, email: email, password: password }, function(res){
            if (res.success) { showAlert('Registered successfully. You can login now.','success'); $('#registerForm').hide(); $('#loginForm').show(); }
            else showAlert(res.message || 'Register failed','danger');
        }, 'json').fail(function(){ showAlert('Server error','danger'); });
    });

    function showAlert(msg,type){
        var $a = $('<div class="alert alert-'+(type||'info')+'">'+msg+'</div>');
        $('#alertBox').html($a).show();
        setTimeout(function(){ $('#alertBox').fadeOut(); }, 3500);
    }
});