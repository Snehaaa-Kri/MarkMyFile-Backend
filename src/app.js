// src/app.js
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.route.js'
import errorHandler from './middlewares/errorHandler.js';
import studentRoutes from './routes/student.route.js';
import facultyRoutes from './routes/faculty.route.js';
import collegeRoutes from './routes/college.route.js';
import labRoutes from './routes/lab.route.js';
import assignmentRoutes from './routes/assignment.route.js';
import submissionRoutes from './routes/submission.route.js';
import resourceRoutes from './routes/resource.route.js';
import notificationRoutes from './routes/notification.route.js';

const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// app.use('/', (req, res) => {
    //     res.send("Home page Server is on!!!")
    // });
    app.use('/api/user', userRoutes);
    app.use('/api/student', studentRoutes);
    app.use('/api/faculty', facultyRoutes);
    app.use('/api/college', collegeRoutes);
    app.use('/api/lab', labRoutes);
    app.use('/api/assignment', assignmentRoutes);
    app.use('/api/submission', submissionRoutes);
    app.use('/api/resource', resourceRoutes);
    app.use('/api/notification', notificationRoutes);
    
    // Error Handler
    app.use(errorHandler);
    
    export default app;
