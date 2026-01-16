require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const data = require("./init/data");

const dburl = process.env.ATLASDB_URL; //  use your Atlas DB URL from .env

mongoose
  .connect(dburl)
  .then(() => console.log(" Connected to MongoDB Atlas"))
  .catch((err) => console.error(" MongoDB connection error:", err));

async function seedDB() {
  try {
    // Optional: Clear existing records
    await Listing.deleteMany({});

    //  Add default required fields if missing
    const formattedData = data.map((item, index) => ({
      title: item.title || `Sample Listing ${index + 1}`,
      price: item.price || Math.floor(Math.random() * 5000) + 500, // random fallback price
      description: item.description || "Default description added automatically.",
      location: item.location || "Unknown Location",
      country: item.country || "India",
      image: item.image || {
        filename: "default",
        url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60"
      }
    }));

    //  Insert modified data
    await Listing.insertMany(formattedData);
    console.log(" Database seeded successfully!");
  } catch (err) {
    console.error(" Error seeding database:", err);
  } finally {
    mongoose.connection.close();
    console.log(" MongoDB connection closed.");
  }
}

seedDB();

