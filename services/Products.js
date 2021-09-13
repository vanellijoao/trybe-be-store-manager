const { ObjectId } = require('mongodb');
const Products = require('../models/Products');

const invalidData = 'invalid_data';

const errors = {
  productAlreadyExists: {
    err: {
      code: invalidData,
      message: 'Product already exists',
    },
  },
  smallName: {
    err: {
      code: invalidData,
      message: '"name" length must be at least 5 characters long',
    },
  },
  invalidQuantity: {
    err: {
      code: invalidData,
      message: '"quantity" must be larger than or equal to 1',
    },
  },
  invalidQuantityType: {
    err: {
      code: invalidData,
      message: '"quantity" must be a number',
    },
  },
  invalidId: {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  },
};

const getAllProducts = async () => {
  const products = await Products.getAllProducts();

  return products;
};

const findProductById = async (id) => {
  if (!ObjectId.isValid(id)) return errors.invalidId;

  const productFound = await Products.findProductById(id);

  return productFound;
};

const checkProductWithSameName = async (name) => {
  const products = await getAllProducts();
  console.log(products);

  const productExists = products.some((product) => product.name === name);
  console.log(productExists);

  if (productExists) return true;
};

const checkNameLength = (name, length) => {
  if (name.length < length) return true;
};

const checkQuantityType = (quantity) => {
  if (typeof quantity !== 'number') return true;
};

const checkQuantityValue = (quantity) => {
  if (quantity < 1) return true;
};

const validate = async ({ name, quantity }) => {
  switch (true) {
    case await checkProductWithSameName(name): return errors.productAlreadyExists;
    case checkNameLength(name, 5): return errors.smallName;
    case checkQuantityType(quantity): return errors.invalidQuantityType;
    case checkQuantityValue(quantity): return errors.invalidQuantity;
    default:
      return {};
  }
};

const createProduct = async (product) => {
  const createdProduct = await Products.createProduct(product);

  return createdProduct;
};

module.exports = {
  getAllProducts,
  findProductById,
  validate,
  createProduct,
};