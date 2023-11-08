import Tarea from "../model/TaskModel.js";

const agregarTarea = async (req, res) => {
  try {
    // llenar datos
    const { titulo, descripcion } = req.body; // obtener datos del body
    if (!titulo || !descripcion)
      return res.json({ status: 400, msg: "faltan campos" });
    const task = new Tarea({ titulo, descripcion }); // crear objeto task
    task.usuario = req.params.id;

    const Tasksave = await task.save();
    return res.json({
      status: 200,
      msg: "tarea creada",
      Tarea: Tasksave,
    });
  } catch (error) {
    res.send({
      status: 500,
      msg: "Error al crear tarea",
    });
  }
};

const obtenerTareas = async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const tasks = await Tarea.find({ usuario: usuarioId });
    res.json({
      status: 200,
      msg: "tareas del usuario",
      tasks,
    });
  } catch (error) {
    res.json({
      status: 500,
      msg: "Error al obtener las tareas del usuario",
      error,
    });
  }
};

const obtenerTareaid = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Tarea.findById(id);
    res.json({
      status: 200,
      msg: "tarea encontrada",
      task,
    });
  } catch (error) {
    res.json({
      status: 404,
      msg: "Error al obtener tarea",
      error,
    });
  }
};

const actualizarTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, fecha } = req.body; // obtener datos del body

    const task = await Tarea.findById(id);
    task.titulo = titulo || task.titulo;
    task.descripcion = descripcion || task.descripcion;
    task.fecha = fecha || task.fecha;
    const taskActualizada = await task.save();
    res.json({
      msg: "Tarea actualizada ",
      Tarea: taskActualizada,
    });
  } catch (err) {
    res.json({
      status: 404,
      msg: "Error al actualizar la tarea , no se encontro tarea",
      err,
    });
  }
  3;
};

const eliminarTarea = async (req, res) => {
  try {
    const { id } = req.params; // obtener el id del task
    const task = await Tarea.findById(id); // obtener task por id


    await task.deleteOne();
    res.json({ status: 200, msg: "tarea  eliminada correctamente" });
  } catch (error) {
    res.json({ status: 404, msg: "error al eliminar tarea no se encontro ", error });
  }
};

const cambiarEstadoTarea = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Tarea.findById(id);


    task.complete = "completada";
    const taskcomplete = await task.save();
    res.json({
      status: 200,
      msg: "Tarea actualizada ",
      Tarea: taskcomplete,
    });
  } catch (err) {
    res.json({
      status: 404,
      msg: "Error al actualizar tarea",
      err,
    });
  }
};

export {
  agregarTarea,
  eliminarTarea,
  actualizarTarea,
  obtenerTareas,
  obtenerTareaid,
  cambiarEstadoTarea,
};
