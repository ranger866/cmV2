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

    const iframe = document.getElementById("pdfFrame");
    const doc = iframe.contentDocument || iframe.contentWindow.document;

    let html = `
        <div style="padding:30px; font-size:14px; font-family:Arial, sans-serif;">
            <h2 style="text-align:center; margin-bottom:25px;">Contacts List</h2>

            <div style="display:flex; justify-content:center;">
                <table border="1" cellspacing="0" cellpadding="10"
                    style="width:80%; max-width:900px; background:#ffffff; border-collapse:collapse;">
                    <thead>
                        <tr style="background:#e0e0e0; text-align:center; font-weight:bold;">
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
            <tr style="background:#ffffff;">
                <td>${r.name}</td>
                <td>${r.email}</td>
                <td>${r.phone}</td>
                <td>${r.gender}</td>
                <td>${r.group_contacts}</td>
                <td>${r.address}</td>
            </tr>
        `;
    });

    html += `
                    </tbody>
                </table>
            </div>
        </div>
    `;

    // isi iframe
    doc.open();
    doc.write(html);
    doc.close();

    // generate PDF dari iframe.body
    html2pdf()
        .from(doc.body)
        .set({
            margin: 10,
            filename: "contacts.pdf",
            html2canvas: { scale: 2 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
        })
        .save();
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
