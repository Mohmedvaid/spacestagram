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
    <article className="m-2">
      <div className="card mb-3 max-w-500 m-auto">
        <img
          loading="lazy"
          className="card-img-top"
          src={imgSrc}
          alt={`${title}`}
        />
        <div className="card-body">
          <h5 className="card-title text-dark">{title}</h5>
          {/* more info accordion starts */}
          <div id={`accordion-${data.nasa_id}`}>
            <div className="card">
              <div
                className="card-header"
                id="headingOne"
                style={{ backgroundColor: "none" }}
              >
                <h5 className="mb-0">
                  <button
                    className="btn btn-link text-decoration-none max-width"
                    type="button"
                    data-toggle="collapse"
                    data-target={`#collapseOne-${data.nasa_id}`}
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    More Info
                  </button>
                </h5>
              </div>

              <div
                id={`collapseOne-${data.nasa_id}`}
                className="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                <div className="card-body text-dark">{data.description}</div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center my-1">
            {/* disbaling text selection on ancher below as clicking like button multiple times was highligting the date text */}
            <button
              type="button"
              aria-label="toggle like"
              className="likeBtn m-1 disable-text-selection"
              tabIndex={0}
              aria-pressed={isLiked}
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
          {/* accordion end */}
        </div>
      </div>
    </article>
  )
}

Card.propTypes = {
  photo: PropTypes.instanceOf(Object).isRequired,
  addNewLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  isLikedImage: PropTypes.bool.isRequired,
}

export default Card
