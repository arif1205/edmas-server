import { z } from "zod";

export const productSchema = z.object({
	name: z.string(),
	quantity: z.string().refine((val) => Number(val) && Number(val) >= 0, {
		message: "Quantity can not be less than 0",
	}),
	location: z.string(),
	image: z.string().optional(),
});

export const productSchemaPartial = productSchema.partial();
