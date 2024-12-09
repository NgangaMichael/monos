const Product = require('../models/productsModel');

class ProductController {
    static async createProduct(req, res) {
        try {
            const { vendorId, name, price  } = req.body;
            const newProduct = await Product.create({ vendorId, name, price  });
            res.status(200).json({ message: 'New Product created Successfully', Product: newProduct });
        } catch (error) {
            res.status(500).json({ message: 'Error creating Product', error: error.message });
        }
    }

    static async fetchingProducts(req, res) {
        try {
            const products = await Product.findAll();
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching all Products', error: error.message });
        }
    }

    static async fetchingOneProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findByPk(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching one Product', error: error.message });
        }
    }

    static async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const { vendorId, name, price } = req.body;

            const [updatedCount] = await Product.update({ vendorId, name, price }, { where: { id } });
            if (updatedCount === 0) {
                return res.status(404).json({ message: 'Product not found for updating' });
            }

            res.status(200).json({ message: 'Product Updated Successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating Product', error: error.message });
        }
    }

    static async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const deletedCount = await Product.destroy({ where: { id } });
            if (deletedCount === 0) {
                return res.status(404).json({ message: 'Product not found for deleting' });
            }

            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting Product', error: error.message });
        }
    }
}

module.exports = ProductController;