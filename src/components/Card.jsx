import React, { useState, useEffect } from "react"
import { BsHeartFill, BsHeart } from "react-icons/bs"
import PropTypes from "prop-types"

function Card({ photo, addNewLike, removeLike, isLikedImage }) {
  const data = photo.data[0]
  const imgSrc = photo.links[0].href
  const { title } = data
  const dateCreated = new Date(data.date_created).toLocaleDateString("en-US")
  const [isLiked, setIsLiked] = useState(isLikedImage)
  const toggleLike = () => {
    setIsLiked(!isLiked)
  }

  const copyImageUrl = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(imgSrc)
    } else {
      document.execCommand("copy", true, imgSrc)
    }
    // eslint-disable-next-line no-alert
    alert(`${title} image URL copied to clipboard`)
  }

  useEffect(() => {
    if (isLiked) addNewLike(photo)
    else removeLike(data.nasa_id)
  }, [isLiked])

  return (
    <div className="card m-auto mb-5" style={{ maxWidth: "1000px" }}>
      <div className="row g-0">
        <div className="col-md-8 d-flex align-item-center">
          <img
            loading="lazy"
            className="img-fluid rounded-start"
            src={imgSrc}
            alt={`description: ${title}`}
          />
        </div>
        <div className="col-md-4">
          <div className="card-body h-100 d-flex flex-column justify-content-evenly ">
            <h4 className="card-title text-dark text-center">{title}</h4>
            <p className="text-dark text-center"> {data.description}</p>
            <div className="d-flex justify-content-between align-items-center my-1">
              {/* disbaling text selection on ancher below as clicking like button multiple times was highligting the date text */}
              <button
                type="button"
                aria-label="toggle like"
                className="likeBtn m-1 disable-text-selection"
                tabIndex={0}
                onClick={() => toggleLike()}
              >
                {/* like icon */}
                <span>
                  {" "}
                  {isLiked ? (
                    <BsHeartFill size="2em" color="red" />
                  ) : (
                    <BsHeart size="2em" color="red" />
                  )}
                </span>
              </button>
              <button
                type="button"
                className="btn bg-fb-blue text-light btn-sm copyBtn m-1 cursor-pointer"
                tabIndex={0}
                onClick={() => copyImageUrl()}
              >
                Copy Image URL
              </button>
              <p className="card-text text-dark">
                <small aria-label="photo date" className="text-muted">
                  {dateCreated}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  photo: PropTypes.instanceOf(Object).isRequired,
  addNewLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  isLikedImage: PropTypes.bool.isRequired,
}

export default Card
