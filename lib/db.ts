// import mongoose from "mongoose";

import mongoose from "mongoose";


let isConnected = false;

const MONGO_URI = process.env.NEXT_PUBLIC_MONGO_URI ||"mongodb://localhost:27017/moinsss"; // Your MongoDB connection string

export const dbConnect = async (): Promise<void> => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log("Successfully connected to MongoDB");
  } catch (error:any) {
    new Response(
      JSON.stringify({ message: "database error we got", error}),
      { status: 500 }
    );
  }
};
