import React, { useState, useEffect } from "react"
import Grid from "../components/Grid"

function Favorite() {
  const [savedImages, setSavedImages] = useState(
    JSON.parse(localStorage.getItem("savedPhotos")) || []
  )

  return (
    <div>
      <h1>My Favorites</h1>
      <Grid isLoading={false} photos={savedImages} />
    </div>
  )
}

export default Favorite
