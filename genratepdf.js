const PDFDocument = require('pdfkit');
const fs = require('fs');

function generateProfessionalBill(billDetails, filename) {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filename));

    // Header with Company Info
    doc.fontSize(18).fillColor('#1a1a1a').text("Shree Vagheshwari Engineering Works", { align: 'center' });
    doc.fontSize(12).fillColor('#1a1a1a').text("Mfg. & Supply: Fly-ash Brick Making Machine, Paver block machinery, Etc,", { align: 'center' });
    doc.text("Lati plot 2 no, old Ajnta clock", { align: 'center' });
    doc.text("Mo: 98792 77425, 98793 10284", { align: 'center' });
    doc.text("GST No: 24ACKFS8731J1ZP", { align: 'center' });
    doc.moveDown();

    // Invoice Header with Background and Text Styling
    doc.rect(50, doc.y, 500, 20).fill('#000000');
    doc.fillColor('#FFFFFF').fontSize(12).font('Helvetica-Bold').text("Invoice", 50, doc.y + 5, { align: 'center' });
    doc.moveDown().moveDown();

    // Bill No and Date on the Same Line
    doc.fontSize(10).fillColor('#333').text(`Date: ${billDetails.date}`, 50, doc.y, { continued: true });
    doc.text(`Bill No: ${billDetails.billNumber}`, { align: 'right' });
    doc.moveDown();

    // Client Information
doc.font('Helvetica-Bold').fontSize(14).fillColor('#1a1a1a').text(`M/S: ${billDetails.clientName}`, { align: 'left' });
doc.moveDown();


    // Item Table Header with Background Color and Border
    const tableTop = doc.y;
    const tableHeaders = ["Sr No", "Product Name", "HSN Code", "QNT", "Rate", "Total"];
    const columnWidths = [50, 150, 100, 50, 50, 100];
    let x = 50;

    doc.rect(x, tableTop, 500, 20).fill('#e6e6e6').stroke(); // Header background color with border
    tableHeaders.forEach((header, i) => {
        doc.fillColor('#333').fontSize(10).text(header, x + 10, tableTop + 5, { width: columnWidths[i], align: 'center' });
        x += columnWidths[i];
    });

    // Item Table Rows with Alternating Background Colors and Borders
    let y = tableTop + 25;
    billDetails.items.forEach((item, i) => {
        const isEvenRow = i % 2 === 0;
        doc.rect(50, y, 500, 20).fill(isEvenRow ? '#f9f9f9' : '#ffffff').stroke(); // Alternating row colors with border
        x = 50;

        // Row Data
        const rowData = [i + 1, item.productName, item.hsnCode, item.quantity, item.rate, item.total];
        rowData.forEach((data, j) => {
            doc.fillColor('#333').fontSize(10).text(data.toString(), x + 10, y + 5, { width: columnWidths[j], align: 'center' });
            x += columnWidths[j];
        });
        y += 20;
    });

    // Draw table border around items table
    doc.rect(50, tableTop, 500, y - tableTop).stroke();

      // Tax and Total Table Structure
    const startX = 50; // Starting position for the table
    const tableY = y + 30; // Starting Y position for the tax and total table
    const tableWidth = 500;
    const rowHeight = 20;

    // Draw Tax and Total Table Border
    doc.rect(startX, tableY, tableWidth, rowHeight * 4).stroke();

    // Tax Rows
    doc.fontSize(10).fillColor('#333');
    doc.text("Add: CGST 9%", startX + 10, tableY + 5, { width: 200, align: 'left' });
    doc.text(billDetails.cgst, startX + 400, tableY + 5, { width: 80, align: 'right' });

    doc.text("Add: SGST 9%", startX + 10, tableY + rowHeight + 5, { width: 200, align: 'left' });
    doc.text(billDetails.sgst, startX + 400, tableY + rowHeight + 5, { width: 80, align: 'right' });

    doc.text("Add: IGST 18%", startX + 10, tableY + rowHeight * 2 + 5, { width: 200, align: 'left' });
    doc.text(billDetails.igst, startX + 400, tableY + rowHeight * 2 + 5, { width: 80, align: 'right' });

    // Total Amount Row
    doc.font('Helvetica-Bold').text("Total Amount", startX + 10, tableY + rowHeight * 3 + 5, { width: 200, align: 'left' });
    doc.text(billDetails.invoiceAmount, startX + 400, tableY + rowHeight * 3 + 5, { width: 80, align: 'right' });

    // Footer
    doc.moveDown().text("For, Shree Vagheshwari Engineering Works", { align: 'right' });

    // Finalize PDF file
    doc.end();
}

// Example bill details
const billDetails = {
    date: '09/09/2024',
    invoice: 'GT00',
    billNumber: '12345',
    clientName: 'Client Name Here',
    items: [
        { productName: 'Product A', hsnCode: '8480', quantity: 10, rate: 500, total: 5000 },
        { productName: 'Product B', hsnCode: '8480', quantity: 5, rate: 300, total: 1500 }
    ],
    total: '6500',
    totalInWords: 'Six Thousand Five Hundred Only',
    cgst: '450',
    sgst: '450',
    igst: '900',
    invoiceAmount: '7,800'
};

generateProfessionalBill(billDetails, 'professionalBill.pdf');
