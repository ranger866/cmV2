document.getElementById("btnExportPDF").addEventListener("click", function () {
    exportContacts('pdf');
});

document.getElementById("btnExportDOCX").addEventListener("click", function () {
    exportContacts('docx');
});

document.getElementById("btnExportXLSX").addEventListener("click", function () {
    exportContacts('xlsx');
});

function exportContacts(type) {

    $.get('../api/contacts.php', {}, function (res) {

        if (!res.success) {
            alert('Failed to get contacts');
            return;
        }

        if (res.message === 'Unauthorized') {
            window.location.href = 'auth.php';
            return;
        }

        const data = res.data;

        switch (type) {
            case 'pdf':
                exportPDF(data);
                break;

            case 'docx':
                exportDOCX(data);
                break;

            case 'xlsx':
                exportXLSX(data);
                break;

            default:
                console.error('Unknown export type:', type);
        }
    });
}

function exportPDF(data) {
    if (!data || data.length === 0) {
        alert("Tidak ada data");
        return;
    }

    let html = `
        <h2 style="text-align:center;margin-bottom:20px;">Contacts List</h2>
        <table border="1" cellspacing="0" cellpadding="8" style="width:100%; border-collapse:collapse; font-size:14px;">
            <thead>
                <tr style="background:#f1f1f1;">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Gender</th>
                    <th>Group</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach(r => {
        html += `
            <tr>
                <td>${r.name}</td>
                <td>${r.email}</td>
                <td>${r.phone}</td>
                <td>${r.gender}</td>
                <td>${r.group_contacts}</td>
                <td>${r.address}</td>
            </tr>
        `;
    });

    html += `</tbody></table>`;

    const container = document.getElementById("pdfContainer");

    if (!container) {
        console.error("pdfContainer tidak ditemukan!");
        return;
    }

    container.innerHTML = html;

    const opt = {
        margin: 10,
        filename: 'contacts.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    setTimeout(() => {
        html2pdf().from(container).set(opt).save();
    }, 200);
}


function exportDOCX(data) {
    if (!data || data.length === 0) {
        alert("Tidak ada data untuk DOCX");
        return;
    }

    const {
        Document,
        Packer,
        Paragraph,
        TextRun,
        Table,
        TableCell,
        TableRow,
        WidthType,
        AlignmentType,
        BorderStyle
    } = docx;

    // ---- Judul ----
    const title = new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 },
        children: [
            new TextRun({
                text: "Contacts List",
                bold: true,
                size: 32,
            })
        ]
    });

    // ---- Header tabel ----
    const header = new TableRow({
        children: [
            new TableCell({ children: [new Paragraph("Name")] }),
            new TableCell({ children: [new Paragraph("Email")] }),
            new TableCell({ children: [new Paragraph("Phone")] }),
            new TableCell({ children: [new Paragraph("Gender")] }),
            new TableCell({ children: [new Paragraph("Group")] }),
            new TableCell({ children: [new Paragraph("Address")] }),
        ]
    });

    // ---- Isi tabel ----
    const rows = data.map(r => {
        return new TableRow({
            children: [
                new TableCell({ children: [new Paragraph(r.name || "")] }),
                new TableCell({ children: [new Paragraph(r.email || "")] }),
                new TableCell({ children: [new Paragraph(r.phone || "")] }),
                new TableCell({ children: [new Paragraph(r.gender || "")] }),
                new TableCell({ children: [new Paragraph(r.group_contacts || "")] }),
                new TableCell({ children: [new Paragraph(r.address || "")] }),
            ]
        });
    });

    // ---- Tabel utama ----
    const table = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
            top: { style: BorderStyle.SINGLE, size: 1, color: "999999" },
            bottom: { style: BorderStyle.SINGLE, size: 1, color: "999999" },
            left: { style: BorderStyle.SINGLE, size: 1, color: "999999" },
            right: { style: BorderStyle.SINGLE, size: 1, color: "999999" },
            insideH: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
            insideV: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
        },
        rows: [header, ...rows]
    });

    // ---- Document ----
    const doc = new Document({
        sections: [
            {
                properties: {},
                children: [
                    title,
                    table
                ]
            }
        ]
    });

    // ---- Buat file ----
    Packer.toBlob(doc).then(blob => {
        saveAs(blob, "contacts.docx");
    });
}


function exportXLSX(data) {
    const worksheetData = data.map(r => ({
        Name: r.name,
        Email: r.email,
        Phone: r.phone,
        Gender: r.gender,
        Group: r.group_contacts,
        Address: r.address
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Contacts');

    XLSX.writeFile(workbook, 'contacts.xlsx');
}
