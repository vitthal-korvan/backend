const express = require("express");
const multer = require("multer");
const uploadFile = require("../service/storage.service");
const router = express.Router();
const Song = require("../models/song.model");
/*
title,
artist,
audio

*/

const upload = multer({ storage: multer.memoryStorage() });

router.post("/songs", upload.single("audio"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const fileData = await uploadFile(req.file);
  const song = await Song.create({
    title: req.body.title,
    artist: req.body.artist,
    audio: fileData.url, // Assuming fileData.url contains the URL of the uploaded audio
    mood: req.body.mood, // Assuming mood is also part of the request body
  });
  res.status(201).json({ message: "Song created successfully", song: song });
});

router.get("/songs", async (req, res) => {
  const { mood } = req.query;
  const songs = await Song.find({
    mood: mood,
  })
  res.status(200).json({
    message: "Songs fetched successfully",
    songs,
  });
});

module.exports = router;
