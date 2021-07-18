import React from 'react';
import styled from 'styled-components';
import stylesConfig from '../../utils/stylesConfig';

type Props = {
	text: string;
	isCurrentPage?: Boolean;
	handleClick: React.MouseEventHandler<HTMLButtonElement>;
};

function PageButton({ text, isCurrentPage, handleClick }: Props) {
	return (
		<PageButtonComponent onClick={handleClick} isCurrentPage={isCurrentPage}>
			{text}
		</PageButtonComponent>
	);
}

export default PageButton;

const PageButtonComponent = styled.button<{ isCurrentPage?: Boolean }>`
	font-size: 1.5rem;
	color: ${props => (props.isCurrentPage ? '#eee' : stylesConfig.colorPrimary)};
	background-color: ${props => (props.isCurrentPage ? stylesConfig.colorPrimary : '#eee')};
	border: none;
	border-radius: 3px;
	box-shadow: ${stylesConfig.shadowThin};
	padding: 0.6rem 1rem;
	cursor: pointer;

	:hover {
		background-color: ${stylesConfig.colorPrimary};
		color: #eee;
	}

	:not(:last-child) {
		margin-right: 0.5rem;
	}
`;
