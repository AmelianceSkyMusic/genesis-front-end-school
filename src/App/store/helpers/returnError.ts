import { APP } from '~constants/APP';

export function returnError(errorPath: string, error: unknown): string {
	let message = 'Sorry, something went wrong ¯\\_(ツ)_/¯!';
	if (typeof error === 'string') message = error;
	if (error instanceof Error) message = error.message;

	// eslint-disable-next-line no-console
	console.error(`${APP.NAME} API >`, `${errorPath}:\n`, message);
	return message;
}
