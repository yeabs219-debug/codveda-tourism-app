import { Router } from "express";
import {
  getAllDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
} from "../controllers/destinations.controller.js";
import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { destinationSchema } from "../validators/destination.validator.js";
const router = Router();

router.get("/", getAllDestinations);
router.get("/:id", getDestinationById);
router.post("/", requireAuth, requireAdmin, validate(destinationSchema), createDestination);
router.put("/:id", requireAuth, requireAdmin,validate(destinationSchema),updateDestination);
router.delete("/:id", requireAuth, requireAdmin, deleteDestination);

export default router;