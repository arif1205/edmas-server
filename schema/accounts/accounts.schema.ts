import { z } from "zod";

export const transactionSchema = z.object({
	type: z.enum(["income", "expense"]),
	details: z.string(),
	amount: z.string().refine((val) => !isNaN(parseFloat(val)), {
		message: "Amount must be a number",
	}),
});

export const transactionSchemaPartial = transactionSchema.partial();
