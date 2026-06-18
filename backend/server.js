import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import travelRoutes from "./routes/travelRoutes.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL?.replace(/\/$/, ""),
  process.env.PRODUCTION_FRONTEND_URL?.replace(/\/$/, "")
].filter(Boolean);

console.log("Allowed Origins:", allowedOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
      const normalizedOrigin = origin?.replace(/\/$/, "");

      console.log("Request Origin:", normalizedOrigin);

      if (
        !origin ||
        allowedOrigins.includes(normalizedOrigin)
      ) {
        return callback(null, true);
      }

      console.log("Blocked Origin:", normalizedOrigin);

      callback(
        new Error(
          `Origin ${normalizedOrigin} not allowed by CORS`
        )
      );
    },
    credentials: true,
    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS"
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization"
    ]
  })
);

// Handle preflight requests
app.options("*", cors());

app.use(
  express.json({
    limit: "10mb"
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Travel Agent API Running"
  });
});

app.use("/api/travel", travelRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: err.message
  });
});

console.log(
  "Gemini Key Present:",
  !!process.env.GEMINI_API_KEY
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT}`
  );
});