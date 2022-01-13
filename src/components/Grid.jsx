import React, { useState, useEffect } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import PropTypes from 'prop-types';
import Card from './Card';
import Spinner from './ui/Spinner';

function Grid({ isLoading, photos }) {
	const savedPhotos = JSON.parse(localStorage.getItem('savedPhotos'));
	const [likedImages, setLikedImages] = useState(savedPhotos || []);

	const addNewLike = (newLike) => {
		setLikedImages([...likedImages, newLike]);
	};

	// remove the like id from the likedImages array
	const removeLike = (id) => {
		setLikedImages(likedImages.filter((nasaID) => nasaID !== id));
	};
	// save liked images to local storage
	const saveLikes = (likesArr) => {
		localStorage.setItem('savedPhotos', JSON.stringify(likesArr));
	};

	//  updated the likedImages array in local storage every time like is toggled
	useEffect(() => {
		saveLikes(likedImages);
	}, [likedImages]);

	if (isLoading) {
		return <Spinner />;
	}
	if (photos.length > 0) {
		return (
			<section className='cards-grid'>
				{/* Masonry for better layout for filling empty spaces in columns and rows */}
				<ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 576: 2, 750: 3 }}>
					<Masonry>
						{photos.map((photo) => (
							<Card
								key={photo.data[0].nasa_id}
								photo={photo}
								addNewLike={(id) => addNewLike(id)}
								removeLike={(id) => removeLike(id)}
								isLikedImage={likedImages.includes(photo.data[0].nasa_id)}
							/>
						))}
					</Masonry>
				</ResponsiveMasonry>
			</section>
		);
	}
	return <p className='center'>Ops, looks like there are no result. Make sure you spelled it right</p>;
}
Grid.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	photos: PropTypes.instanceOf(Array).isRequired,
};

export default Grid;
