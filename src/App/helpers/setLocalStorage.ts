import { APP } from '~constants/APP';

import { appLog } from './appLog';

const APP_NAME = APP.NAME;

export function setLocalStorage<T>(store: string, key: string, value: T) {
	const setLocalStorageItem = <K, D>(storeObj: Record<string, K>, localValue: D) => {
		localStorage.setItem(APP_NAME, JSON.stringify({
			...storeObj,
			[store]: {
				...storeObj[store],
				[key]: localValue,
			},
		}));
	};

	try {
		const appStorage = localStorage.getItem(APP_NAME);
		const appStorageObj = appStorage ? JSON.parse(appStorage) : {};
		setLocalStorageItem(appStorageObj, value);
	} catch (error) {
		appLog('setLocalStorage', error);
	}
}
