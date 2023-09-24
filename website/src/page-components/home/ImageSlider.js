import React from "react";
import "./imageSlider.css";
import { fileNameToSrc } from "../../helper";

const ImageSlider = (props) => {
  console.log(props.data["imageURL"])
  return (
    <div className="image-gallery">
      <div className="image-area">
        <img className="internal-image" src={fileNameToSrc(props.data["image"])}></img>
      </div>
      <div className="image-text-area">
        <h1>{props.data["header"]}</h1>
        <p>{props.data["text"]}</p>
      </div>
    </div>
  );
};

export default ImageSlider;
