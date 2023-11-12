import jwt from "jsonwebtoken";
import {secret} from "./enviorment";

// --------------- Validación del Token --------------- //
export function validateToken(req: any, res: any, next: any){
    let bearer = req.headers['authorization'] || req.query.accessToken;
    if (!bearer) res.status(401).send('No autorizado');
    jwt.verify(bearer, secret, (err: any, user: any) => {
        if(err) res.status(401).send('No autorizado');
        else {
            req.user = user;
            next();
        }
    });
}
