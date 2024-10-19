import mongoose from "mongoose";
import Product from "../models/product.model.js";

// Helper function for error responses
const sendErrorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({ success: false, message });
};

// Helper function for success responses
const sendSuccessResponse = (res, statusCode, data) => {
    return res.status(statusCode).json({ success: true, data });
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).lean().select('-__v');
        sendSuccessResponse(res, 200, products);//or
        //res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error in fetching products:", error);
        sendErrorResponse(res, 500, "Internal Server Error");
    }
};

export const createProduct = async (req, res) => {
    const { name, price, image } = req.body;

    if (!name || !price || !image) {
        return sendErrorResponse(res, 400, "Please provide all required fields");
    }

    try {
        const newProduct = await Product.create({ name, price, image });
        sendSuccessResponse(res, 201, newProduct);
    } catch (error) {
        console.error("Error in creating product:", error);
        if (error.name === 'ValidationError') {
            return sendErrorResponse(res, 400, error.message);
        }
        sendErrorResponse(res, 500, "Internal Server Error");
    }
};

export const updateProduct = async (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return sendErrorResponse(res, 400, "Invalid Product ID");
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: true, lean: true }
        );

        if (!updatedProduct) {
            return sendErrorResponse(res, 404, "Product not found");
        }

        sendSuccessResponse(res, 200, updatedProduct);
    } catch (error) {
        console.error("Error in updating product:", error);
        if (error.name === 'ValidationError') {
            return sendErrorResponse(res, 400, error.message);
        }
        sendErrorResponse(res, 500, "Internal Server Error");
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return sendErrorResponse(res, 400, "Invalid Product ID");
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(id).lean();

        if (!deletedProduct) {
            return sendErrorResponse(res, 404, "Product not found");
        }

        sendSuccessResponse(res, 200, { message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error in deleting product:", error);
        sendErrorResponse(res, 500, "Internal Server Error");
    }
};