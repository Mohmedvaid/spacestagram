import React, { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import NavBar from "./components/ui/NavBar"
import Home from "./routes/Home"
import Favorite from "./routes/Favorite"
import "./App.css"
// import Pagination from "./components/ui/Pagination"

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/spacestagram" element={<Home />} />
        <Route path="/favorite" element={<Favorite />} />
      </Routes>
    </div>
  )
}

export default App
