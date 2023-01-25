import nc from "next-connect";
import bcrypt from "bcryptjs";

import db from "../../../utils/db";
import User from "../../../model/User";
import { signToken } from "../../../utils/auth";

const handler = nc();

handler.post(async (req, res) => {
  const { body: { name, email, password } } = req;
  const hashPassword = bcrypt.hashSync(password);
  await db.connect();
  const newUser = new User({
    name, email, password: hashPassword, isAdmin: false
  });
  const user = await newUser.save();
  await db.disconnect();


  const token = signToken(user);
  res.status(200).json({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  });
});

export default handler;