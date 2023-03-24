import mongoose from "mongoose";

const { mongoURI } = useRuntimeConfig();

export default defineNitroPlugin(async (nitroApp) => {
  try {
    await mongoose.connect(mongoURI);
    console.log("DB connection established.");
  } catch (err) {
    console.error("DB connection failed.", err);
  }
});
