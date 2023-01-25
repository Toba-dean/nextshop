import nc from "next-connect";
import bcrypt from "bcryptjs";

import db from "../../../utils/db";
import User from "../../../model/User";
import { signToken } from "../../../utils/auth";

const handler = nc();

handler.post(async (req, res) => {
  const { body: { email, password } } = req;
  await db.connect();
  const user = await User.findOne({ email });
  await db.disconnect();

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = signToken(user);
    res.status(200).send({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(401).send({ msg: "Unauthorized User." })
  }
});

export default handler;