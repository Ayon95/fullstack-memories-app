import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from './Backdrop';
import Overlay from './Overlay';

type Props = { content: React.ReactNode; closeModal: React.MouseEventHandler };

function Modal({ content, closeModal }: Props) {
	return (
		<>
			{ReactDOM.createPortal(<Backdrop handleClick={closeModal} />, document.body)}
			{ReactDOM.createPortal(<Overlay>{content}</Overlay>, document.body)}
		</>
	);
}

export default Modal;
