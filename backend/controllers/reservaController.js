const Reserva = require('../models/reserva')
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
exports.crearReserva = async (req, res) => {
    try {
        const { monto, fecha_ingreso, fecha_salida, id_usuario, id_habitacion} = req.body;
        await Reserva.crearReserva(monto, fecha_ingreso, fecha_salida, id_usuario, id_habitacion);
        res.status(200).json('Reserva creada correctamente')
    } catch (error) {
        res.status(500).json('No se pudo crear la reserva')
    }
}
exports.obtenerReservas = async (req, res) => {
    const { id } = req.params;
    try {
        const reservas = await Reserva.obtenerReservas(id);
        res.status(200).json(reservas)
    } catch (error) {
        res.status(500).json('No se pudieron obtener las reservas')
    }
}
exports.generarPDF = async (req, res) => {
    try {
        const { id } = req.params;
        const { monto, noches, timestamp, estado, nombre, foto } = req.body;

        // Crear la carpeta si no existe
        const pdfPath = path.join(__dirname, "../uploads/archives");
        if (!fs.existsSync(pdfPath)) {
            fs.mkdirSync(pdfPath, { recursive: true });
        }

        // Nombre del archivo PDF
        const fileName = `reserva_${id}.pdf`;
        const filePath = path.join(pdfPath, fileName);

        const fileNameFromUrl = foto.split("/").pop();
        const localImagePath = path.join(__dirname, "../uploads/images", fileNameFromUrl);

        // Crear el documento PDF
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(filePath));

        doc.fontSize(20).text("Reserva Confirmada", { align: "center" });
        doc.moveDown();
        doc.fontSize(14).text(`Nombre: ${nombre}`);
        if (fs.existsSync(localImagePath)) {
            doc.image(localImagePath, { width: 240, height: 120 });
        } else {
            console.warn(`Imagen no encontrada: ${localImagePath}`);
        }
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.moveDown();
        doc.text(`Monto: ${monto}`);
        doc.text(`Noches: ${noches}`);
        doc.text(`Fecha de reserva: ${new Date(timestamp).toLocaleString()}`);
        doc.text(`Estado: ${estado === 1 ? "Activa" : "Cancelada"}`);
        doc.end();

        res.json({ url: `http://localhost:8077/uploads/archives/${fileName}` });
    } catch (error) {
        console.error("Error al generar el PDF:", error);
        res.status(500).json({ error: "No se pudo generar el PDF" });
    }
};

