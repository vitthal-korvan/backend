import * as faceapi from "face-api.js";
import { useEffect, useRef } from "react";
import "./faceDetection.css";
import axios from "axios";

export default function FaceDetection({ setSongs }) {
  const videoRef = useRef();
  const loadModels = async () => {
    const MODEL_URL = "/models";
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  };
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam: ", err));
  };
  async function detectMood() {
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();
    if (!detections || detections.length === 0) {
      console.log("No Face Detected");
      return;
    }
    let mostProbableExpression = 0;
    let _expression = "";
    for (const expression of Object.keys(detections[0].expressions)) {
      if (detections[0].expressions[expression] > mostProbableExpression) {
        mostProbableExpression = detections[0].expressions[expression];
        console.log(_expression);

        _expression = expression;
      }
    }
    /* get -> http://localhost:3000/songs?mood=happy*/
    axios.get(`http://localhost:3000/songs?mood=${_expression}`)
    .then((response) => {
      console.log(response.data);
      setSongs(response.data.songs);
    })
    .catch((error) => {
      console.error("Error fetching songs:", error);
    });
  }
  useEffect(() => {
    loadModels().then(startVideo);
  }, []);
  return (
    <div className="mood-element">
      <video ref={videoRef} autoPlay muted className="user-video-feed" />
      <br />
      <button onClick={detectMood}>Detect Mood</button>
    </div>
  );
}
