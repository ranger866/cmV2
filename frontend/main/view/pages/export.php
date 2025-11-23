<!-- Export PDF -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>

<!-- Export DOCX -->
<script src="https://unpkg.com/docx@7.7.0/build/index.js"></script>

<!-- FileSaver (untuk DOCX) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>

<!-- Export XLSX -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>

<script src="/js/export.js"></script>

<div class="card border-0 shadow p-4 pb-5">
    <div class="row pb-3">
        <div class="col mb">
            <h3 class="fw-semibold">Import Contacts</h3>
            <p class="fs-5">Import your contacts to - PDF, DOC, XLSX</p>
        </div>
    </div>
    <div class="row g-3">
        <div class="col-md-4">
            <div class="card shadow border-0 p-3">
                <h4><i class="bi bi-filetype-pdf me-3"></i>Import To PDF</h4>
                <p class="fs-5">Import your contacts to PDF with clean format</p>
                <button id="btnExportPDF" class="btn btn-primary">Import</button>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card shadow border-0 p-3">
                <h4><i class="bi bi-filetype-docx me-3"></i>Import To DOCX</h4>
                <p class="fs-5">Import your contacts to DOCX with clean format</p>
                <button id="btnExportDOCX" class="btn btn-primary">Import</button>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card shadow border-0 p-3">
                <h4><i class="bi bi-filetype-xlsx me-3"></i>Import To XLSX</h4>
                <p class="fs-5">Import your contacts to XLSX with clean format</p>
                <button id="btnExportXLSX" class="btn btn-primary">Import</button>
            </div>
        </div>
    </div>
</div>

<div id="pdfContainer" style="position:absolute; left:-9999px; top:0;"></div>