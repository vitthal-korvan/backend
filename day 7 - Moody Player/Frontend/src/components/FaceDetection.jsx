import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

const FaceDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadModelsAndStart = async () => {
      const MODEL_URL = "/models";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);

      // Start video
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Camera error:", error);
      }
    };

    loadModelsAndStart();
  }, []);

  const handleVideoPlay = () => {
    const canvas = faceapi.createCanvasFromMedia(videoRef.current);
    canvasRef.current.innerHTML = "";
    canvasRef.current.appendChild(canvas);

    const displaySize = {
      width: videoRef.current.videoWidth,
      height: videoRef.current.videoHeight,
    };

    faceapi.matchDimensions(canvas, displaySize);

    const interval = setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    }, 100);

    return () => clearInterval(interval);
  };

  return (
    <div style={{ position: "relative", width: "720px", height: "560px" }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        width="720"
        height="560"
        onPlay={handleVideoPlay}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
      />
      <div
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}
      />
    </div>
  );
};

export default FaceDetection;
