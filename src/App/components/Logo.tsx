import { Link } from 'react-router-dom';

import { WiseyLogo } from './SVG/WiseyLogo';

export function Logo() {
	return (
		<Link to="/">
			<WiseyLogo size="custom" style={{ width: '100px', height: '30px' }} />
		</Link>
	);
}
