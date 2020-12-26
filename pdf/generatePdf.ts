export {}

// import fs from 'fs';
// import PDFDocument from 'pdfkit';

// export const generatePdf = (data:any, path:any) => {
//     let doc = new PDFDocument({ size: "A4", margin: 50 });
//     generateHeader(doc);
//     generateSummary(doc, data);
//     generateFooter(doc);
//     doc.end();
//     doc.pipe(fs.createWriteStream(path));
// };

// const generateHeader = (doc:any) => {
//     doc.fontSize(7).text('Miner Rabbit', 100, 50)
//     .fillColor("#444444")
//     .moveDown();
//     // doc
//     // .image("./pdf/auto.jpg", 50, 45, { width: 50 })
//     // .fillColor("#444444")
//     // .fontSize(15)
//     // .text("Miner Rabbit", 110, 57)
//     // .fontSize(10)
//     // .text("Questions? Contact: admin@minerrabbit.com", 200, 50, { align: "right" })
    
// }

// const generateSummary = (doc:any, data:any) => {
//     const { price, name, variant, type, image } = data;
//     const autoName = `${name} - ${variant}`;
//     doc.fontSize(15).text('Tata Nano - emax_xm', 100, 90)
//     .fontSize(13).text('Variant - ', 110, 140, { align: "left" })
//     .fontSize(13).text('emax_xm', 170, 140)
//     .fontSize(13).text('Price - ', 110, 170, { align: "left" })
//     .fontSize(13).text('Rs 3.31 lakh', 160, 170)
//     .fontSize(13).text('Type - ', 110, 200, { align: "left" })
//     .fontSize(13).text('Hatchback', 160, 200)
//     .moveDown();
//     }

// const generateFooter = (doc:any) => {
//     doc
//       .fontSize(10)
//       .text(
//         "Payment is due within 15 days. Thank you for your business.",
//         50,
//         780,
//         { align: "center", width: 500 }
//       );
//   }