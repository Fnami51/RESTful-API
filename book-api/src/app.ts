import express from 'express';
import mongoose from 'mongoose';
import { config } from './setting';
import bookRoutes from './routes/bookRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/books', bookRoutes);

mongoose.connect(config.dbUri)
  .then(() => console.log('Подключён к базе данных MongoDB'))
  .catch(error => console.error('Ошибка, нет подключение к базе данных MongoDB', error));

export default app;
