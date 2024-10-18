import path from "path";
import Product from "./models/product.model.js"
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";
import express from 'express';
// const exprees = require('express');

dotenv.config();

const app = express();
app.use(express.json());

app.get("/api/products", async (req, res) => {
    // res.send("Hello World!");
    try{
        const products= await Product.find({});
        res.status(200).json({sucess: true, data: products});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({sucess: false, message: "server error"});
    }
})

app.post("/api/products", async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image){
        return res.status(400).json({sucess: false, message: "please provides all fields"});
    }
    const newProduct = new Product(product)
    try{
        await newProduct.save();
        res.status(201).json({sucess: true, data: newProduct});
    }
    catch (error){
        console.error("error in create product:", error.message)
        res.status(500).json({sucess: false, message: "server error"});
    }
});

app.put("/api/products", async (req, res) => {
    const id = req.params.id;
    const product = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({sucess: false, message: "invalid product id"});
    }
    
    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({sucess: true, data: updatedProduct});

    }
    catch (error) {
        console.error("error in update product:", error.message)
        res.status(500).json({sucess: false, message: "server error"});
    
    }
})

app.delete("/api/products/:id", async (req, res) => {
    const id = req.params.id;
    console.log("id:", id )
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({sucess: true, message: "product deleted"});
    }
    catch (error){
        console.error("error in delete product:", error.message);
        res.status(500).json({sucess: false, message: "server error"});
    }
})

app.listen(5000, () =>{
    connectDb();
    console.log('Server is running on port 5000/products');
});