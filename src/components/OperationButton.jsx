import React from 'react';

import { ACTIONS } from '../App';

const OperationButton = ({ dispatch, operation }) => {
	return (
		<button
			onClick={() => {
				dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } });
			}}
			className='button-primary'
		>
			{operation}
		</button>
	);
};

export default OperationButton;
