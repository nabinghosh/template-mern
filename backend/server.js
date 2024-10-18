import path from "path";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";
import express from 'express';
// const exprees = require('express');

dotenv.config();

const app = express();

app.get("/products", (req, res) => {
    res.send("Hello World!");
})

app.listen(5000, () =>{
    connectDb();
    console.log('Server is running on port 5000/products');
});