import { z } from 'zod';

const OrderValidationSchema = z.object({
  email: z.string().min(1, {
    message: 'Email is required',
  }),
  productId: z.string().min(1, {
    message: 'Product ID is required',
  }),
  price: z.number().min(0, {
    message: 'Price is required',
  }),
  quantity: z.number().min(0, {
    message: 'Quantity is required',
  }),
});

export default OrderValidationSchema;
