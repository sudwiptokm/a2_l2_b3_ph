import catchAsync from '../../utils/catchAsync';
import { TOrder } from './order.interface';
import { OrderService } from './order.service';
import OrderValidationSchema from './order.validation';

const createOrder = catchAsync(async (req, res) => {
  const order = req.body;
  const zodParsedData = OrderValidationSchema.parse(order);

  const result = await OrderService.createOrderIntoDb(zodParsedData as TOrder);

  res.status(200).json({
    success: true,
    message: 'Order created successfully!',
    data: result,
  });
});

const getOrders = catchAsync(async (req, res) => {
  const { email } = req.query;

  const result = await OrderService.getAllOrdersFromDb(email as string);

  res.status(200).json({
    success: true,
    message: 'Orders fetched successfully!',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getOrders,
};
