import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [picture, setPicture] = useState([]);
  const [filter, setFilter] = useState('show-all');

  const region = 'us-west-2';
  const bucket = 'take-home-foam-challenge';

  const filterList = async (val) => {
    try {
      const { data } = await axios.get('/api/pictures');

      if (val !== 'show-all') {
        const filteredPictures = data.pictures.filter(picture => picture.category === val);

        setPicture(filteredPictures);
      } else {
        setPicture(data.pictures);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const listProducts = async () => {
    await filterList(filter);
  };


  const filterHandler = async (val) => {
    setFilter(val);

    await filterList(val);

  };

  const handleChange = async (id, category) => {

    const newCategory = { category: category };

    await axios.put(
      `api/pictures/${id}`,
      newCategory,
    );

    listProducts();
  };

  useEffect(() => {
    listProducts();
  }, []);


  return (
    <div className="App">
      <h1 className="header">Welcome to the foam challenge</h1>
      <div>
        <span>Filter by:</span>
        <br />
        <input type="radio" name="filter" id="show-all" value="show-all" onChange={(e) => filterHandler(e.target.value)} />
        <label htmlFor="show-all">Show All</label>
        <br />
        <input type="radio" name="filter" id="unclassified" value="unclassified" onChange={(e) => filterHandler(e.target.value)} />
        <label htmlFor="unclassified">Unclassified</label>
        <br />
        <input type="radio" name="filter" id="foaming" value="foaming" onChange={(e) => filterHandler(e.target.value)} />
        <label htmlFor="foaming">Foaming</label>
        <br />
        <input type="radio" name="filter" id="non-foaming" onChange={(e) => filterHandler(e.target.value)} value="non-foaming" />
        <label htmlFor="non-foaming">Non Foaming</label>
      </div>
      <div className="picture-grid">
        {picture.map((item, index) =>
          <div key={index}>
            < img src={`https://${bucket}.s3.${region}.amazonaws.com/${item.Key}`} alt="" className="picture-grid--image" />
            <div>
              <h1>{item.category}</h1>
              <select name="foam state" id=""
                value={item.category}
                onChange={(e) => handleChange(item._id, e.target.value)}
              >
                <option value="unclassified">Unclassified</option>
                <option value="foaming">Foaming</option>
                <option value="non-foaming">Non Foaming</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div >
  );
}

export default App;
