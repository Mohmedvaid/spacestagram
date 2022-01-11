import React from 'react'
import Card from './Card'
import Spinner from './ui/Spinner'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

const Grid = ({ isLoading, photos }) => {
	return isLoading ? (
		<Spinner />
	) : (
		<section className="row">
			<ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 576: 2, 750: 3, 900: 4 }}>
				<Masonry>
					{photos.map((photo) => (
						<Card key={photo.data[0].nasa_id} photo={photo}></Card>
					))}
				</Masonry>
			</ResponsiveMasonry>
		</section>
	)
}

export default Grid
