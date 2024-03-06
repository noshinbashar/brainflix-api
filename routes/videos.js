const express = require("express");
const router = express.Router();
const fs = require("fs");


router.get("/", (req, res) => {
    const videosJSON = fs.readFileSync("./data/videos.json");
    const videos = JSON.parse(videosJSON);
  
    res.status(200).send(videos);
  });

router.get("/:videosId", (req, res) => {
   
    const { videosId } = req.params;
    console.log("params: ", videosId);
  
    const videosJSON = fs.readFileSync("./data/videos.json");
    const videos = JSON.parse(videosJSON);
  
    const selectedVideo = videos.find(
      (videosItem) => videosItem.id === videosId
    );
  
    res.status(200).send(selectedVideo);
  });

  module.exports = router;