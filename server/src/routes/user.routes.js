const express = require('express');
const router = express.Router();
const prisma = require('../../prisma/client');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },

    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const formattedUser = {
      id: user.id,
      name: user.fullName,
      email: user.email,
      phone: user.phone,
      address: user.address,
    };

    res.status(200).json(formattedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});


module.exports = router;