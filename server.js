
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/vote', require('./routes/voteRoutes'));

app.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT)
);
