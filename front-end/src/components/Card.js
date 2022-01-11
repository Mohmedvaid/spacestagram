import React, { useState, useEffect } from 'react';
import { BsHeartFill, BsHeart } from 'react-icons/bs';



const Card = ({ photo, addNewLike, removeLike, isLikedImage }) => {
  let data = photo.data[0];
  let imgSrc = photo.links[0].href;
  let dateCreated = new Date(data.date_created).toLocaleDateString('en-US');
  let [isLiked, setIsLiked] = useState(isLikedImage);
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    if (isLiked) addNewLike(data.nasa_id);
    else removeLike(data.nasa_id);
  }, [isLiked]);

  return (
    <div className="m-1">
      <div className="card">
        <img className="card-img-top img-fluid" src={imgSrc} alt={data.description} />
        <div className="card-body">
          <h4 className="card-title text-dark">{data.title}</h4>
          <div className="d-flex justify-content-between my-1">
            {/* disbaling text selection on ancher below as clicking like button multiple times was highligting the date text */}
            <a className="likeBtn disable-text-selection" onClick={() => toggleLike()}>
              {/* like icon */}
              <span> {isLiked ? <BsHeartFill size="2em" color="red" /> : <BsHeart size="2em" color="red" />}</span>
            </a>
            <p className="card-text text-dark">
              <small className="text-muted">{dateCreated}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
