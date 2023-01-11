import React from 'react';
import { useState, useEffect } from 'react';

const Header = () => {
	// TOGGLE STATES START
	const [blueIsChecked, setBlueIsChecked] = useState(true);
	const [whiteIsChecked, setWhiteIsChecked] = useState(undefined);
	const [purpleIsChecked, setPurpleIsChecked] = useState(undefined);

	const onBlueCheckedHandler = () => {
		// Fallback code for no :has() support
		document.documentElement.className = 'blue';

		setBlueIsChecked(true);
		setWhiteIsChecked(undefined);
		setPurpleIsChecked(undefined);

		localStorage.setItem('themePreference', 'blue');
	};

	const onWhiteCheckedHandler = () => {
		// Fallback code for no :has() support
		document.documentElement.className = 'white';

		setBlueIsChecked(undefined);
		setWhiteIsChecked(true);
		setPurpleIsChecked(undefined);

		// Storing theme in localStorage
		localStorage.setItem('themePreference', 'white');
	};

	const onPurpleCheckedHandler = () => {
		// Fallback code for no :has() support
		document.documentElement.className = 'purple';

		setBlueIsChecked(undefined);
		setWhiteIsChecked(undefined);
		setPurpleIsChecked(true);

		localStorage.setItem('themePreference', 'purple');
	};
	// TOGGLE STATES END

	// Retrieving theme preference from localStorage when page loads
	useEffect(() => {
		const storedThemePreference = localStorage.getItem('themePreference');

		if (storedThemePreference === 'blue') {
			onBlueCheckedHandler();
		}
		if (storedThemePreference === 'white') {
			onWhiteCheckedHandler();
		}
		if (storedThemePreference === 'purple') {
			onPurpleCheckedHandler();
		}
	});

	return (
		<header className='header'>
			<h1>calc</h1>
			<div className='theme-switcher-wrapper'>
				<h2>Theme</h2>
				<div className='toggler-wrapper'>
					<div className='numbers'>
						{/* <div>1</div>
						<div>2</div>
						<div>3</div> */}
					</div>
					<form action='' className='theme-switcher'>
						<fieldset>
							<legend className='visually-hidden'>Pick a theme</legend>
							<label className='-hidden' htmlFor='blue'>
								1
							</label>
							<input
								onChange={onBlueCheckedHandler}
								type='radio'
								name='theme'
								id='blue'
								checked={blueIsChecked}
							/>
							<label className='-hidden' htmlFor='white'>
								2
							</label>
							<input
								onChange={onWhiteCheckedHandler}
								type='radio'
								name='theme'
								id='white'
								checked={whiteIsChecked}
							/>
							<label className='-hidden' htmlFor='purple'>
								3
							</label>
							<input
								onChange={onPurpleCheckedHandler}
								type='radio'
								name='theme'
								id='purple'
								checked={purpleIsChecked}
							/>
						</fieldset>
					</form>
				</div>
			</div>
		</header>
	);
};

export default Header;
