import catchAsync from '../../utils/catchAsync';
import { TProduct } from './product.interface';
import { ProductService } from './product.service';
import ProductValidationSchema, {
  ProductUpdateValidationSchema,
} from './product.validation';

const createProduct = catchAsync(async (req, res) => {
  const product = req.body;
  const zodParsedData = ProductValidationSchema.parse(product);

  const result = await ProductService.createProductIntoDb(
    zodParsedData as TProduct,
  );

  res.status(200).json({
    success: true,
    message: 'Product created successfully!',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const { searchTerm } = req.query;
  console.log({ searchTerm });
  const result = await ProductService.getAllProductsFromDb(
    searchTerm as string,
  );

  res.status(200).json({
    success: true,
    message: 'Products fetched successfully!',
    data: result,
  });
});

const getProductById = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const result = await ProductService.getProductByIdFromDb(productId);

  res.status(200).json({
    success: true,
    message: 'Product fetched successfully!',
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const product = req.body;
  const zodParsedData = ProductUpdateValidationSchema.parse(product);
  const result = await ProductService.updateProductInDb(
    productId,
    zodParsedData as TProduct,
  );

  res.status(200).json({
    success: true,
    message: 'Product updated successfully!',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;

  await ProductService.deleteProductFromDb(productId);

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully!',
    data: null,
  });
});

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
