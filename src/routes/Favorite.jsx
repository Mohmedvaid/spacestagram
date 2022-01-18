import React, { useState } from "react"
import Grid from "../components/Grid"
import Header from "../components/ui/Header"

function Favorite() {
  const [savedImages] = useState(
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
