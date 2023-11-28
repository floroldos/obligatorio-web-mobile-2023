import jwt from "jsonwebtoken";
import { secret } from "./enviorment";

// --------------- Validación del Token - Middleware  --------------- //
export function validateToken(req: any, res: any, next: any) {
  // obtener el token de las cabeceras de autorización o de los parámetros de consulta
  const bearer = req.headers['authorization'] || req.query.accessToken;

  if (!bearer) {
    return res.status(401).send('No autorizado');
  }

  // Verifica el token
  jwt.verify(bearer, secret, (err:any, user:any) => {
    if (err) {
      return res.status(401).send('Token inválido o expirado');
    } else {
      // Si la verificación es exitosa, agrega el usuario decodificado al objeto de solicitud (req)
      req.user = user;
      next(); // Llama al siguiente middleware en la cadena
    }
  });
}

