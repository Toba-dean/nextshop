import nc from 'next-connect';
import db from '../../utils/db';
import { data } from '../../utils/data';
// import { Product } from '../../model/products';
import User from '../../model/User';

const handler = nc();

handler.get(async (req, res) => {
  return res.send({ message: 'already seeded' });
  // await db.connect();
  // await User.deleteMany();
  // await User.insertMany(data.users);
  // await Product.deleteMany();
  // await Product.insertMany(data.products);
  // await db.disconnect();
  // res.send({ message: 'seeded successfully' });
});

export default handler;
