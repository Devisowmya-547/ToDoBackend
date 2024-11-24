const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const tasksRoute = require('./routes/tasks');
const userRoute = require('./routes/user');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/tasks', tasksRoute);
app.use('/user', userRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
