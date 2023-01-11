import React, { useReducer } from 'react';
import './App.css';

import Header from './components/Header';
import DigitButton from './components/DigitButton';
import OperationButton from './components/OperationButton';

// REDUCER DEFAULT STATE
const defaultState = {
	currentOperand: null,
	previousOperand: null,
	operation: null,
};

// DISPATCH ACTIONS
export const ACTIONS = {
	ADD_DIGIT: 'add-digit',
	CHOOSE_OPERATION: 'choose',
	RESET: 'reset',
	DELETE_DIGIT: 'delete',
	EVALUATE: 'evaluate',
};

// REDUCER FUNCTION
const reducer = (state, { type, payload }) => {
	switch (type) {
		default:
		case ACTIONS.ADD_DIGIT:
			// Overwrite currentOperand after evaluation
			if (state.overwriteEvaluation) {
				return {
					...state,
					currentOperand: payload.digit,
					overwriteEvaluation: false,
				};
			}
			// Overwrite the currentOperand when evaluating 3 or more digits
			if (state.overwriteMultiOperation) {
				return {
					...state,
					currentOperand: payload.digit,
					overwriteMultiOperation: false,
				};
			}

			// If first digit is '.'
			if (state.currentOperand === null && payload.digit === '.') {
				return {
					...state,
					currentOperand: `0${payload.digit}`,
				};
			}

			// Zero must be followed by a period
			if (state.currentOperand === '0' && payload.digit !== '.') return state;

			// No more than one decimal
			if (payload.digit === '.' && state.currentOperand.includes('.')) return state;

			return {
				...state,
				currentOperand: `${state.currentOperand || ''}${payload.digit}`,
			};

		case ACTIONS.RESET:
			return {
				currentOperand: null,
				previousOperand: null,
				operation: null,
			};

		case ACTIONS.CHOOSE_OPERATION:
			// If both operands are null return state
			if (state.currentOperand == null && state.previousOperand == null) {
				return state;
			}

			// If you change mind about which operation to perform before new operand is set. i.e from * -> +
			if (state.currentOperand == null) {
				return {
					...state,
					operation: payload.operation,
				};
			}

			// Previous operand is null
			if (state.previousOperand == null) {
				return {
					...state,
					operation: payload.operation,
					previousOperand: state.currentOperand,
					currentOperand: null,
				};
			}

			return {
				...state,
				previousOperand: evaluate(state),
				currentOperand: evaluate(state),
				overwriteMultiOperation: true,
				operation: payload.operation,
			};

		case ACTIONS.EVALUATE:
			if (
				state.operation == null ||
				state.currentOperand == null ||
				state.previousOperand == null
			)
				return state;

			return {
				...state,
				previousOperand: null,
				overwriteEvaluation: true,
				operation: null,
				currentOperand: evaluate(state),
			};

		case ACTIONS.DELETE_DIGIT:
			// If current operand is empty return state
			if (state.currentOperand == null) return state;

			// Check if last action was evaluate, then reset
			if (state.overwriteEvaluation) {
				return {
					currentOperand: null,
					previousOperand: null,
					operation: null,
					overwriteEvaluation: false,
				};
			}

			// Check if last action was a multi-operand, then reset
			if (state.overwriteMultiOperation) {
				return {
					currentOperand: null,
					previousOperand: null,
					operation: null,
					overwriteMultiOperation: false,
				};
			}

			// Return current operand minus the last character
			return {
				...state,
				currentOperand: state.currentOperand.slice(0, -1),
			};
	}
};

// EVALUATE FUNCTION
const evaluate = ({ currentOperand, previousOperand, operation }) => {
	const prev = parseFloat(previousOperand);
	const current = parseFloat(currentOperand);
	if (isNaN(prev) || isNaN(current)) return '';

	let evaluation = '';
	switch (operation) {
		default:
		case '+':
			evaluation = prev + current;
			break;
		case '-':
			evaluation = prev - current;
			break;
		case 'x':
			evaluation = prev * current;
			break;
		case '/':
			evaluation = prev / current;
			break;
	}
	return evaluation.toString();
};

// OPERAND FORMATTING LOGIC
const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', { maximumFractionDigits: 0 });

function formatOperand(operand) {
	if (operand == null) return;
	const [integer, decimal] = operand.split('.');
	if (decimal == null) return INTEGER_FORMATTER.format(integer);
	return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function App() {
	const [state, dispatch] = useReducer(reducer, defaultState);

	return (
		<div className='calculator'>
			<Header />
			<div className='output'>
				<p className='current-operand'>{formatOperand(state.currentOperand)}</p>
			</div>
			<div className='button-grid'>
				<DigitButton dispatch={dispatch} digit='7' />
				<DigitButton dispatch={dispatch} digit='8' />
				<DigitButton dispatch={dispatch} digit='9' />
				<button
					className='button-secondary'
					onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
				>
					DEL
				</button>
				<DigitButton dispatch={dispatch} digit='4' />
				<DigitButton dispatch={dispatch} digit='5' />
				<DigitButton dispatch={dispatch} digit='6' />
				<OperationButton className='button-primary' dispatch={dispatch} operation='+' />
				<DigitButton dispatch={dispatch} digit='1' />
				<DigitButton dispatch={dispatch} digit='2' />
				<DigitButton dispatch={dispatch} digit='3' />
				<OperationButton className='button-primary' dispatch={dispatch} operation='-' />
				<DigitButton dispatch={dispatch} digit='.' />
				<DigitButton dispatch={dispatch} digit='0' />
				<OperationButton className='button-primary' dispatch={dispatch} operation='/' />
				<OperationButton className='button-primary' dispatch={dispatch} operation='x' />
				<button
					className='span-two button-secondary'
					onClick={() => dispatch({ type: ACTIONS.RESET })}
				>
					RESET
				</button>
				<button
					className='span-two button-tertiary'
					onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
				>
					=
				</button>
			</div>
		</div>
	);
}

export default App;
