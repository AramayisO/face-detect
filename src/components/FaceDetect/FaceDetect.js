import React from "react";
import "./FaceDetect.css";

const FaceDetect = ({ imageUrl, boxes, boxColor }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputimage" alt="" src={imageUrl} width="500px" heigh="auto" />
        {boxes.map((box, index) => (
          <div
            key={index}
            className="bounding-box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
              boxShadow: `0 0 0 3px ${boxColor} inset`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default FaceDetect;
