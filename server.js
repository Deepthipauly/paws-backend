const express =require('express');
const mongoose = require('mongoose');
const cors= require ('cors');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors());










//port setting

app.listen(process.env.PORT, () => {
    console.log("server started at port 3000");
    mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
    });
  });
  