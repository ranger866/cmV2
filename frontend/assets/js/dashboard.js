$(function(){
    var totalContacts = document.getElementById('totalContacts');
    var keluarga = document.getElementById('keluarga');
    var kantor = document.getElementById('kantor');
    var teman = document.getElementById('teman');
    var laki_laki = document.getElementById('laki-laki');
    var perempuan = document.getElementById('perempuan')

    $.get('/api/contacts.php',function(res){
        if (!res.success) { showAlert('Failed to load contacts','danger'); 
        if (res.message && res.message==='Unauthorized') window.location.href='auth.php'; return; }
        data = res.data;
        total = data.length;
        var kel = 0;
        var kan = 0;
        var tem = 0;
        var laki = 0;
        var per = 0;

        for (var i=0;i<data.length;i++) {
            var r = data[i];
            if (r.group_contacts == 'Keluarga') { kel++ }
            if (r.group_contacts == 'Kantor') { kan++ }
            if (r.group_contacts == 'Teman') { tem++ }
            if (r.gender == 'Laki-Laki') { laki++ }
            if (r.gender == 'Perempuan') { per++ }
        }

        if (totalContacts) totalContacts.textContent = total;
        if (keluarga) keluarga.textContent = kel;
        if (kantor) kantor.textContent = kan;
        if (teman) teman.textContent = tem;
        if (laki_laki) laki_laki.textContent = laki;
        if (perempuan) perempuan.textContent = per;
        
    }, 'json').fail(function(){ showAlert('Failed to load contacts','danger'); });
})