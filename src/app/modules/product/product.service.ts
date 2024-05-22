import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDb = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getAllProductsFromDb = async (searchTerm: string) => {
  let query = {};

  if (searchTerm) {
    query = {
      name: { $regex: searchTerm, $options: 'i' },
    };
  }
  const result = await Product.find(query);
  return result;
};

const getProductByIdFromDb = async (productId: string) => {
  const result = await Product.findById(productId);
  return result;
};

const updateProductInDb = async (productId: string, productData: TProduct) => {
  if (await Product.isProductExist(productId)) {
    const result = await Product.findOneAndUpdate(
      { _id: productId },
      { $set: productData },
      { new: true },
    );
    return result;
  } else {
    throw new Error('Product not found');
  }
};

const deleteProductFromDb = async (productId: string) => {
  if (await Product.isProductExist(productId)) {
    const result = await Product.findOneAndUpdate(
      { _id: productId },
      { $set: { isDeleted: true } },
      { new: true },
    );
    return result;
  } else {
    throw new Error('Product not found');
  }
};

export const ProductService = {
  createProductIntoDb,
  getAllProductsFromDb,
  getProductByIdFromDb,
  updateProductInDb,
  deleteProductFromDb,
};
