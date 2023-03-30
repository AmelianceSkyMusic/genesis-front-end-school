import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { BASE_URL } from './constants/BASE_URL';
import { returnError } from './helpers/returnError';

const requestURL = 'auth/anonymous?platform=subscriptions';

interface UseUserState {
	token: string | null;
	loading: boolean;
	error: string | null;
	fetchToken: () => void;
}

export const useUserState = create<UseUserState>()(devtools((set) => ({
	token: null,
	loading: false,
	error: null,
	fetchToken: async () => {
		set({ loading: true });
		try {
			const fetchUrl = `${BASE_URL}${requestURL}`;

			const response = await fetch(fetchUrl);
			const data = await response.json();
			const { token } = data;

			if (typeof token !== 'string' || !token) {
				throw new Error('Invalid authenticity token!');
			}

			set({ token, error: null });
		} catch (error) {
			set({ error: returnError('useUserState', error) });
		} finally {
			set({ loading: false });
		}
	},
})));
