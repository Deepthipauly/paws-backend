const express =require('express');
const mongoose = require('mongoose');
const cors= require ('cors');
require('dotenv').config();


const authRouter = require("./routes/auth.routes");
const adminRouter= require("./routes/admin.routes");


const app = express();
app.use(express.json());
app.use(cors());

// admin route

app.use("/auth",authRouter);
app.use("/admin",adminRouter);

app.get("/view_category");
app.get("/view_breed");
app.post("/add_reviews");
app.get("view_reviews");
app.post("/add_breed");
app.post("edit_breed");
app.delete("/delete_breed");
app.post("/delete_review");
app.delete("/delete_user");
app.post("/logout");













//port setting

const server = app.listen(process.env.PORT, () => {
    console.log("server started at port 3000");
    mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
    });
  });


process.on("unhandledRejection",(err)=>{
    console.log("unhandledRejection");
    console.log(err,err.message,err.stack);
    server.close(()=>{
      console.log("Server shutting down");
      process.exit(1);
    })
  });
  