import asm from 'asm-ts-scripts';

import { UniverseLogo } from '~components/SVG/UniverseLogo';
import { UniverseLogoIcon } from '~components/SVG/UniverseLogoIcon';
import { WiseyLogoIcon } from '~components/SVG/WiseyLogoIcon';
import { WiseyLogoWhite } from '~components/SVG/WiseyLogoWhite';
import { useScreenQuery } from '~hooks/useScreenQuery';

import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Grid } from '~/ameliance-ui/components/Grid';
import { Link } from '~/ameliance-ui/components/Link';

import s from './Footer.module.scss';

export function Footer() {
	const { isScreenSM, isScreenXS } = useScreenQuery();

	return (
		<Block component="footer" className={s.Footer}>
			<Grid container className={s.container}>
				<Grid row className={s.row}>
					<Link className={asm.join(s.wisey, 'col-xx-4 col-xs-4')} href="https://wisey.app/" blank>
						{isScreenXS
							? <WiseyLogoIcon size="custom" style={{ width: '30px', height: '30px' }} />
							: <WiseyLogoWhite size="custom" style={{ width: '100px', height: '30px' }} />}
					</Link>
					<Link className={asm.join(s.asm, 'col-xx-4 col-xs-4')} display="h5" underline={false} href="https://github.com/AmelianceSkyMusic" blank>
						{isScreenSM
							? 'ASM'
							: 'AmelianceSkuMusic'}
					</Link>
					<Link className={asm.join(s.universe, 'col-xx-4 col-xs-4')} href="https://universeapps.limited/" blank>
						{isScreenXS
							? <UniverseLogoIcon size="custom" style={{ width: '30px', height: '30px' }} />
							: <UniverseLogo size="custom" style={{ width: '100px', height: '30px' }} />}
					</Link>
				</Grid>
			</Grid>
		</Block>
	);
}
