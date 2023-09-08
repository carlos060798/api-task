import express from "express";
import Usuario from "../model/UserModel.js";
import  bycscript from "bcryptjs";


const Registrar = async (req, res) => {
  const {  nombre,email, password }= req.body;
  const User= new Usuario({nombre,email,password});
  // validacion de datos

  // validar correo
  const existeCorreo = await Usuario.findOne({ email});
   if (existeCorreo) {
       return res.status(400).json({
           msg: "El correo ya existe no se puede crear otro usuario con el mismo correo"
       });
   }
   if (password.length < 6) {
        return res.status(400).json({
            msg: "La contraseña debe tener al menos 6 caracteres"
        });
   }

  //encriptar contraseña
   const salt = bycscript.genSaltSync();
   User.password = bycscript.hashSync(password, salt);

// guardar en la base de datos
   try {
     const UserDB = User.save();
       res.status(200).json({
           msg: "Usuario creado correctamente",
           User
       });
   }catch (err) {
       console.log(err);
       return res.status(500).json({
           msg: "Error al crear el usuario",
           err
       });
   }
  
};

const ModificarUsuario = async (req, res) => {
  const { id } = req.params;
  const { password, ...resto } = req.body;

  // Validar contra base de datos
  if (password) {
      const salt = bycscript.genSaltSync();
      resto.password = bycscript.hashSync(password, salt);
  }

  try {
      const updatedUser = await Usuario.findByIdAndUpdate(id, resto, { new: true });

      if (!updatedUser) {
          return res.status(404).json({
              msg: "Usuario no encontrado"
          });
      }

      res.status(200).json({
          msg: "Usuario modificado correctamente",
          updatedUser
      });
  } catch (error) {
      res.status(500).json({
          msg: "Error al modificar el usuario",
          error
      });
  }
}

const Autenticar = async (req, res) => {
    const { email, password } = req.body;
  
    const user = await Usuario.findOne({ email }); //busca un usuario con el mismo email
    if (!user) {
      const error = new Error("El usuario no existe"); //crea un nuevo error
      return res.status(404).json({ msg: error.message }); //envia un mensaje de usuario no encontrado
    }
  
    // revisar si el password es correcto
  
    if (user.password === password) {
     
      res.json({msg:"usuario autorizado",user:{
      
  
        _id: user.id,
        nombre: user.nombre,
        email: user.email,
        
      }}); 
    } else {
      const error = new Error("password incorrecto"); //crea un nuevo error
      return res.status(403).json({ msg: error.message }); //envia un mensaje de usuario no encontrado
    }
  };

  export { Registrar, Autenticar, ModificarUsuario };