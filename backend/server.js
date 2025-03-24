const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs'); 

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://gerardomorales23s:srqV5VphAWgaZWNH@cluster0.5qp5c.mongodb.net/Mew-Food?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Conectado"))
  .catch(err => console.error(" Error al conectar MongoDB", err));

const UsuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    telefono: { type: String, required: true }, 
    password: { type: String, required: true }
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

app.post('/register', async (req, res) => {
    console.log(" Datos recibidos:", req.body);

    const { nombre, correo, telefono, password } = req.body;

    if (!nombre || !correo || !telefono || !password) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const nuevoUsuario = new Usuario({ 
            nombre, 
            correo, 
            telefono, 
            password: hashedPassword 
        });

        await nuevoUsuario.save();
        res.status(201).json({ message: "Registro exitoso" });
    } catch (error) {
        console.error("❌ Error en el registro:", error);
        res.status(400).json({ error: "Error al registrar usuario" });
    }
});

app.post('/login', async (req, res) => {
    console.log(" Intento de inicio de sesión:", req.body);

    const { correo, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            console.log(" Usuario no encontrado");
            return res.status(400).json({ error: "Usuario no encontrado" });
        }

        console.log(" Contraseña ingresada:", password);
        console.log(" Hash en BD:", usuario.password);

        const isMatch = await bcrypt.compare(password, usuario.password);
        console.log(" Coincide:", isMatch);

        if (!isMatch) {
            console.log(" Contraseña incorrecta");
            return res.status(400).json({ error: "Contraseña incorrecta" });
        }

        res.status(200).json({ message: "Inicio de sesión exitoso", usuario });

    } catch (error) {
        console.error(" Error en el login:", error);
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
});

app.listen(PORT, () => {
    console.log(` Servidor corriendo en el puerto ${PORT}`);
});
