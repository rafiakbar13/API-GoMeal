import prisma from "../db/prisma.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        food: true,
      },
    });
    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error while fetching orders",
    });
  }
};

export const getOrder = async (req, res) => {};

export const createOrder = async (req, res) => {
  const { userId, items, status, deliveryAddress, paymentMethod } = req.body;
  try {
    const order = await prisma.order.create({
      data: {
        user: { connect: { id: userId } },
        items: {
          create: items.map((item) => ({
            food: { connect: { id: item.foodId } },
            quantity: item.quantity,
          })),
        },
        status,
        deliveryAddress,
        paymentMethod,
      },
      include: { items: true, user: true },
    });
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: "Error creating order" });
  }
};

export const updateOrder = async (req, res) => {};

export const deleteOrder = async (req, res) => {};

// const { foodId, quantity, status, deliveryAddress, paymentMethod, user } =
//   req.body;
// try {
//   const food = await prisma.food.findUnique({
//     where: {
//       id: foodId,
//     },
//   });
//   if (!food) {
//     return res.status(404).json({
//       success: false,
//       message: "Food not found",
//     });
//   }
//   const newOrder = await prisma.order.create({
//     data: {
//       quantity,
//       food: {
//         connect: {
//           id: foodId,
//         },
//       },
//       status,
//       deliveryAddress,
//       paymentMethod,
//     },
//   });
//   res.status(201).json({
//     success: true,
//     message: "Order created successfully",
//     data: newOrder,
//   });
// } catch (error) {
//   console.log(error);
//   res.status(400).json({
//     success: false,
//     message: "Error while creating order",
//   });
// }
