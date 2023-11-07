import express from "express";

import {
  Registrar,
  ModificarUsuario,
} from "../controller/UsuarioController.js"
import autenticar from "../controller/LoginController.js";
import verificarToken from "../middleware/authLogin.js";

const router = express.Router();

// rutas de veterinario publicas

router.post("/", Registrar);
router.put("/:id", ModificarUsuario);

// rutas de  iniciar seccion
router.post('/login',autenticar,verificarToken)
export default router;
