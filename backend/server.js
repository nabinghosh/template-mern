import path from "path";
import route from "./routes/product.route.js"
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";
import express from 'express';
// const exprees = require('express');

// const express = require('express');
// const app = express();
// const port = 3000;
// app.listen(port, () => {
    //     console.log(`Server is running on port ${port}`
    //     );
    // });

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/product", route);

app.listen(5000, () =>{
    connectDb();
    console.log('Server is running on port 5000/products');
});