import { WiseyLogo } from '~components/SVG/WiseyLogo';

import { Block } from '~/ameliance-ui/components/blocks/Block';

import s from './StartScreen.module.scss';

export function StartScreen() {
	return (
		<Block className={s.StartScreen}>
			<WiseyLogo size="custom" style={{ width: '100px', height: '30px' }} />
		</Block>
	);
}
