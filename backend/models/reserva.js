const db = require('../db/db');
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
class Reserva{
    constructor(monto, fecha_ingreso, fecha_salida, id_usuario, id_habitacion){
        this.monto = monto,
        this.fecha_ingreso = fecha_ingreso,
        this.fecha_salida = fecha_salida,
        this.id_usuario = id_usuario,
        this.id_habitacion = id_habitacion
    }
    static async crearReserva(monto, fecha_ingreso, fecha_salida, id_usuario, id_habitacion){
        try {
         const query = `INSERT INTO reservas (monto, fecha_ingreso, fecha_salida, id_usuario, id_habitacion) VALUES (?, ?, ?, ?, ?)`
         db.promise().execute(query, [monto, fecha_ingreso, fecha_salida, id_usuario, id_habitacion])
         return;
        } catch (error) {
            throw error
        }
    }
    static async obtenerReservas(id){
        try {
            const query = `SELECT r.id, r.monto, TIMESTAMPDIFF(DAY, r.fecha_ingreso, r.fecha_salida) AS noches, 
            r.timestamp, r.estado, h.nombre, h.foto FROM reservas as r
            INNER JOIN habitaciones as h ON r.id_habitacion = h.id
            WHERE r.estado > 0 AND r.id_usuario = ?
            ORDER BY r.timestamp DESC;`
            const [reservas] = await db.promise().execute(query, [id])
            return reservas;  
        } catch (error) {
            throw error
        }
    }
    static async generarPDF(id, monto, noches, timestamp, estado, nombre){
        try {
                // Crear carpeta si no existe
    const pdfPath = path.join(__dirname, "../uploads/archives");
    if (!fs.existsSync(pdfPath)) {
      fs.mkdirSync(pdfPath, { recursive: true });
    }

    // Nombre del archivo PDF
    const fileName = "reserva_" + id + ".pdf";
    const filePath = path.join(pdfPath, fileName);

    const localImagePath = path.join(
      __dirname,
      "../uploads/images/dark-logo.png"
    );

    // Crear el documento PDF con márgenes
    const doc = new PDFDocument({ margin: 50 });

    doc.pipe(fs.createWriteStream(filePath));

    // Encabezado
    doc
      .fillColor("#333333")
      .fontSize(24)
      .font("Helvetica-Bold")
      .text("Reserva Confirmada", { align: "center" })
      .moveDown(1);

    // Línea decorativa
    doc
      .strokeColor("#cccccc")
      .lineWidth(1)
      .moveTo(50, doc.y)
      .lineTo(550, doc.y)
      .stroke()
      .moveDown(2);

    // Detalles de la reserva
    doc
      .fillColor("#555555")
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("Nombre: ", { continued: true })
      .font("Helvetica")
      .text(nombre)
      .moveDown();

    doc.fontSize(12);
    doc
      .font("Helvetica-Bold")
      .text("Monto: ", { continued: true })
      .font("Helvetica")
      .text(monto)
      .moveDown();

    doc
      .font("Helvetica-Bold")
      .text("Noches: ", { continued: true })
      .font("Helvetica")
      .text(noches.toString())
      .moveDown();

    doc
      .font("Helvetica-Bold")
      .text("Fecha de reserva: ", { continued: true })
      .font("Helvetica")
      .text(new Date(timestamp).toLocaleString())
      .moveDown();

    doc
      .font("Helvetica-Bold")
      .text("Estado: ", { continued: true })
      .font("Helvetica")
      .text(estado === 1 ? "Activa" : "Cancelada")
      .moveDown(2);

    // Línea decorativa
    doc
      .strokeColor("#cccccc")
      .lineWidth(1)
      .moveTo(50, doc.y)
      .lineTo(550, doc.y)
      .stroke()
      .moveDown(2);

    // Imagen centrada si existe
    if (fs.existsSync(localImagePath)) {
      const imageWidth = 250;
      const imageHeight = 250;

      const x = (doc.page.width - imageWidth) / 2;

      const y = doc.y;

      // Añadir la imagen en la posición calculada
      doc.image(localImagePath, x, y, {
        width: imageWidth,
        height: imageHeight,
      });

      // Mover el cursor hacia abajo después de la imagen
      doc.moveDown(20);
    } else {
      console.warn("Imagen no encontrada:" + localImagePath);
    }

    // Pie de página
    doc
      .fillColor("#333333")
      .fontSize(10)
      .font("Helvetica")
      .text(
        "Gracias por su reserva. Para cualquier consulta, contacte con nuestro soporte +57 312 3903681.",
        { align: "center" }
      )
      .moveDown(1);

    // Línea final
    doc
      .strokeColor("#cccccc")
      .lineWidth(1)
      .moveTo(50, doc.y)
      .lineTo(550, doc.y)
      .stroke();

    doc.end();
    return ({url: "https://localhost:8077/uploads/archives/" + fileName })
        } catch (error) {
            throw new Error(error)
        }
    }
}
module.exports = Reserva;