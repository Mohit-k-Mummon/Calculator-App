import React from 'react';
import './App.css';

import Header from './components/Header';

function App() {
	return (
		<div className='calculator' id='blue'>
			<Header />
			<div className='output'>
				<div className='current-operand'>399,999</div>
			</div>
			<div className='button-grid'>
				<button className='button-primary'>7</button>
				<button className='button-primary'>8</button>
				<button className='button-primary'>9</button>
				<button className='button-secondary'>DEL</button>
				<button className='button-primary'>4</button>
				<button className='button-primary'>5</button>
				<button className='button-primary'>6</button>
				<button className='button-primary'>+</button>
				<button className='button-primary'>1</button>
				<button className='button-primary'>2</button>
				<button className='button-primary'>3</button>
				<button className='button-primary'>-</button>
				<button className='button-primary'>.</button>
				<button className='button-primary'>0</button>
				<button className='button-primary'>/</button>
				<button className='button-primary'>x</button>
				<button className='span-two button-secondary'>RESET</button>
				<button className='span-two button-tertiary'>=</button>
			</div>
		</div>
	);
}

export default App;
