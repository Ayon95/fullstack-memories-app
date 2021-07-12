import React from 'react';
import styled from 'styled-components';
import stylesConfig from '../../utils/stylesConfig';

type Props = {
	text: string;
	color: 'primary' | 'secondary';
	type?: 'button' | 'submit' | 'reset';
	isDisabled?: boolean;
	style?: React.CSSProperties;
};

function Button(props: Props) {
	return (
		<ButtonComponent
			type={props.type || 'button'}
			color={props.color}
			disabled={props.isDisabled || false}
			style={props.style}
		>
			{props.text}
		</ButtonComponent>
	);
}

export default Button;

const ButtonComponent = styled.button`
	text-transform: uppercase;
	border-radius: 4px;
	font-family: 'Roboto';
	font-size: 1.6rem;
	color: #eee;
	background-color: ${props =>
		props.color === 'primary' ? stylesConfig.colorPrimary : stylesConfig.colorSecondary};
	border: none;
	padding: 1.2rem 1.5rem;
	cursor: pointer;
	transition: background-color 0.2s;

	&:hover {
		background-color: ${props =>
			props.color === 'primary'
				? stylesConfig.colorPrimaryLight1
				: stylesConfig.colorSecondaryLight1};
	}

	&:disabled {
		cursor: not-allowed;
		background-color: ${stylesConfig.colorGrey2};
	}
`;
