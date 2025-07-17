import bcrypt from 'bcryptjs';

const generateHash = async () => {
  const password = "NIC_VicePresident_01";
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  console.log("Hashed password:", hashedPassword);
};

generateHash();
