import React, { useState, useEffect } from "react"
import Grid from "../components/Grid"
import Header from "../components/ui/Header"

function Favorite() {
  const [savedImages, setSavedImages] = useState(
    JSON.parse(localStorage.getItem("savedPhotos")) || []
  )

  return (
    <div>
      <Header title="My Favorite Photos" />
      <Grid isLoading={false} photos={savedImages} />
    </div>
  )
}

export default Favorite
