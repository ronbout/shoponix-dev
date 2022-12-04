import prisma from "../../lib/prisma";

export default async (req, res) => {
  const orders = await prisma.order.findMany({
    include: {
      OrderProducts: {
        include: {
          product: true,
        },
      },
    },
  });
  // const orders = await Order.find()
  //     .sort({ createdAt: 'desc' })
  //     .populate({
  //         path: "products.product",
  //         model: "Product"
  //     });
  // console.log(orders)
  res.status(200).json({ orders });
};
