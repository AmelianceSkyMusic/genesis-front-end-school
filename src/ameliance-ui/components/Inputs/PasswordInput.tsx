import { forwardRef, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { FieldError, FieldValues } from 'react-hook-form';

import asm from 'asm-ts-scripts';

import { Icon } from '../Icon';
import { EyeOffIcon } from '../icons/EyeOffIcon';
import { EyeOnIcon } from '../icons/EyeOnIcon';
import { Typography } from '../Typography';

import s from './PasswordInput.module.scss';

type ComponentElementType = HTMLInputElement;

export interface PasswordInputProps extends ReactHTMLElementAttributes<ComponentElementType> {
	register: FieldValues;
	errors: Record<string, FieldError> | undefined;
}

export const PasswordInput = forwardRef<ComponentElementType, PasswordInputProps>(({
	register,
	errors,
	placeholder,
	children,
	...rest
}, ref) => {
	const [isShowPassword, setIsShowPassword] = useState(false);

	const handlerIconClick = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		setIsShowPassword((prev) => !prev);
	};

	const inputType = isShowPassword ? 'text' : 'password';

	return (
		<div className={s.PasswordInput}>
			<Typography component="h5">{children}</Typography>
			<label className={s.label}>
				<input
					type={inputType}
					className={asm.join(s.input, 'input text')}
					placeholder={placeholder}
					ref={ref}
					{...register}
					{...rest}
				/>
				<Icon size="custom" style={{ width: 20, height: 20 }} className={s.showHide} onClick={handlerIconClick}>
					{isShowPassword ? <EyeOffIcon size="custom" style={{ width: 20, height: 20 }} /> : <EyeOnIcon size="custom" style={{ width: 20, height: 20 }} />}
				</Icon>
			</label>
			<Typography component="p2" className={asm.join(s.error, 'input-error')}>
				{(errors && errors[register.name] && errors[register.name].message) || ''}
			</Typography>
		</div>
	);
});

PasswordInput.displayName = 'PasswordInput';
