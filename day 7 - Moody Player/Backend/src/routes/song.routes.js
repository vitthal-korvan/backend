const express = require("express");
const multer = require("multer");
const uploadFile = require("../service/storage.service"); // Assuming you have a service to handle file uploads
const router = express.Router();
const Song = require("../models/song.model");

// Multer middleware for handling file uploads in memory
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @route   POST /api/songs
 * @desc    Create a new song
 * @access  Public
 */
router.post("/songs", upload.single("audio"), async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Request File:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "Audio file is required." });
    }

    // Upload the audio file to your storage service (e.g., S3, Google Cloud Storage)
    const fileData = await uploadFile(req.file);

    // Create a new song document in the database
    const song = await Song.create({
      title: req.body.title,
      artist: req.body.artist,
      audio: fileData.url, // URL from the storage service
      mood: req.body.mood,
    });

    res.status(201).json({ message: "Song created successfully", song: song });
  } catch (error) {
    console.error("Error creating song:", error);
    res.status(500).json({ message: "Server error while creating song." });
  }
});

/**
 * @route   GET /api/songs
 * @desc    Get all songs, optionally filtered by mood
 * @access  Public
 */
router.get("/songs", async (req, res) => {
  try {
    const { mood } = req.query;
    const filter = mood ? { mood: mood } : {};

    const songs = await Song.find(filter);

    res.status(200).json({
      message: "Songs fetched successfully",
      songs,
    });
  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).json({ message: "Server error while fetching songs." });
  }
});

/**
 * @route   PATCH /api/songs/:id
 * @desc    Update an existing song
 * @access  Public
 * @note    When sending this request from a client (like Postman or a web form),
 * you MUST use a 'Content-Type' of 'multipart/form-data' because this
 * endpoint is configured to accept a file ('audio'). All text fields
 * (title, artist, mood) must be sent as form fields along with the file.
 */
router.patch("/songs/:id", upload.single("audio"), async (req, res) => {
  try {
    const { id } = req.params;

    // For debugging: Log the received body to see what the server is actually getting.
    // If req.body is empty, it's likely a client-side issue (e.g., wrong Content-Type).
    console.log("Update request body:", req.body);

    const updateData = {};

    // Build the update object.
    // We use the `in` operator instead of `hasOwnProperty` because `multer` creates a
    // body object with a null prototype (`[Object: null prototype]`), which doesn't
    // inherit standard Object methods. The `in` operator correctly checks for property existence.
    if ("title" in req.body) {
      // Note from your error log: The key for title was sent as 'title ' with a space.
      // Ensure your client sends the key as 'title' without any extra spaces.
      updateData.title = req.body.title;
    }
    if ("artist" in req.body) {
      updateData.artist = req.body.artist;
    }
    if ("mood" in req.body) {
      updateData.mood = req.body.mood;
    }

    // If a new audio file is uploaded, upload it and update the audio URL
    if (req.file) {
      console.log("Update request file:", req.file);
      // Note: For a production app, you should also delete the OLD audio file from your storage
      const fileData = await uploadFile(req.file);
      updateData.audio = fileData.url;
    }

    // Find the song by its ID and update it with the new data
    const updatedSong = await Song.findByIdAndUpdate(id, updateData, {
      new: true, // Return the modified document rather than the original
      runValidators: true, // Ensure the update respects the schema validation
    });

    if (!updatedSong) {
      return res.status(404).json({ message: "Song not found" });
    }

    res
      .status(200)
      .json({ message: "Song updated successfully", song: updatedSong });
  } catch (error) {
    console.error("Error updating song:", error);
    res.status(500).json({ message: "Server error while updating song." });
  }
});

/**
 * @route   DELETE /api/songs/:id
 * @desc    Delete a song
 * @access  Public
 */
router.delete("/songs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the song by its ID and delete it
    const deletedSong = await Song.findByIdAndDelete(id);

    if (!deletedSong) {
      return res.status(404).json({ message: "Song not found" });
    }

    // --- IMPORTANT ---
    // In a real-world application, you should also delete the associated audio file
    // from your cloud storage (e.g., S3, Google Cloud Storage) to avoid orphaned files.
    // You would need a corresponding `deleteFile` function in your `storage.service`.
    // Example: await deleteFile(deletedSong.audio);

    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    console.error("Error deleting song:", error);
    res.status(500).json({ message: "Server error while deleting song." });
  }
});

module.exports = router;
