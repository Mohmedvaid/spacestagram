import React, { useState, useEffect } from "react"
import { Masonry } from "@mui/lab"
import PropTypes from "prop-types"
import Card from "./Card"
import Spinner from "./ui/Spinner"

/**
 *
 * @typedef {Object} Photo
 * @property {Array} data
 * @property {Array} links
 * @property {String} data[0].nasa_id
 * @property {String} data[0].title
 * @property {String} data[0].date_created
 * @property {String} links[0].href
 * @property {String} links[0].render
 * @property {String} links[0].rel
 * @returns
 */

/**
 *
 * @param {boolean} isLoading
 * @param {Array<Photo>} photos
 * @returns
 */
function Grid({ isLoading, photos }) {
  const savedPhotos = JSON.parse(localStorage.getItem("savedPhotos"))
  const [likedImages, setLikedImages] = useState(savedPhotos || [])

  /**
   * checks if the image exists in the likedImages array
   * @param {String} id
   * @returns {Boolean}
   */
  const isLikedImage = (id) =>
    likedImages.some((photo) => photo.data[0].nasa_id === id)

  /**
   * adds a new photo to the likedImages array
   * @param {Photo} newLikedPhoto
   * @returns {void}
   */
  const addNewLike = (newLikedPhoto) => {
    if (!isLikedImage(newLikedPhoto.data[0].nasa_id)) {
      setLikedImages([...likedImages, newLikedPhoto])
    }
  }
  /**
   * removes a photo from the likedImages array
   * @param {Photo.data[0].nasa_id} id
   */
  const removeLike = (id) => {
    setLikedImages(likedImages.filter((photo) => photo.data[0].nasa_id !== id))
  }

  /**
   * saves the likedImages array to localStorage
   * @param {Array<Photo>} likesArr
   */
  const saveLikes = (likesArr) => {
    localStorage.setItem("savedPhotos", JSON.stringify(likesArr))
  }

  //  updated the likedImages array in local storage every time like is toggled
  useEffect(() => {
    saveLikes(likedImages)
  }, [likedImages])

  if (isLoading) {
    return <Spinner />
  }
  if (photos.length > 0) {
    return (
      <section className="cards-grid">
        {/* Masonry for better layout for filling empty spaces in columns and rows */}
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3, lg: 3 }}
          spacing={2}
          style={{
            alignContent: photos.length < 3 ? "start" : "space-between",
          }}
        >
          {photos.map((photo) => (
            <Card
              key={photo.data[0].nasa_id}
              photo={photo}
              addNewLike={(newLikedPhoto) => addNewLike(newLikedPhoto)}
              removeLike={(id) => removeLike(id)}
              isLikedImage={isLikedImage(photo.data[0].nasa_id)}
            />
          ))}
        </Masonry>
      </section>
    )
  }
  return <p className="center">Ops, there is nothing here!</p>
}
Grid.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  photos: PropTypes.instanceOf(Array).isRequired,
}

export default Grid
