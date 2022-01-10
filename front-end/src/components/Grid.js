import React from 'react'
import Card from './Card'

const Grid = ({ isLoading, photos }) => {
	return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className="row">
      {photos.map((photo) => (
        <Card key={photo.data[0].nasa_id} photo={photo}></Card>
      ))}
    </section>
  );
}

export default Grid
