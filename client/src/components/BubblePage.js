import React, { useState, useEffect } from "react";
import axiosWithAuth from '../utils/AxiosWithAuth.js'
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    axiosWithAuth()
      .get(`http://www.localhost:4000/api/colors`)
      .then(res => {
        console.log("GET COLORS", res.data)
        setColorList(res.data)
      })
      .catch(err => console.error('error in GET COLORS', err))
  }, [])
  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
