import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";


export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  console.log(" Login attempt:", username, password);

  const admin = await Admin.findOne({ username });
  if (!admin) {
    console.log(" Admin not found");
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await admin.matchPassword(password);
  console.log(" Password match:", isMatch);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    _id: admin._id,
    username: admin.username,
    token: generateToken(admin._id),
  });
};
