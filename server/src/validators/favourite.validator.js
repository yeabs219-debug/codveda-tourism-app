import { z } from "zod";

export const favouriteSchema = z.object({
  destinationId: z.string().uuid("Invalid destination ID"),
});