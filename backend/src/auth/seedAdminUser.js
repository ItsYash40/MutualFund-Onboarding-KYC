import { connectDb, disconnectDb } from "../config/db.js";
import { User } from "../models/User.js";

const admins = [
  {
    name: process.env.ADMIN_NAME || "KYC Review Admin",
    email: process.env.ADMIN_EMAIL || "admin@finboard.local",
    phone: process.env.ADMIN_PHONE || "+910000000001",
    password: process.env.ADMIN_PASSWORD || "Admin@12345",
    role: "admin"
  },
  {
    name: process.env.ADMIN2_NAME || "Operations Admin",
    email: process.env.ADMIN2_EMAIL || "ops.admin@finboard.local",
    phone: process.env.ADMIN2_PHONE || "+910000000002",
    password: process.env.ADMIN2_PASSWORD || "OpsAdmin@12345",
    role: "admin"
  },
  {
    name: process.env.RTA_ADMIN_NAME || "RTA Investor Records Admin",
    email: process.env.RTA_ADMIN_EMAIL || "rta.admin@finboard.local",
    phone: process.env.RTA_ADMIN_PHONE || "+910000000003",
    password: process.env.RTA_ADMIN_PASSWORD || "RtaAdmin@12345",
    role: "rta_admin"
  },
  {
    name: process.env.AMC_ADMIN_NAME || "AMC Scheme Manager",
    email: process.env.AMC_ADMIN_EMAIL || "amc.admin@finboard.local",
    phone: process.env.AMC_ADMIN_PHONE || "+910000000004",
    password: process.env.AMC_ADMIN_PASSWORD || "AmcAdmin@12345",
    role: "amc_admin"
  }
];

async function seedAdminUser() {
  await connectDb();

  for (const admin of admins) {
    const user = await User.findOne({ email: admin.email }).select("+passwordHash");

    if (user) {
      user.name = admin.name;
      user.phone = admin.phone;
      user.role = admin.role;
      user.phoneVerified = true;
      await user.setPassword(admin.password);
      await user.save();
      console.log(`Updated admin user: ${admin.email}`);
    } else {
      const created = new User({
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        role: admin.role,
        phoneVerified: true
      });
      await created.setPassword(admin.password);
      await created.save();
      console.log(`Created admin user: ${admin.email}`);
    }
  }

  console.log("Admin logins:");
  admins.forEach((admin) => {
    console.log(`Email: ${admin.email}`);
    console.log(`Password: ${admin.password}`);
    console.log(`Role: ${admin.role}`);
  });
  await disconnectDb();
}

seedAdminUser().catch(async (error) => {
  console.error(error);
  await disconnectDb();
  process.exit(1);
});
