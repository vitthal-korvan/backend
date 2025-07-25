import { useState } from "react";
import FaceDetection from "./components/FaceDetection";
import MoodSongs from "./components/MoodSongs";


function App() {
  const [Songs, setSongs] = useState([
    {
      title: "your mood",
      artist: "your artist",
      url: "your url",
    },
  ]);
  return (
    <>
      <FaceDetection setSongs={setSongs}/>
      <MoodSongs Songs={Songs} />
    </>
  );
}

export default App;
