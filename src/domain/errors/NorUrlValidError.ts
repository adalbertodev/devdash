export class NotUrlValidError extends Error {
	constructor(url: string) {
		super(`The url ${url} is not valid`);
	}
}
