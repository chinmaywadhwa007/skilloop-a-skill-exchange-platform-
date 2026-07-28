import "dotenv/config";
import { createApp } from "./app.js";
import { connectDB } from "./config/db.js";

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    createApp().listen(port, () => console.log(`SkillLoop API listening on :${port}`));
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

start();
