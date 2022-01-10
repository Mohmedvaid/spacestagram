import React from 'react'

const Card = ({ photo }) => {
	let data = photo.data[0]
	let imgSrc = photo.links[0].href
	// console.log(data)
	return (
    <div className="col-lg-3 col-md-4 col-sm-5 m-t-10">
      <div className="card mb-4">
        <img style={{ maxWidth: '400px' }} className="card-img-top img-fluid" src={imgSrc} alt={data.description} loading="lazy" />
        <div className="card-body">
          <h4 className="card-title">{data.title}</h4>
          <p className="card-text">
            <strong>Location:</strong> {data.location}
          </p>
          <p className="card-text">
            <small className="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card
