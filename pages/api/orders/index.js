import nc from "next-connect";

import db from "../../../utils/db";
import { Order } from "../../../model/Order";
import { onError } from "../../../utils/error";
import { isAuth } from "../../../utils/auth";

const handler = nc({
  onError
});

handler.use(isAuth);

handler.post(async (req, res) => {
  await db.connect();
  const newOrders = new Order({ 
    ...req.body,
    user: req.user._id
   });
  const orders = await newOrders.save();
  res.status(200).send(orders)
});

export default handler;