import { Link } from 'react-router-dom';

import { ROUTES } from '~constants/ROUTES';

import { WiseyLogo } from './SVG/WiseyLogo';

export function Logo() {
	return (
		<Link to={`${ROUTES.COURSES}/1`}>
			<WiseyLogo size="custom" style={{ width: '100px', height: '30px' }} />
		</Link>
	);
}
