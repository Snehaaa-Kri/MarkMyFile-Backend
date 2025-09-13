import studentController from '../controllers/student.controller.js'
import upload from '../middlewares/upload.middleware.js';
import express from 'express';
import { validateJWT, authorizeRoles } from '../middlewares/auth.middleware.js';
const studentRouter = express.Router();

studentRouter.post('/register', validateJWT, authorizeRoles('student'), upload.single('profileImage'), studentController.registerStudent);
studentRouter.get('/profile', validateJWT, authorizeRoles('student'), studentController.getProfile);
studentRouter.put('/updateProfile', validateJWT, authorizeRoles('student'), studentController.updateProfile);
studentRouter.post('/joinlab/:id', validateJWT, authorizeRoles('student'), studentController.joinLab);
studentRouter.delete('/leavelab/:id', validateJWT, authorizeRoles('student'), studentController.leaveLab);
studentRouter.get('/allLabs', validateJWT, authorizeRoles('student'), studentController.getAllLabs);
studentRouter.get('/allAssignments', validateJWT, authorizeRoles('student'), studentController.getAllAssignments);


export default studentRouter;