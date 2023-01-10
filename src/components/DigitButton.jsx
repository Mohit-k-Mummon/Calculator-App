import React from 'react';

import { ACTIONS } from '../App';

const DigitButton = ({ dispatch, digit }) => {
	return (
		<button
			onClick={() => {
				dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
			}}
			className='button-primary'
		>
			{digit}
		</button>
	);
};

export default DigitButton;
