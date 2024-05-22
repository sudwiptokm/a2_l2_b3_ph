import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDb = async (order: TOrder) => {
  // Create order in the DB
  const result = await Order.create(order);
  return result;
};

const getAllOrdersFromDb = async (email: string) => {
  const query = email ? { email } : {};
  const result = await Order.find(query);
  return result;
};

export const OrderService = {
  createOrderIntoDb,
  getAllOrdersFromDb,
};
