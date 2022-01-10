import React from 'react'
import Card from './Card'

const Grid = ({ isLoading, photos }) => {
    // console.log(photos.collection.items)
	return isLoading ? (
		<h1>Loading...</h1>
	) : (
		<section className="cards">
			{photos.collection.items.map((photo) => (
				<Card key={photo.data[0].nasa_id} photo={photo}></Card>
			))}
		</section>
	)
}

export default Grid
