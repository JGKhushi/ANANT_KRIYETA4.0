const prisma = require('../../prisma/client'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (user) => {
  const existingUser = await prisma.user.findUnique({ where: { email: user.email } });

  if (existingUser) throw new Error('Email already registered');

  const hashedPassword = await bcrypt.hash(user.password, 10);

  const newUser = await prisma.user.create({
    data: {
      ...user,
      password: hashedPassword,
    },
  });

  return {
    ...newUser,
  };
};

const loginUser = async ({ email, password }) => {
  let user = await prisma.user.findUnique({ where: { email } });

  if(!user) {
    user = await prisma.ngo.findUnique({ where: { email } });
  }

  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });

  return { token, user: { id: user.id, name: user.name, role: user.role } };
};

module.exports = { registerUser, loginUser };