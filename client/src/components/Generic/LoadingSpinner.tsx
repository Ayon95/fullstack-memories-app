import React from 'react';
import styled from 'styled-components';
import { ImSpinner3 } from 'react-icons/im';
import stylesConfig from '../../utils/stylesConfig';

function LoadingSpinner() {
	return (
		<SpinnerContainer>
			<SpinnerIcon />
		</SpinnerContainer>
	);
}

export default LoadingSpinner;

const SpinnerContainer = styled.div`
	text-align: center;
`;

const SpinnerIcon = styled(ImSpinner3)`
	font-size: 4rem;
	animation: rotateSpinner 1.5s infinite ease-in-out;
	fill: ${stylesConfig.colorPrimary};
`;
