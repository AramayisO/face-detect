import React, { Component } from "react";
import Clarifai from "clarifai";
import { HuePicker } from "react-color";
import ImageSearchForm from "./components/ImageSearchForm/ImageSearchForm";
import FaceDetect from "./components/FaceDetect/FaceDetect";
import "./App.css";

// You need to add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: "b3aef77b71f6459194e7c52bb7abd863",
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      boxes: [],
      color: "#f00"
    };
  }

  handleColorChange = (color) => {
    this.setState({
      color: color.hex
    });
  }

  calculateFaceLocation = (data) => {
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    const boundingBoxes = data.outputs[0].data.regions.map(region => region.region_info.bounding_box);
    return boundingBoxes.map(boundingBox => ({
        topRow: boundingBox.top_row * height,
        leftCol: boundingBox.left_col * width,
        bottomRow: height - (boundingBox.bottom_row * height),
        rightCol: width - (boundingBox.right_col * width),
      })
    );
  };

  displayFaceBoxes = (boxes) => {
    this.setState({ boxes: boxes });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) =>
        this.displayFaceBoxes(this.calculateFaceLocation(response))
      )
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <ImageSearchForm
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit} />

        <div className="center">
          <HuePicker
            color={this.state.color}
            onChange={this.handleColorChange} />
        </div>

        <FaceDetect
          boxes={this.state.boxes}
          boxColor={this.state.color}
          imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
