import nc from "next-connect";

import db from "../../../../utils/db";
import { Order } from "../../../../model/Order";
import { isAuth } from "../../../../utils/auth";

const handler = nc();

handler.use(isAuth);

handler.get(async (req, res) => {
  const { query: { id } } = req;
  await db.connect();
  const order = await Order.findById(id);
  await db.disconnect();
  res.send(order)
});

export default handler;