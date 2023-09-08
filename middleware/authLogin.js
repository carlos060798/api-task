import jwt from 'jsonwebtoken';

const verificarToken = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    const decoded = jwt.verify(token, 'tuClaveSecreta'); // Reemplaza 'tuClaveSecreta' con tu clave secreta real

    // Puedes acceder a la información del usuario decodificada a través de decoded.usuario si es necesario

    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token no válido.' });
  }
};

export default verificarToken;