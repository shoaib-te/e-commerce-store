import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Replace <db_uri> with your actual MongoDB connection string
    await mongoose.connect(`${process.env.MONGO_URI}`);
  } catch {
    process.exit(1); // Stop the server if the connection fails
  }
};

export default connectDB;
