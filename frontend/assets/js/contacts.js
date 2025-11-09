var currentPage = 1;
var perPage = 8;
var currentQuery = '';
var filterGender = '';
var filterGroup = '';
var filterSort = '';

$(function(){
    loadContacts();

    var typingTimer;
    $('#search').on('keyup', function(){
        clearTimeout(typingTimer);
        var q = $(this).val().trim();
        typingTimer = setTimeout(function(){ 
            currentQuery = q; 
            currentPage = 1; 
            loadContacts(currentPage, currentQuery); 
        }, 300);
    });

    $('#filterGender').on('change', function(){
        filterGender = $(this).val();
        currentPage = 1;
        loadContacts(currentPage, currentQuery);
    });

    $('#filterGroup').on('change', function(){
        filterGroup = $(this).val();
        currentPage = 1;
        loadContacts(currentPage, currentQuery);
    });

    $('#addBtn').on('click', function(){ 
        clearForm(); 
        $('#modalTitle').text('Add Contact'); 
        $('#contactModal').modal('show'); 
    });

    $('#saveBtn').on('click', function(){ $('#contactForm').submit(); });

    $('#contactForm').on('submit', function(e){
        e.preventDefault();
        $('#formErrors').text('');
        var id = $('#contactId').val();
        var payload = { 
            name: $('#name').val().trim(), 
            email: $('#email').val().trim(), 
            phone: $('#phone').val().trim(), 
            gender: $('#gender').val(), 
            group: $('#group').val(), 
            address: $('#address').val().trim() 
        };

        if (!payload.name) { 
            $('#formErrors').text('Name is required'); 
            return; 
        }
        if (payload.email && !isValidEmail(payload.email)) { 
            $('#formErrors').text('Email not valid'); 
            return; 
        }

        if (!id) {
            $.post('../api/contacts.php', payload, function(res){
                if (res.success) { 
                    $('#contactModal').modal('hide'); 
                    showAlert('Contact added','success'); 
                    loadContacts(currentPage,currentQuery); 
                } else { 
                    $('#formErrors').text((res.errors||[]).join(', ')||res.message||'Failed'); 
                }
            }, 'json').fail(function(){ $('#formErrors').text('Server error'); });
        } else {
            payload.id = id;
            $.ajax({ 
                url: '../api/contacts.php', 
                type: 'PUT', 
                data: payload, 
                dataType: 'json', 
                success: function(res){ 
                    if (res.success) { 
                        $('#contactModal').modal('hide'); 
                        showAlert('Contact updated','success'); 
                        loadContacts(currentPage,currentQuery); 
                    } else $('#formErrors').text((res.errors||[]).join(', ')||res.message||'Failed'); 
                }, 
                error: function(){ 
                    $('#formErrors').text('Server error'); 
                } 
            });
        }
    });
});

function loadContacts(page,q){
    page = page||1; q = q||'';
    $.get('../api/contacts.php', { 
        page: page, 
        perPage: perPage, 
        q: q,
        gender: filterGender,
        group: filterGroup,
        sort: filterSort
    }, function(res){
        if (!res.success) { showAlert('Failed to load contacts','danger'); if (res.message && res.message==='Unauthorized') window.location.href='auth.php'; return; }
        renderCard(res.data);
        renderPagination(res.meta);
    }, 'json').fail(function(){ showAlert('Failed to load contacts','danger'); });
}

