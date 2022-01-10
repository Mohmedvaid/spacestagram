import React from 'react'
import Card from './Card'

const Grid = ({ isLoading, photos }) => {
	return isLoading ? (
		<h1>Loading...</h1>
	) : (
		<section className="cards">
			{photos.map((photo) => (
				<Card key={photo.id} photo={photo}></Card>
			))}
		</section>
	)
}

export default Grid
