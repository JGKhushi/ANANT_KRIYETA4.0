const prisma = require("./client");


async function main() {
  // create a an admin user with email = admin@gmail.com and password = admin123
  try {
    const user = await prisma.user.create({
      data: {
        name: "Admin User",
        email: "zerobite@gmail.com",
        password: "admin123",
        role: "HOUSEHOLD"
      }
      });

    console.log("Admin user created:", user);
  } catch (error) {
    console.error("Error creating admin user:", error.message);
  }

}

main();