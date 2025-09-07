// src/app.js
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.route.js'
import errorHandler from './middlewares/errorHandler.js';
import studentRoutes from './routes/student.route.js';

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
app.use('/api/student', studentRoutes)

// Error Handler
app.use(errorHandler);

export default app;
