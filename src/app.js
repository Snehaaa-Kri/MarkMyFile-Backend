// src/app.js
import express from 'express';
import cors from 'cors';
// import routes from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', (req, res) => {
    res.send("Home page Server is on!!!")
});

// Error Handler
app.use(errorHandler);

export default app;
