import mongoose from "mongoose"; 

const taskSchema = mongoose.Schema({
  titulo:{
    type: String,
    required: true,

  },
  descripcion:{
  type: String,
  required: true,
  },  
  fecha:{
    type: Date,
    required: true,
    default: Date.now()
   },
  complete:{
    type: String,
    default: "pendiente",
  }, 
  usuario:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "usuario"
  }
 

},

)

const  Tarea= mongoose.model('Tarea', taskSchema);

export default Tarea;