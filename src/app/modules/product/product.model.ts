import { Schema, model } from 'mongoose';
import {
  ProductModel,
  TProduct,
  TProductInventory,
  TProductVariants,
} from './product.interface';

const ProductVariantsSchema = new Schema<TProductVariants>(
  {
    type: {
      type: String,
      required: true,
      message: 'Type is required',
    },
    value: {
      type: String,
      required: true,
      message: 'Value is required',
    },
  },
  { _id: false },
);

const ProductInventorySchema = new Schema<TProductInventory>(
  {
    quantity: {
      type: Number,
      required: true,
      message: 'Quantity is required',
    },
    inStock: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  { _id: false },
);

ProductInventorySchema.pre('save', function (next) {
  if (this.quantity < 0) {
    throw new Error('Quantity cannot be negative');
  }
  if (this.quantity >= 1) {
    this.inStock = true;
  } else {
    this.inStock = false;
  }
  next();
});

const ProductSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: true,
      message: 'Name is required',
    },
    description: {
      type: String,
      required: true,
      message: 'Description is required',
    },
    price: {
      type: Number,
      required: true,
      message: 'Price is required',
    },
    category: {
      type: String,
      required: true,
      message: 'Category is required',
    },
    tags: {
      type: [String],
      required: true,
      message: 'Tags is required',
    },
    variants: {
      type: [ProductVariantsSchema],
      required: true,
      message: 'Variants is required',
    },
    inventory: {
      type: ProductInventorySchema,
      required: true,
      message: 'Inventory is required',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.isDeleted;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.isDeleted;
        return ret;
      },
    },
  },
);

// Query Middleware
ProductSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

ProductSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

ProductSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

ProductSchema.statics.isProductExist = async function (id: string) {
  const existingProduct = await this.findById(id);
  return existingProduct;
};

export const Product = model<TProduct, ProductModel>('Product', ProductSchema);
