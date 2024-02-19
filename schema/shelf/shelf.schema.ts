import { z } from "zod";

export const shelfSchema = z.object({
	shelfNum: z.string(),
	row: z.string(),
	column: z.string(),
});

export const shelfSchemaPartial = shelfSchema.partial();
