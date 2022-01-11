import React, { useState, useEffect } from 'react';
import Card from './Card';
import Spinner from './ui/Spinner';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const Grid = ({ isLoading, photos }) => {
	let savedPhotos = JSON.parse(localStorage.getItem('savedPhotos'));
  const [likedImages, setLikedImages] = useState(savedPhotos ? savedPhotos : []);

  const addNewLike = (newLike) => {
      setLikedImages([...likedImages, newLike]);
  };

// remove the like id from the likedImages array
  const removeLike=(id)=>{
	  setLikedImages(likedImages.filter((nasaID) => nasaID !== id));
  }
// save liked images to local storage
  const saveLikes=(likesArr)=>{
	  localStorage.setItem('savedPhotos', JSON.stringify(likesArr));
  }

//  updated the likedImages array in local storage every time like is toggled
  useEffect(() => {
	  saveLikes(likedImages);
  } , [likedImages]);

  return isLoading ? (
    <Spinner />
  ) : (
    <section className="row">
      {/* Masonry for better layout and filling empty spaced in columns and rows */}
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 576: 2, 750: 3, 900: 4 }}>
        <Masonry>
          {photos.map((photo) => (
            <Card key={photo.data[0].nasa_id} photo={photo} addNewLike={(id) => addNewLike(id)} removeLike={(id) => removeLike(id)} isLikedImage={likedImages.includes(photo.data[0].nasa_id)}></Card>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </section>
  );
};

export default Grid;
