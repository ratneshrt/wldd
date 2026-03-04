import express from "express";
import mongoose from "mongoose";
import auth from "./routes/auth.js";
import task from "./routes/task.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI).then(() => console.log("MongoDB connected"));
app.use("/api/auth", auth);
app.use("/api/tasks", task);
app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map