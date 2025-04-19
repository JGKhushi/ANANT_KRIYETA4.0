const express = require("express");
const router = express.Router();
const prisma = require("../../prisma/client");
const authenticateToken = require("../middlewares/auth.middleware");
const { format } = require("date-fns");
const sendAllNGO = require("../utils/mail/sendAllNGO");
const sendEmail = require("../utils/mail/sendEmail");

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

router.post("/", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const donation = req.body;

  try {
    await prisma.donation.create({
      data: {
        userId,
        ...donation,
      },
    });

    // Send email to all NGOs asynchronously
    sendAllNGO().catch((error) => {
      console.error("Error sending emails to NGOs:", error);
    });

    res.status(201).json({ message: "Donation saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save donation" });
  }
});

router.put("/accept/:donationid", authenticateToken, async (req, res) => {
  const { donationid } = req.params;
  const donationId = donationid;
  const ngoId = req.user.id;

  console.log("NGO ID:", ngoId);

  const donation = await prisma.donation.findUnique({
    where: { id: donationId },
    select: {
      status: true,
      user: {
        select: {
          email: true,
        },
      },
    },
  });

  if (!donation) {
    return res.status(404).json({ error: "Donation not found" });
  }

  if (donation.status !== "pending") {
    return res.status(400).json({ error: "Donation is not pending" });
  }

  try {
    await prisma.donation.update({
      where: { id: donationId },
      data: {
        status: "accepted",
        ngoId,
      },
    });

    const donorEmail = donation.user.email;
    const subject = "Donation Accepted";
    const message = `Your donation has been accepted by an NGO. Thank you for your generosity!, check your dashboard for more details.`;
    sendEmail(donorEmail, subject, message);

    res.status(200).json({ message: "Donation accepted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to accept donation" });
  }
});

router.get("/accepted", authenticateToken, async (req, res) => {
  const ngoId = req.user.id;
  try {
    const donations = await prisma.donation.findMany({
      where: {
        ngoId,
        status: "accepted",
      },
      include: {
        user: {
          select: {
            fullName: true,
            phone: true,
          },
        },
      },

      orderBy: { createdAt: "desc" },
    });

    const formatted = donations.map((donation) => ({
      id: donation.id,
      donorName: donation.user.fullName,
      foodType: donation.foodCategory,
      items: donation.foodItems.split(",").map((item) => item.trim()),
      quantity: donation.quantity,
      expiry: donation.expiry,
      location: donation.location,
      acceptedDate: format(new Date(donation.createdAt), "MMMM d, yyyy"),
      pickupScheduled: `${donation.preparationDate}, ${donation.preparationTime}`,
      status: donation.status,
      contactPhone: donation.contactPhone || donation.user.phone,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch donations" });
  }
});

router.get("/donorswithngo", authenticateToken, async (req, res) => {
  const ngoId = req.user.id;

  try {
    const donations = await prisma.donation.findMany({
      where: {
        ngoId: ngoId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const donorsMap = new Map();
    for (const donation of donations) {
      const { user, createdAt, foodItems, quantity, status } = donation;

      if (!donorsMap.has(user.id)) {
        donorsMap.set(user.id, {
          id: user.id,
          name: user.fullName,
          avatar: `/placeholder.svg?height=100&width=100&text=${getInitials(
            user.fullName
          )}`,
          location: user.address,
          phone: user.phone,
          email: user.email,
          donationCount: 0,
          lastDonation: null,
          donationHistory: [],
        });
      }

      const donor = donorsMap.get(user.id);
      donor.donationCount += 1;
      donor.donationHistory.push({
        date: formatDate(createdAt),
        items: foodItems.split(",").map((item) => item.trim()),
        quantity,
        status,
      });

      if (!donor.lastDonation) {
        donor.lastDonation = formatDate(createdAt);
      }
    }

    const formattedDonorsData = Array.from(donorsMap.values());

    res.status(200).json(formattedDonorsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch donations" });
  }
});

router.get("/pending", async (req, res) => {
  try {
    const donations = await prisma.donation.findMany({
      where: { status: "pending" },
      include: {
        user: {
          select: {
            fullName: true,
            phone: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = donations.map((donation) => ({
      id: donation.id,
      donorName: donation.user.fullName,
      foodType: donation.foodCategory,
      items: donation.foodItems.split(",").map((item) => item.trim()),
      quantity: donation.quantity,
      expiry: donation.expiry,
      location: donation.location,
      postedDate: format(new Date(donation.createdAt), "MMMM d, yyyy"),
      contactPhone: donation.contactPhone || donation.user.phone,
      pickupTimes: donation.pickupTimes,
      notes: donation.description || "No additional notes",
      image: donation.foodImage,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch donations" });
  }
});

router.get("/", authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const donations = await prisma.donation.findMany({
      where: { userId },
      include: {
        ngo: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedDonations = donations.map((donation) => ({
      id: donation.id,
      date: format(new Date(donation.createdAt), "MMMM d, yyyy"),
      organization: donation.ngo?.ngoName || "Waiting for an NGO to accept",
      items: donation.foodItems.split(",").map((item) => item.trim()),
      quantity: donation.quantity,
      expiry: donation.expiry,
      location: donation.location,
      status: donation.status,
    }));

    res.status(200).json(formattedDonations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch donations" });
  }
});

module.exports = router;
