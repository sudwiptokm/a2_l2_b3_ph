import { CallbackError, Schema, model } from 'mongoose';
import { Product } from '../product/product.model';
import { TOrder } from './order.interface';

const OrderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: true,
    message: 'Email is required',
  },
  productId: {
    type: String,
    required: true,
    message: 'Product ID is required',
  },
  price: {
    type: Number,
    required: true,
    message: 'Price is required',
  },
  quantity: {
    type: Number,
    required: true,
    message: 'Quantity is required',
  },
});

// Pre-save middleware to check if productId exists in Product collection
// OrderSchema.pre('save', async function (next) {
//   const productExists = await Product.exists({ _id: this.productId });
//   if (!productExists) {
//     const error = new Error(
//       'Product ID does not exist in the Product collection',
//     );
//     return next(error);
//   }
//   next();
// });

OrderSchema.pre('save', async function (next) {
  try {
    const product = await Product.findById(this.productId);

    if (!product) {
      throw new Error('Product does not exist!');
    }

    if (this.quantity > product.inventory.quantity) {
      throw new Error('Insufficient quantity available in inventory');
    }

    // Update the inventory
    product.inventory.quantity -= this.quantity;
    product.inventory.inStock = product.inventory.quantity > 0;

    await product.save();

    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

export const Order = model<TOrder>('Order', OrderSchema);
