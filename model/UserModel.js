import mongoose from "mongoose"; 

// creacion de user
const UsuarioShema = mongoose.Schema({

    nombre: {
        type: String,
        required: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },

    
});

const Usuario = mongoose.model("Usuario", UsuarioShema);


export default Usuario;