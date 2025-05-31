export class ActionError extends Error {
	constructor(public message: string) {
		super(message);
	}
}
