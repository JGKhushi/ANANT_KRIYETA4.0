const express = require('express');
const router = express.Router();
const prisma = require('../../prisma/client');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', authenticateToken, async (req, res) => {
  const ngoId = req.user.id;

  try {
    const ngo = await prisma.ngo.findUnique({
      where: { id: ngoId },
      include: {
        acceptedDonations: true,
      },
    });

    if (!ngo) {
      return res.status(404).json({ error: 'NGO not found' });
    }

    const formatted = {
      name: ngo.ngoName,
      registrationNumber: ngo.registrationNumber,
      email: ngo.email,
      phone: ngo.phone,
      address: `${ngo.streetAddress}, ${ngo.city}, ${ngo.state}, ${ngo.pincode}`,
      serviceArea: ngo.areasServed,
      website: ngo.website || "N/A",
      contactPerson: ngo.fullName,
      contactRole: ngo.designation,
      transportAvailable: ngo.canPickup,
      coldStorageAvailable: false, // update if field is added
      numberOfAcceptedDonations: ngo.acceptedDonations.length,
    };

    res.status(200).json(formatted);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch NGO data' });
  }
})

module.exports = router;