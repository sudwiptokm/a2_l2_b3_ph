import { z } from 'zod';

const ProductVariantsValidationSchema = z.object({
  type: z
    .string()
    .min(1, {
      message: 'Type is required',
    })
    .max(255),
  value: z
    .string()
    .min(1, {
      message: 'Value is required',
    })
    .max(255),
});

const ProductInventoryValidationSchema = z
  .object({
    quantity: z.number(),
    inStock: z.boolean().default(true),
  })
  .transform((data) => ({ ...data, inStock: data.quantity >= 1 }));

const ProductValidationSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Name is required',
    })
    .max(255),
  description: z
    .string()
    .min(1, {
      message: 'Description is required',
    })
    .max(255),
  price: z.number().min(0, {
    message: 'Price is required',
  }),
  category: z
    .string()
    .min(1, {
      message: 'Category is required',
    })
    .max(255),
  tags: z.array(z.string()),
  variants: z.array(ProductVariantsValidationSchema),
  inventory: ProductInventoryValidationSchema,
  isDeleted: z.boolean().optional().default(false),
});

export const ProductUpdateValidationSchema = ProductValidationSchema.partial();

export default ProductValidationSchema;
