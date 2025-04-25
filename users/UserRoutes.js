import express from 'express';
import UserSchemaModel from "./UserSchema";
import { errorResponseObject, successResponseObject } from "../utils/responseObjects";

const userRouter = express.Router();

userRouter.get('/hello', (req, res) => {
    res.send('Hello, World!!!!');
});


userRouter.get('/getAllUsers', async (req, res) => {
    console.log("Get all users");
    try {
        const users = await UserSchemaModel.find();
        console.log("All users: ", users);
        res.status(200).json(successResponseObject("All users", users));
    } catch (err) {
        res.status(400).json(errorResponseObject("Failed to get users", err.message));
    }
});


userRouter.post('/addUser', async (req, res) => {
    try {
        const userData = req.body;
        const userDB = await UserSchemaModel.find();
        if (userDB.find(user => user.email.type === userData.email.type)) {
            res.status(401).json(errorResponseObject("Username already exists"));
            return;
        }
        const newUser = new UserSchemaModel(userData);
        const result = await newUser.save();
        if (result) {
            res.status(201).json(successResponseObject("User created successfully", result));
        } else {
            res.status(400).json(errorResponseObject("Failed to create user"));
        }
    } catch (err) {
        res.status(400).json(errorResponseObject("Failed to create user", err.message));
    }
});


userRouter.delete('/deleteUser', async (req, res) => {
    try {
        const userId = req.body.email.type;
        const result = await UserSchemaModel.findByIdAndDelete(userId);
        if (result) {
            res.status(200).json(successResponseObject("User deleted successfully", result));
        } else {
            res.status(400).json(errorResponseObject("Failed to delete user"));
        }
    } catch (err) {
        res.status(400).json(errorResponseObject("Failed to delete user", err.message));
    }
});

export default userRouter;