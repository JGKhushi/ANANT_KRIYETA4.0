const donationService = require('../services/donation.service')

exports.createDonation = async (req, res) => {
  try {
    const donation = await donationService.createDonation(req.body);
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}