import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoDBConnection from "./Database/connection.js";
import userRoute from "./routes/userRoute.js";
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  mongoDBConnection();
  console.log(`Server is running on port ${PORT}`);
});
