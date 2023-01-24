import nc from "next-connect";

import db from "../../../utils/db";
import { Product } from "../../../model/products";

const handler = nc();

handler.get(async (req, res) => {
  const { query: { id } } = req;
  await db.connect();
  const product = await Product.findById(id);
  await db.disconnect();
  res.send(product)
});

export default handler;