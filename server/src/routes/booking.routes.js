import { Router } from "express";
import { createBooking, getMyBookings, cancelBooking, confirmBooking } from "../controllers/booking.controller.js";
import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { bookingSchema } from "../validators/booking.validator.js";

const router = Router();

router.post("/", requireAuth, validate(bookingSchema), createBooking);
router.get("/", requireAuth, getMyBookings);
router.patch("/:id/cancel", requireAuth, cancelBooking);
router.patch("/:id/confirm", requireAuth, requireAdmin, confirmBooking);

export default router;