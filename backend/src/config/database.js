import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Replace <db_uri> with your actual MongoDB connection string
    const conn = await mongoose.connect(`${process.env.MONGO_URI}`);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Stop the server if the connection fails
  }
};

export default connectDB;
