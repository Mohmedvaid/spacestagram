import React from 'react';

const Card = ({ photo }) => {
  let data = photo.data[0];
  let imgSrc = photo.links[0].href;
  let dateCreated = new Date(data.date_created).toLocaleDateString('en-US');
  // console.log(data)
  return (
    <div className="col-lg-3 col-md-4 col-sm-5 m-t-10">
      <div className="card mb-4">
        <img className="card-img-top img-fluid" src={imgSrc} alt={data.description} />
        <div className="card-body">
          <h4 className="card-title text-dark">{data.title}</h4>
          <p className="card-text text-dark">{data.location}</p>
          <p className="card-text text-dark">
            <small className="text-muted">{dateCreated}</small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
