import { z } from "zod";

export const bookingSchema = z.object({
  destinationId: z.string().uuid("Invalid destination ID"),
  travelDate: z.coerce.date({ invalid_type_error: "Invalid travel date" }),
  guests: z.coerce
    .number()
    .int()
    .positive("Guests must be a positive number")
    .max(10, "Maximum 10 guests per booking"),
});