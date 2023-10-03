async function modifyPdf(name) {
    const url = './certificate-template.pdf'
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

    const fontUrl = './Sanchez-Regular.ttf';
    const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes)
    pdfDoc.registerFontkit(fontkit)
    const embedFont = await pdfDoc.embedFont(fontBytes)

    const pdfPages = pdfDoc.getPages()
    const firstPage = pdfPages[0];

    const { width, height } = firstPage.getSize()
    firstPage.drawText(name, {
      x: 80,
      y: height / 2 + 40,
      size: 50,
      font: embedFont,
    })

    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'pdf-lib_modification_example.pdf');
}


