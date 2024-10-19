import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDb } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

//middleware
app.use(express.json()); // for accepting json data in req.body
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/products", productRoutes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
    const staticPath = path.join(__dirname, '/frontend/dist');
    app.use(express.static(staticPath));
    
    app.get("*", (req, res) => {
        res.sendFile(path.join(staticPath, 'index.html'));
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
const startServer = async () => {
    try {
        await connectDb();
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();