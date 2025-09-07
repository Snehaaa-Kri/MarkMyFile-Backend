import authController from "../controllers/auth.controller.js";
import userController from "../controllers/user.controller.js";

import express from 'express';
import { validateJWT } from "../middlewares/auth.middleware.js";
const userRoutes = express.Router();

userRoutes.post('/register', authController.registerUser);
userRoutes.post('/login', authController.loginUser);
userRoutes.post('/logout', authController.logoutUser);
userRoutes.get('/me', validateJWT, authController.getCurrentUser);
userRoutes.post('/changePassword', validateJWT, authController.changePasswod);


userRoutes.delete('/deleteMyAccount/:id', validateJWT, userController.deleteUser);

export default userRoutes;