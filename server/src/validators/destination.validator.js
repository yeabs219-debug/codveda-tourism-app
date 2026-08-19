import { z } from "zod";

export const destinationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(2, "Location is required"),
  price: z.coerce.number().positive("Price must be a positive number"),
  imageUrl: z.string().url("imageUrl must be a valid URL"),
  category: z.string().min(2, "Category is required"),
});