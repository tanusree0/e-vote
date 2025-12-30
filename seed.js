// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Candidate = require('./models/Candidate'); // Points to models folder

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        // 1. Clear existing candidates so you don't get duplicates
        await Candidate.deleteMany({});

        // 2. Insert new candidates
        await Candidate.insertMany([
            { name: "Arvind Kumar", party: "Democratic Party" },
            { name: "Sita Sharma", party: "National Front" },
            { name: "Vikram Singh", party: "Progressive Alliance" }
        ]);

        console.log("✅ Database Seeded Successfully!");
        process.exit(); // Close the script
    } catch (err) {
        console.error("❌ Seeding Error:", err);
        process.exit(1);
    }
};

seedData();