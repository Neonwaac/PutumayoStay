const Reserva = require("../models/reserva");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const PDFDocument = require("pdfkit");
exports.crearReserva = async (req, res) => {
  try {
    const { monto, fecha_ingreso, fecha_salida, id_usuario, id_habitacion } =
      req.body;
    await Reserva.crearReserva(
      monto,
      fecha_ingreso,
      fecha_salida,
      id_usuario,
      id_habitacion
    );
    res.status(200).json("Reserva creada correctamente");
  } catch (error) {
    res.status(500).json("No se pudo crear la reserva");
  }
};
exports.obtenerReservas = async (req, res) => {
  const { id } = req.params;
  try {
    const reservas = await Reserva.obtenerReservas(id);
    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json("No se pudieron obtener las reservas");
  }
};
exports.generarPDF = async (req, res) => {
  try {
    const { id } = req.params;
    const { monto, noches, timestamp, estado, nombre, foto } = req.body;

    // Crear carpeta si no existe
    const pdfPath = path.join(__dirname, "../uploads/archives");
    if (!fs.existsSync(pdfPath)) {
      fs.mkdirSync(pdfPath, { recursive: true });
    }
    const documentKey = await Reserva.generateDocumentKey(id);

    // Nombre del archivo PDF
    const fileName = "reserva_" + documentKey + id + ".pdf";
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

    res.json({ url: "http://localhost:8077/uploads/archives/" + fileName });
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    res.status(500).json({ error: "No se pudo generar el PDF" });
  }
};
