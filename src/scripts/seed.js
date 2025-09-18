const mongoose = require("mongoose");
require("dotenv").config();
const Furniture = require("../models/furniture.model");
require("../connection/mongodb.connection");

const furnitureData = [
  // Living Room
  {
    name: "Modern Sofa",
    category: "living-room",
    price: 899.99,
    quantity: 5,
    imageUrl: "https://example.com/images/modern-sofa.jpg",
    description: "Contemporary 3-seater sofa with premium fabric upholstery",
  },
  {
    name: "Coffee Table",
    category: "living-room",
    price: 299.99,
    quantity: 8,
    imageUrl: "https://example.com/images/coffee-table.jpg",
    description: "Wooden coffee table with glass top and storage shelf",
  },

  // Bedroom
  {
    name: "Queen Bed Frame",
    category: "bedroom",
    price: 799.99,
    quantity: 4,
    imageUrl: "https://example.com/images/queen-bed.jpg",
    description: "Modern queen-size bed frame with headboard",
  },
  {
    name: "Bedside Table",
    category: "bedroom",
    price: 149.99,
    quantity: 12,
    imageUrl: "https://example.com/images/bedside-table.jpg",
    description: "Compact bedside table with drawer",
  },

  // Dining
  {
    name: "Dining Table Set",
    category: "dining",
    price: 1299.99,
    quantity: 3,
    imageUrl: "https://example.com/images/dining-set.jpg",
    description: "6-seater dining table set with chairs",
  },
  {
    name: "Bar Stools",
    category: "dining",
    price: 199.99,
    quantity: 10,
    imageUrl: "https://example.com/images/bar-stools.jpg",
    description: "Set of 2 adjustable height bar stools",
  },

  // Office
  {
    name: "Office Desk",
    category: "office",
    price: 449.99,
    quantity: 6,
    imageUrl: "https://example.com/images/office-desk.jpg",
    description: "Large office desk with cable management",
  },
  {
    name: "Ergonomic Chair",
    category: "office",
    price: 599.99,
    quantity: 7,
    imageUrl: "https://example.com/images/office-chair.jpg",
    description: "Adjustable ergonomic office chair with lumbar support",
  },

  // Outdoor
  {
    name: "Patio Set",
    category: "outdoor",
    price: 999.99,
    quantity: 4,
    imageUrl: "https://example.com/images/patio-set.jpg",
    description: "4-piece weather-resistant patio furniture set",
  },
  {
    name: "Garden Bench",
    category: "outdoor",
    price: 249.99,
    quantity: 6,
    imageUrl: "https://example.com/images/garden-bench.jpg",
    description: "Durable wooden garden bench with armrests",
  },
];

const seedDatabase = async () => {
  try {
    // Clear existing furniture data
    await Furniture.deleteMany({});

    // Insert new furniture data
    await Furniture.insertMany(furnitureData);

    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Connect to MongoDB and seed the database
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    seedDatabase();
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
