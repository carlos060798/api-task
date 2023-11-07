
// Controlador para el inicio de sesión
import bcrypt from 'bcryptjs';
import Usuario from '../model/UserModel.js';
import generarJWT from '../helpers/GenerarToken.js';

const autenticar = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica si 'email' está presente en req.body
    if (!email) {
      return res.status(400).json({
        msg: "El campo 'email' es obligatorio.",
      });
    }

    // Validar que el correo exista
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        msg: 'Usuario o contraseña incorrectos - correo',
      });
    }

    // Validar la contraseña
    const validPassword = await bcrypt.compare(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario o contraseña incorrectos - contraseña',
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    const { nombre, id } = usuario;

    res.json({
      msg: 'Inicio de sesión exitoso',
      nombre,
      email,
      id,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error en el servidor',
      error,
    });
  }
};

export default autenticar;