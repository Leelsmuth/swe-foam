import express from 'express';
import dotenv from 'dotenv';

import connectDB from './config/db.js';

import pictureRoutes from './routes/pictureRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use('/api/pictures', pictureRoutes);




const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
