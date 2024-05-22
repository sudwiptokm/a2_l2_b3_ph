import { Model, ObjectId } from 'mongoose';

export type TProductVariants = {
  type: string;
  value: string;
};

export type TProductInventory = {
  quantity: number;
  inStock?: boolean;
};

export type TProduct = {
  id: ObjectId;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TProductVariants[];
  inventory: TProductInventory;
  isDeleted?: boolean;
};

export interface ProductModel extends Model<TProduct> {
  // eslint-disable-next-line no-unused-vars
  isProductExist(id: string): Promise<TProduct | null>;
}
