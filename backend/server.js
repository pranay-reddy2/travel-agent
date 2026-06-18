import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import travelRoutes from "./routes/travelRoutes.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.PRODUCTION_FRONTEND_URL
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin)
      ) {
        callback(null, true);
      } else {
        callback(
          new Error("CORS blocked")
        );
      }
    },
    credentials: true
  })
);
app.use(
  express.json({
    limit: "10mb"
  })
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Travel Agent API Running"
  });
});

app.use("/api/travel", travelRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});