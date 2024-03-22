import { z } from "zod";

export const shelfSchema = z.object({
	shelfNum: z.string(),
});

export const shelfSchemaPartial = shelfSchema.partial();
