import React, { useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import styled from 'styled-components';
import stylesConfig from '../../utils/stylesConfig';
import ErrorMessage from '../Generic/ErrorMessage';

type Props = {
	name: string;
	label: string;
	chips: string[];
	setChips: React.Dispatch<React.SetStateAction<string[]>>;
};

function ChipInput({ name, label, chips, setChips }: Props) {
	const [text, setText] = useState('');
	const [validationError, setValidationError] = useState('');

	function removeChip(text: string) {
		// filtering out the chip whose 'x' icon was clicked
		const updatedChips = chips.filter(chipText => chipText !== text);
		setChips(updatedChips);
	}

	function handlePressEnter(e: React.KeyboardEvent<HTMLInputElement>) {
		// return if the user pressed a key that is not 'Enter', or the user hasn't typed anything
		if (e.key !== 'Enter' || !text) return;
		// need to show error if the user tries to add the same input more than once
		if (chips.includes(text)) {
			return setValidationError('Cannot add the same input more than once');
		}
		// adding the input value to chips array
		setChips(prevState => [...prevState, text]);
		// clearing the input box
		setText('');
		setValidationError('');
	}

	return (
		<ChipInputWrapper>
			<label htmlFor={name}>{label}</label>
			<InputContainer>
				<Chips>
					{chips.map(chipText => (
						<Chip key={chipText}>
							<ChipText>{chipText}</ChipText>
							<DeleteIcon onClick={() => removeChip(chipText)} tabIndex={0} />
						</Chip>
					))}
				</Chips>
				<ChipInputBox
					type="text"
					id={name}
					placeholder="Press Enter to add tag"
					value={text}
					onChange={e => setText(e.target.value)}
					onKeyDown={handlePressEnter}
				/>
			</InputContainer>
			{validationError && <ErrorMessage text={validationError} />}
		</ChipInputWrapper>
	);
}

const ChipInputWrapper = styled.div`
	margin-bottom: 2rem;

	label {
		font-weight: bold;
		display: inline-block;
		margin-bottom: 0.4rem;
	}
`;

const InputContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	row-gap: 1rem;
	align-items: center;
	/* background-color: #ebebeb; */
	background-color: ${stylesConfig.colorGrey1};
	border-radius: 0.5rem;
	padding: 1rem;

	:focus-within {
		box-shadow: ${stylesConfig.inputFocusStyle};
	}
`;

const Chips = styled.ul`
	list-style: none;
	display: flex;
`;

const Chip = styled.li`
	background-color: ${stylesConfig.colorGrey3};
	display: flex;
	align-items: center;
	padding: 0.5rem;
	border-radius: 0.5rem;
	margin-right: 1rem;
`;

const ChipText = styled.span`
	color: #eee;
	font-size: 1.4rem;
`;

const DeleteIcon = styled(TiDelete)`
	font-size: 2.2rem;
	fill: ${stylesConfig.colorGrey1};
	cursor: pointer;
	transition: fill 0.2s;

	:hover {
		fill: ${stylesConfig.colorGrey2};
		transition: all 0.2s;
	}
`;

const ChipInputBox = styled.input`
	font-size: 1.6rem;
	background: transparent;
	border: none;
	outline: none;
`;

export default ChipInput;
