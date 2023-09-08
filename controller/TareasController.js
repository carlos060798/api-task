import Tarea from "../model/TaskModel.js";

const agregarTarea = async (req, res) => {
  // llenar datos
    const task = new Tarea(req.body); 
    task.usuario = req.body.usuario;
    // guardar datos
    try {
      const Tasksave = await task.save(); 
      res.json({msg:"tarea creada" ,
      Tarea:Tasksave});
    } catch (error) {
    // cacturar errores
      console.log(error);
      res.status(500).send("hubo un error");
    }
  };




  const obtenerTareas = async (req, res) => {
    try {
      const usuarioId = req.params.id; // Obtén el ID del usuario de la URL
  
      // Encuentra todas las tareas que pertenecen al usuario especificado
      const tareas = await Tarea.find({ usuario: usuarioId });
  
      res.json(tareas);
    } catch (error) {
      console.error("Error al obtener las tareas del usuario:", error);
      res.status(500).json({ msg: "Error al obtener las tareas del usuario" });
    }
  };
  
  
  
  
  
  
  

const obtenerTareaid = async (req, res) => {
  const { id } = req.params; 
  const task = await Tarea.findById(id); 
  if (!task) {
    // busca el id del task
    res.status(404).json({ msg: "tarea no encontrado" }); 
  }
    res.json({
      // si el task existe
      msg: "tarea encontradas",
      task
    });
  
};

const actualizarTarea = async (req, res) => {
  const { id } = req.params; // obtener el id del task
  console.log(id);
  const task = await Tarea.findById(id); // obtener task por id
  if (!task) {
    res.status(404).json({ msg: "task no encontrado" });
  }
  
  // si  la tarea  existe y el id referenciado es valido
  // actulizar tarea

  task.titulo = req.body.titulo || task.titulo;
  task.descripcion = req.body.descripcion || task.descripcion;
 

  try {
    const taskActualizada = await task.save();
    res.json({
      msg:"Tarea actualizada ",
      Tarea:taskActualizada});
  } catch (err) {
    console.log(err);
  }3
};

const eliminarTarea= async (req, res) => {
  // eliminar task
  const { id } = req.params; // obtener el id del task
  const task = await Tarea.findById(id); // obtener task por id
  if (!task) {
    res.status(404).json({ msg: "tarea no encontrada" });
  }


  // si  la tarea  existe y el id referenciado es valido

  try {
    await task.deleteOne();
    res.json({ msg: "task eliminado" });
  } catch (error) {
    console.error(error);
  }
};


const cambiarEstadoTarea = async (req, res) => {
  const { id } = req.params; // obtener el id del task
  console.log(id);
  const task = await Tarea.findById(id); // obtener task por id
  if (!task) {
    res.status(404).json({ msg: "task no encontrado" });
  }
  
  // si  la tarea  existe y el id referenciado es valido
  // actulizar tarea

  task.complete = "completada";
 

  try {
    const taskcomplete = await task.save();
    res.json({
      msg:"Tarea actualizada ",
      Tarea:taskcomplete});
  } catch (err) {
    console.log(err);
  }
   
}

export {
  agregarTarea,
  eliminarTarea,
  actualizarTarea,
  obtenerTareas,
  obtenerTareaid,
  cambiarEstadoTarea

} 