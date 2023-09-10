import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

const MONGO_STRING = process.env.MONGO_STRING || '';
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

async function connectDB() {
  try {
    await mongoose.connect(MONGO_STRING);
    console.log('Connected to database.');
  } catch (err) {
    console.error(`Database error: ${err}`);
  }
}

connectDB();

app.get('/', (req, res) => {
  res.send('howdy, partner');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
