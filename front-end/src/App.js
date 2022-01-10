import React, { useState, useEffect } from 'react';
import Header from './components/ui/Header';
import Grid from './components/Grid';
import './App.css';
import axios from 'axios';

function App() {
  const [collection, setCollection] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  let imageAndVidApi = `https://images-api.nasa.gov/search?q=mars&media_type=image&page=1`;
  let marsPhotoApi = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=DEMO_KEY&sol=1000&page=2`;
  useEffect(() => {
    const fetchItems = async () => {
      let localData = JSON.parse(localStorage.getItem('nasaData'));
      if (localData) {
        console.log('localData', localData);
        localData = { collection: { items: localData.collection.items.slice(0, 5) } };
        setCollection(localData.collection);
        setPhotos(localData.collection.items);
      } else {
        let result = await axios.get(imageAndVidApi);
        setCollection(result.data.collection);
        setPhotos(result.data.collection.items);
        localStorage.setItem('nasaData', JSON.stringify(result.data));
      }
      setisLoading(false);
      //   const result = await axios(imageAndVidApi);
      //   setCollection(result.data.collection);
      //   setPhotos(result.data.collection.items);
      //   setisLoading(false);
    };
    fetchItems();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <Header />
      </div>
        <Grid isLoading={isLoading} photos={photos} />
    </div>
  );
}

export default App;
