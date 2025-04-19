const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');
const prisma = require('../../prisma/client');

router.post('/register', register);
router.post('/login', login);


router.post('/register/ngo', async (req, res) => {
  const ngo = req.body;

  // hash the password
  const hashedPassword = bcrypt.hashSync(ngo.password, 10);
  ngo.password = hashedPassword;

  // save the NGO to the database
  try {
    const newNgo = await prisma.ngo.create({
      data: ngo,
    });

    return res.status(201).json(newNgo);
  } catch (error) {
    console.error('Error saving NGO:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }

})

module.exports = router;
