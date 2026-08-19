import { Router } from "express";
import { addFavourite, getMyFavourites, removeFavourite } from "../controllers/favourite.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { favouriteSchema } from "../validators/favourite.validator.js";

const router = Router();

router.post("/", requireAuth, validate(favouriteSchema), addFavourite);
router.get("/", requireAuth, getMyFavourites);
router.delete("/:destinationId", requireAuth, removeFavourite);

export default router;