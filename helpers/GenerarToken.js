// funcion para  generar el json web token
import jwt from 'jsonwebtoken';

// funcion para generar el token solo mediante el id del usuario 

const generarJWT = (uid = '') => {
    
        return new Promise((resolve, reject) => {
    // este token se genera con el id del usuario 
            const payload = { uid };
    // firmar el token y generar el token 
            jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
                expiresIn: '4h'
            }, (err, token) => {
                if(err){
                    console.log(err);
                    reject('No se pudo generar el token');
                } else {
                    resolve(token);
                }
            });
        });
}

export default generarJWT;
