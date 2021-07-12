import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import stylesConfig from '../../utils/stylesConfig';

type Props = {
	text: string;
	color: 'primary' | 'secondary';
	type?: 'button' | 'submit' | 'reset';
	isDisabled?: boolean;
	style?: React.CSSProperties;
	isLink?: boolean;
	handleClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function Button(props: Props) {
	if (props.isLink) {
		return (
			<LinkButtonComponent to="/signup" color={props.color}>
				{props.text}
			</LinkButtonComponent>
		);
	}

	return (
		<ButtonComponent
			type={props.type || 'button'}
			color={props.color}
			disabled={props.isDisabled || false}
			style={props.style}
			onClick={props.handleClick}
		>
			{props.text}
		</ButtonComponent>
	);
}

export default Button;

const buttonStyles = css<{ color: string }>`
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
`;

const ButtonComponent = styled.button`
	${buttonStyles}

	&:disabled {
		cursor: not-allowed;
		background-color: ${stylesConfig.colorGrey2};
	}
`;

const LinkButtonComponent = styled(Link)`
	${buttonStyles}
	text-decoration: none;
	display: inline-block;
`;
