const Product = require('../Model/Product.schema');

const createProduct = async (ProductData) => {
    try {
        const newProduct = new Product(ProductData);
        await newProduct.save();
        return newProduct;
    } catch (err) {
        throw err;
    }
}

const getAllProduct = async () => Product.find();

const getProductById = async (id) => Product.findById(id);

// const getProductById = async(ProductId) => Product.findOne({_id: ProductId});

const getProductByName = async (name) => Product.findOne({ Productname: name });

const updateProductById = async (id, updatedProductData) => Product.findByIdAndUpdate(id, updatedProductData, { new: true, });

const deleteProductById = async (id) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        return deletedProduct;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    createProduct,
    getAllProduct,
    getProductById,
    getProductByName,
    updateProductById,
    deleteProductById,
}