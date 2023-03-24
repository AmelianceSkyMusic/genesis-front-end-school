import { useEffect, useState } from 'react';

import { useUserState } from '~store/useUserState';

export function useAppInit() {
	const [isInit, setIsInit] = useState(false);

	const { loading, error, fetchToken } = useUserState((state) => ({
		loading: state.loading,
		error: state.error,
		fetchToken: state.fetchToken,
	}));
	useEffect(() => {
		fetchToken();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!loading) setIsInit(true);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);

	return { isInit, error };
}
