import { useState } from "react";
import FaceDetection from "./components/FaceDetection";
import MoodSongs from "./components/MoodSongs";
import "./App.css";


function App() {
  const [Songs, setSongs] = useState([
    {
      title: "your mood",
      artist: "song artist",
      url: "song url",
    },
  ]);
  return (
    <>
      <h1 className="heading">Mood Based Music Recommender</h1>
      <div className="main">
        <div className="face">
          <FaceDetection setSongs={setSongs} />
        </div>
        <div className="songs-display">
          <MoodSongs Songs={Songs} />
        </div>
      </div>
    </>
  );
}

export default App;
