import React from 'react'
import Card from './Card'
const Grid = ({ items, isLoading }) => {
	return isLoading ? (
		<h1>Loading...</h1>
	) : (
		<section className="cards">
			
		</section>
	)
}

export default Grid
