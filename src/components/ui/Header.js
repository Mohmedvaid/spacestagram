import React from 'react'
import logo from '../../img/logo.png'


function Header() {
	return (
		<header className='center'>
			<img tabIndex={0} src={logo} alt="spacestagram logo" />
		</header>
	)
}

export default Header
