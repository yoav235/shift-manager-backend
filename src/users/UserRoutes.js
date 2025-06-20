import express from 'express';
import UserSchemaModel from "./UserSchema.js";
import { errorResponseObject, successResponseObject } from "../utils/responseObjects.js";

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
        const { email } = req.body;                         // make sure body-parser is enabled
        const result = await UserSchemaModel.findOneAndDelete({ email });  // <-- here
        if (result) {
            res.status(200).json(successResponseObject('User deleted', result));
        } else {
            res.status(404).json(errorResponseObject('User not found'));
        }
    } catch (err) {
        res.status(400).json(errorResponseObject('Failed to delete user', err.message));
    }
});

userRouter.post('/login', async (req, res) => {
    try{
        const data = req.body;
        const user = new UserSchemaModel({email: data.email, password: data.password, isManager: data.isManager});
        console.log("User password attempt: ", user.password);
        const foundUser = await UserSchemaModel.findOne({ email: user.email });
        console.log("Found user: ", foundUser);
        const isPasswordValid = await foundUser.comparePassword(user.password);
        if (!foundUser || !isPasswordValid) {
            res.status(401).json(errorResponseObject("Invalid email or password"));
            return;
        }
        res.status(200).json(successResponseObject("User logged in successfully", foundUser));
    } catch (err) {
        res.status(400).json(errorResponseObject("Failed to login", err.message));
    }
});

export default userRouter;