function renderCard(data){
    var $c = $('#contactArea');
    if (!data || data.length === 0) {
        $c.html('<div class="alert alert-info">No contacts</div>');
        return;
    }
    var card_contact = '<div class="row">';
    for (var i = 0; i < data.length; i++) {
        var r = data[i];
        var name = escapeHtml(r.name);
        var email = escapeHtml(r.email);
        var phone = escapeHtml(r.phone);
        var gender = escapeHtml(r.gender);
        var address = escapeHtml(r.address);
        var group = escapeHtml(r.group_contacts);
        card_contact +=
        '<div class="col-md-3 mb-3">' +
            '<div class="card shadow-sm border-0 p-4 h-100">' +
                '<div class="card shadow border-0 p-2 text-center mb-4 position-relative">' + 
                    '<img class="icon" src="/img/'+ gender +'.png">' +
                    '<div class="card-action">' +
                        '<button class="btn btn-sm btn-outline-primary mb-2 btn-edit" data-id="' + r.id + '"><i class="bi bi-pencil"></i></button>' +
                        '<button class="btn btn-sm btn-outline-danger mb-2 btn-del" data-id="' + r.id + '"><i class="bi bi-trash"></i></button>' +
                    '</div>' +
                '</div>' +
                '<div class="card shadow-lg border-0 p-4 mb-3">' +
                    '<p class="fw-semibold">' + name + '</p>' +
                    '<p>' + email + '</p>' +
                    '<p>' + phone + '</p>' +
                    '<p>' + gender + '</p>' +
                    '<p>' + group + '</p>' +
                    '<p>' + address +'</p>' +
                '</div>' +
            '</div>' +
        '</div>';
    }
    card_contact += '</div>';
    $c.html(card_contact);
    $c.find('.btn-edit').off('click').on('click', function(){ openEdit($(this).data('id')); });
    $c.find('.btn-del').off('click').on('click', function(){ deleteContact($(this).data('id')); });
}

function renderPagination(meta){
    var $p = $('#pagination');
    if (!meta) { 
        $p.html(''); 
        return; 
    }
    var page = meta.page;
    var pages = meta.pages;
    if (pages<=1) { 
        $p.html(''); 
        return; 
    }
    var html = '<ul class="pagination">';
    if (page>1) html += '<li class="page-item"><a class="page-link" href="#" data-page="'+(page-1)+'">Prev</a></li>';
    for (var i=1;i<=pages;i++) html += '<li class="page-item '+(i===page?'active':'')+'"><a class="page-link" href="#" data-page="'+i+'">'+i+'</a></li>';
    if (page<pages) html += '<li class="page-item"><a class="page-link" href="#" data-page="'+(page+1)+'">Next</a></li>';
    html += '</ul>'; 
    $p.html(html);
    $p.find('a[data-page]').off('click').on('click', function(e){ e.preventDefault(); var p=$(this).data('page'); currentPage=p; loadContacts(p,currentQuery); });
}

function openEdit(id){
    $.get('../api/contacts.php', { id: id }, function(res){ 
        if (!res.success) { showAlert('Failed to fetch','danger'); return; } 
        var d=res.data; 
        if (!d) { showAlert('Not found','danger'); return; } 
        $('#contactId').val(d.id); 
        $('#name').val(d.name); 
        $('#email').val(d.email); 
        $('#phone').val(d.phone);
        $('#gender').val(d.gender);
        $('#group').val(d.group_contacts);
        $('#address').val(d.address); 
        $('#modalTitle').text('Edit Contact'); 
        $('#contactModal').modal('show'); 
    }, 'json').fail(function(){ showAlert('Failed','danger'); });
}

function deleteContact(id){ 
    if (!confirm('Delete this contact?')) return; 
    $.ajax({ 
        url: '../api/contacts.php', 
        type: 'DELETE', 
        data: { id: id }, 
        dataType: 'json', 
        success: function(res){ 
            if (res.success) { showAlert('Deleted','success'); loadContacts(currentPage,currentQuery); } 
            else showAlert(res.message||'Delete failed','danger'); 
        }, 
        error: function(){ showAlert('Server error','danger'); } 
    }); 
}

function clearForm(){ 
    $('#contactId').val(''); 
    $('#contactForm')[0].reset(); 
    $('#formErrors').text(''); 
}

function showAlert(msg,type){ 
    type = type||'success'; 
    var $a = $('<div class="alert alert-'+(type==='danger'?'danger':'success')+' alert-dismissible">'+msg+'<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>'); 
    $('#alertArea').append($a); 
    setTimeout(function(){ $a.alert('close'); },3000); 
}

function escapeHtml(s){ 
    if (!s) return ''; 
    return String(s).replace(/[&<>\"']/g,function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]; }); 
}

function isValidEmail(e){ 
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); 
}