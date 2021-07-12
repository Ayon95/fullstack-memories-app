import React from 'react';
import { IconType } from 'react-icons/lib';
import styled from 'styled-components';

type Props = {
	text: string;
	icon: IconType;
	color: string;
	handleClick: React.MouseEventHandler<HTMLButtonElement>;
};

function IconTextButton({ text, icon: Icon, color, handleClick }: Props) {
	return (
		<ButtonComponent type="button" color={color} onClick={handleClick}>
			<Icon />
			{text}
		</ButtonComponent>
	);
}

export default IconTextButton;

const ButtonComponent = styled.button`
	font-size: 1.6rem;
	color: ${props => props.color};
	font-family: 'Roboto';
	text-transform: uppercase;
	background: transparent;
	border: none;
	display: flex;
	cursor: pointer;
	position: relative;
	padding: 0.5rem;

	&:hover::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 4px;
		background-color: currentColor;
		opacity: 0.1;
	}

	svg {
		fill: currentColor;
		margin-right: 0.5rem;
	}
`;
