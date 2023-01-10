import React from 'react';

const Header = () => {
	return (
		<header className='header'>
			<h1>calc</h1>
			<div className='theme-switcher-wrapper'>
				<h2>Theme</h2>
				<div className='toggler-wrapper'>
					<div className='numbers'>
						<div>1</div>
						<div>2</div>
						<div>3</div>
					</div>
					<form className='theme-switcher'>
						<fieldset>
							<label className='visually-hidden' htmlFor='blue'>
								Blue Theme
							</label>
							<input type='radio' name='theme' id='blue' />
							<label className='visually-hidden' htmlFor='white'>
								White Theme
							</label>
							<input type='radio' name='theme' id='white' />
							<label className='visually-hidden' htmlFor='purple'>
								Purple Theme
							</label>
							<input type='radio' name='theme' id='purple' />
						</fieldset>
					</form>
				</div>
			</div>
		</header>
	);
};

export default Header;
