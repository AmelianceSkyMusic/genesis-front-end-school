import { Link } from 'react-router-dom';

import { GenesisLogo } from './SVG/GenesisLogo';

export function Logo() {
	return (
		<Link to="/">
			<GenesisLogo size="custom" style={{ width: '100px', height: '30px' }} />
		</Link>
	);
}
