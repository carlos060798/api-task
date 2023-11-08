import Usuario from "../model/UserModel.js";
import bycscript from "bcryptjs";

const Registrar = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const User = new Usuario({ nombre, email, password });

    // validaciones
    const existeCorreo = await Usuario.findOne({ email });
    if (existeCorreo) {
      return res.json({
        status: 400,
        msg:
          "El correo ya existe no se puede crear otro usuario con el mismo correo",
      });
    }
    if (password.length < 6) {
      return res.json({
        status: 400,
        msg: "La contraseña debe tener al menos 6 caracteres",
      });
    }

    const salt = bycscript.genSaltSync();
    User.password = bycscript.hashSync(password, salt);
    const UserDB = User.save();
    res.json({
      status: 200,
      msg: "Usuario creado correctamente",
      User,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Error al crear el usuario",
      err,
    });
  }
};

const ModificarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, ...data } = req.body;
    if (password) {
      const salt = bycscript.genSaltSync();
      data.password = bycscript.hashSync(password, salt);
    }
    const updatedUser = await Usuario.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedUser) {
      return res.json({
        status: 404,
        msg: "Usuario no encontrado",
      });
    }

    res.json({
      status: 200,
      msg: "Usuario modificado correctamente",
      updatedUser,
    });
  } catch (error) {
    res.json({
      status: 500,
      msg: "Error al modificar el usuario",
      error,
    });
  }
};

const Autenticar = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Usuario.findOne({ email });
    if (!user) {

      return res.json({
        status: 404,
        msg: "Usuario no encontrado",
      });
    }

    if (user.password === password) {
      return res.json({
        status: 200,
        msg: "usuario autorizado",
        user: {
          _id: user.id,
          nombre: user.nombre,
          email: user.email,
        },
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      msg: "Error al autenticar el usuario",
      error,
    });
  }
};

export { Registrar, Autenticar, ModificarUsuario };
