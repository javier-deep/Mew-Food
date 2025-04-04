const express = require("express");
const Mascota = require("../models/Mascota");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../config/multer");
const path = require("path");

// Registrar una nueva mascota con imagen
router.post("/registrar", authMiddleware, upload.single("foto"), async (req, res) => {
    try {
        const { nombre, raza, color, peso } = req.body;
        const usuarioId = req.user.id;

        if (!nombre || !raza || !color || !peso || !req.file) {
            return res.status(400).json({ 
                success: false,
                msg: "Todos los campos son obligatorios" 
            });
        }

        const nuevaMascota = new Mascota({
            nombre,
            raza,
            color,
            peso: parseFloat(peso),
            foto: `/uploads/${req.file.filename}`,
            usuario: usuarioId
        });

        await nuevaMascota.save();
        
        res.status(201).json({ 
            success: true,
            msg: "Mascota registrada correctamente", 
            mascota: {
                ...nuevaMascota._doc,
                foto: `${req.protocol}://${req.get('host')}${nuevaMascota.foto}`
            }
        });
    } catch (error) {
        console.error("Error en /registrar mascota:", error);
        res.status(500).json({ 
            success: false,
            msg: "Error en el servidor" 
        });
    }
});

// Obtener las mascotas del usuario autenticado
router.get("/mis-mascotas", authMiddleware, async (req, res) => {
    try {
        const usuarioId = req.user.id;
        const mascotas = await Mascota.find({ usuario: usuarioId });

        // Agregar URL completa a las imágenes
        const mascotasConUrlCompleta = mascotas.map(mascota => ({
            ...mascota._doc,
            foto: `${req.protocol}://${req.get('host')}${mascota.foto}`
        }));

        res.json({
            success: true,
            mascotas: mascotasConUrlCompleta
        });
    } catch (error) {
        console.error("Error en /mis-mascotas:", error);
        res.status(500).json({ 
            success: false,
            msg: "Error en el servidor" 
        });
    }
});

module.exports = router;