import express from 'express';
import { getUsers, singUp, login, updateUser, deleteUser } from "../controllers/users.controller";
import { validateToken } from "../utils";

const router = express.Router();

router.get('/getUsers', validateToken, getUsers );
router.post('/singUp', singUp);
router.post('/login', login);
router.put('/updateUser/:token', validateToken, updateUser);
router.delete('/deleteUser/:token', validateToken, deleteUser);

export default router