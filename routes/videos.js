const express = require("express");
const router = express.Router();
const fs = require("fs");
// const { v4: uuidv4 } = require('uuid');


router.get("/", (req, res) => {
  const videosJSON = fs.readFileSync("./data/videos.json");
  const videos = JSON.parse(videosJSON);

  res.status(200).send(videos);
});



router.get("/:videosId", (req, res) => {

  // Get selected video by ID
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



// Get comments for a specific video by ID
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


// Get a single comment for a specific video by ID
router.get("/:videoId/comments/:commentId", (req, res) => {
  const videoId = req.params.videoId;
  const commentId = req.params.commentId;

  // Read video data from JSON file
  const videosJSON = fs.readFileSync("./data/videos.json");
  const videos = JSON.parse(videosJSON);

  // Find the video by ID
  const video = videos.find(video => video.id === videoId);

  // If video is found, find the comment by its ID
  if (video) {
    const comment = video.comments.find(comment => comment.id === commentId);
    if (comment) {
      res.status(200).json(comment);
    } else {
      // If comment is not found, send 404 error
      res.status(404).json({ error: "Comment not found" });
    }
  } else {
    // If video is not found, send 404 error
    res.status(404).json({ error: "Video not found" });
  }
});

module.exports = router;