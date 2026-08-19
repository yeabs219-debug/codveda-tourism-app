import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes.js";
import destinationRoutes from "./routes/destinations.route.js";
import bookingRoutes from "./routes/booking.routes.js";
import favouriteRoutes from "./routes/favourite.route.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { generalLimiter, authLimiter } from "./middleware/rateLimit.middleware.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(generalLimiter);

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/favourites", favouriteRoutes);

app.use(errorHandler);
export default app;