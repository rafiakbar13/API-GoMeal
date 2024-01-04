import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import categoriesRoute from "./routes/categories.js";
import foodRoute from "./routes/food.js";
import orderRouter from "./routes/order.js";
import transactionRouter from "./routes/transaction.js";
import { rateLimiterMiddleware } from "./utils/rateLimiter.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(rateLimiterMiddleware);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/categories", categoriesRoute);
app.use("/api/v1/foods", foodRoute);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/transactions", transactionRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
