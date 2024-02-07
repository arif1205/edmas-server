export interface CustomError extends Error {
	status?: number;
}

export type Role =
	| "store_manager"
	| "dept_head"
	| "teacher"
	| "lab_assistant"
	| "officials";
