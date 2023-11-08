import express from "express";
import {
  agregarTarea,
  eliminarTarea,
  actualizarTarea,
  obtenerTareas,
  obtenerTareaid,
  cambiarEstadoTarea
  
} from "../controller/TareasController.js";
const router = express.Router();


router

  
  router.get("/usuario/:id", obtenerTareas);

  // operaciones del crud 
  router
    .route("/:id")
    .post(agregarTarea)
    .get(obtenerTareaid)
    .put(actualizarTarea)
    .delete(eliminarTarea)
    .patch(cambiarEstadoTarea);
  

export default router;