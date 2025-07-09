import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import notesRoutes from "./routes/noteRoutes.js"
import eventsRouter from './routes/eventsRoutes.js'; 
import actRouter from './routes/activityRoutes.js';
import pomodoroRouter from './routes/pomodoroRoutes.js';

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser()); // set protected routes

app.use('/api/users', userRoutes); // path ---> nel database per la collection "users" usi le userRoutes
app.use("/api/notes", notesRoutes);
app.use('/api/events', eventsRouter);
app.use('/api/activities', actRouter);
app.use('/api/pomodoros', pomodoroRouter);


if (process.env.NODE_ENV === 'production') { 
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')) // // Qualsiasi rotta non trovata (*) viene reindirizzata a index.html per gestire il routing client-side
  );
} else { // Se non sei in produzione, la root "/" risponde con una stringa semplice
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

// NOTA: il server va fatto partire con "npm run server" --> in questo modo partirà con il comando nodemon 