const express=require ('express');
const app=express();
const mongoose = require('mongoose');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Routes
const userRoutes=require('./routes/userRoutes');
const uploadRoutes = require("./routes/uploadprofileRoutes");
const like=require('./routes/likeRoute')
const thumbnail=require('./routes/thumbnailRoute')

// Mongo Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB is connected"))
  .catch((e) => console.log(e));


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/',userRoutes);
app.use("/", uploadRoutes);
app.use('/',like)
app.use('/',thumbnail)


app.get('/ping', (req, res) => {
  res.status(200).json({ message: "Server is running" });
});
app.listen(PORT, () => { console.log(`Server Started At Port ${PORT}`) });