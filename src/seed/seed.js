import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

import { User } from "../models/user.model.js";
import { Record } from "../models/record.model.js";
import { userRoleEnum, amountTypeEnum } from "../utils/constants.js";
import connectDB from "../db/dbConnection.js";

dotenv.config();



const seedData = async () => {
  try {
    console.log("Seeding started...");

    // Clear data
    await User.deleteMany({});
    await Record.deleteMany({});
    console.log("Old data cleared");



    // Create users using ENUM
    const users = await User.create([
      {
        name: "Admin User",
        email: "admin@demo.com",
         password: "admin123",
        role: userRoleEnum.ADMIN,
      },
      {
        name: "Analyst User",
        email: "analyst@demo.com",
         password: "analyst",
        role: userRoleEnum.ANALYST,
      },
      {
        name: "Viewer User",
        email: "viewer@demo.com",
        password: "viewer123",
        role: userRoleEnum.VIEWER,
      },
    ]);

    const [admin, analyst] = users;

    console.log("Users created");

    // Create records using ENUM
    await Record.create([
      {
        amount: 50000,
        type: amountTypeEnum.INCOME,
        category: "Salary",
        date: new Date("2024-01-05"),
        notes: "January salary",
        createdBy: admin._id,
      },
      {
        amount: 1200,
        type: amountTypeEnum.EXPENSE,
        category: "Rent",
        date: new Date("2024-01-10"),
        notes: "January rent",
        createdBy: admin._id,
      },
      {
        amount: 800,
        type: amountTypeEnum.EXPENSE,
        category: "Groceries",
        date: new Date("2024-01-15"),
        notes: "Weekly groceries",
        createdBy: analyst._id,
      },
      {
        amount: 5000,
        type: amountTypeEnum.INCOME,
        category: "Freelance",
        date: new Date("2024-03-01"),
        notes: "Website project",
        createdBy: analyst._id,
      },
    ]);

    console.log("Records created");

    console.log("\nSeed completed successfully");
    console.log("Admin   -> admin@demo.com / admin123");
    console.log("Analyst -> analyst@demo.com / analyst123");
    console.log("Viewer  -> viewer@demo.com / viewer123");

  } catch (error) {
    console.error("Seeding failed:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("Database disconnected");
  }
};

const start = async () => {
  await connectDB();
  await seedData();
};

start();