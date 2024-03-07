import { z } from "zod";

export const applicationSchema = z.object({
	applicantId: z.string(),
	applicationToId: z.string(),
	type: z.enum(["give", "take"]),
	subject: z.string(),
	body: z.string(),
	items: z
		.array(
			z.object({
				id: z.string(),
				quantity: z.number().min(1),
			})
		)
		.min(1),
	status: z.enum(["Pending", "Approved"]).default("Pending"),
	phase: z.enum([
		"sent_to_store_manager",
		"sent_to_head",
		"approved_by_head",
		"approved_by_store_manager",
	]),
});

export const applicationSchemaPartial = applicationSchema.partial();
