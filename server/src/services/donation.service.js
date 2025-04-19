const prisma = require('../../prisma/client');


exports.createDonation = async (data) => {
  return await prisma.donation.create({
    data: {
      ...data,
      expiryDate: new Date(data.expiryDate),
    }
  })
}

exports.getDonationById = async (id) => {
  return await prisma.donation.findUnique({
    where: { id },
    include: { user: true, ngo: true }
  })
}

exports.getDonationsByUser = async (userId) => {
  return await prisma.donation.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
};

exports.getPendingDonations = async () => {
  return await prisma.donation.findMany({
    where: { status: 'pending' },
    include: { user: true },
    orderBy: { createdAt: 'desc' }
  })
}

exports.acceptDonation = async (donationId) => {
  return await prisma.donation.update({
    where: { id: donationId },
    data: { status: 'accepted' },
  })
} 