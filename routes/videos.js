const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');


router.get("/", (req, res) => {
  const videosJSON = fs.readFileSync("./data/videos.json");
  const videos = JSON.parse(videosJSON);

  res.status(200).send(videos);
});


  // Get selected video by ID
router.get("/:videosId", (req, res) => {

  const { videosId } = req.params;
  console.log("params: ", videosId);

  // Read video data from JSON file
  const videosJSON = fs.readFileSync("./data/videos.json");
  const videos = JSON.parse(videosJSON);

  const selectedVideo = videos.find(
    (videosItem) => videosItem.id === videosId
  );

  res.status(200).send(selectedVideo);
});


// Get comments for a selected video
router.get("/:id/comments", (req, res) => {
  const videoId = req.params.id;

  // Read video data from JSON file
  const videosJSON = fs.readFileSync("./data/videos.json");
  const videos = JSON.parse(videosJSON);

  // Find the video by ID
  const video = videos.find(video => video.id === videoId);

  // If video is found, send its comments as response
  if (video) {
      res.status(200).json(video.comments);
  } else {
      // If video is not found, send 404 error
      res.status(404).json({ error: "Video not found" });
  }
});


// Post a new comment for selected video
router.post("/:videoId/comments", (req, res) => {
  const videoId = req.params.videoId;

  // Read video data from JSON file
  const videosJSON = fs.readFileSync("./data/videos.json");
  const videos = JSON.parse(videosJSON);

  // Find the video by ID
  const videoIndex = videos.findIndex(video => video.id === videoId);

  // If video is found, create a new comment
  if (videoIndex !== -1) {
    const newComment = {
      id: uuidv4(),
      name: req.body.name, 
      comment: req.body.comment, 
      likes: 0,
      timestamp: Date.now()
    };
    
    videos[videoIndex].comments.push(newComment);

    // Write updated video data back to JSON file
    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));

    res.status(201).json(newComment);
  } else {
    // If video is not found, send 404 error
    res.status(404).json({ error: "Video not found" });
  }
});

module.exports = router;