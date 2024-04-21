const ProductModel = require('../models/productModel'); // Import the ProductModel
const ProductJson = require('../db.json'); // Import the JSON data containing the products

exports.create = async (req, res) => {
    try {
        await ProductModel.deleteMany();
        // Create products using the create method directly
        await ProductModel.create(ProductJson.products);

        // Respond with a success message
        res.status(201).json({ message: "Products created successfully" });
    } catch (error) {
        // If an error occurs, respond with the error message
        res.status(400).json({ message: error.message });
    }
}    