import { secret } from "../enviorment";
const jwt = require('jsonwebtoken');
const userSchema = require('../models/users.model');

const getUsers = async (req: any, res: any) => {
    await userSchema
        .find()
        .then((user: any) => res.json(user))
        .catch((err: any) => res.json('Error: ' + err));
}

const singUp = async (req: any, res: any) => {
    const { userName, email, password } = req.body;
    const token = jwt.sign({
        userName,
        email
    }, secret);
    const user = new userSchema({ userName, email, password, token });
    user
        .save()
        .then((user: any) => res.json(user))
        .catch((err: any) => res.json('Error: ' + err));
}

const login = async (req: any, res: any) => {
    const { userName, password } = req.body;
    await userSchema
        .findOne({ userName, password })
        .then((user: any) => res.json(user))
        .catch((err: any) => res.json('Error: ' + err));
}

const updateUser = async (req: any, res: any) => {
    const { token } = req.params;
    const { userName, email, password } = req.body;
    await userSchema
        .updateOne({ token: token }, { $set: { userName, email, password } })
        .then((user: any) => res.json(user))
        .catch((err: any) => res.json('Error: ' + err))
}

const deleteUser = async (req: any, res: any) => {
    const { token } = req.params;
    await userSchema
        .deleteOne({ token: token })
        .then((user: any) => res.json(user))
        .catch((err: any) => res.json('Error: ' + err));
}

export {
    getUsers,
    singUp,
    login,
    updateUser,
    deleteUser
}