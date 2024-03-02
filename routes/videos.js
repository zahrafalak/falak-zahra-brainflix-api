const express = require("express");
const router = express.Router();
const fs = require("fs");

const readVideosData = () => {
  const videosData = fs.readFileSync("./data/videos.json");
  return JSON.parse(videosData);
};

//GET endpoint for side videos
router.get("/", (req, res) => {
  const videoData = readVideosData();
  //getting small amount of data for each video
  const sideVideoData = videoData.map((video) => ({
    id: video.id,
    title: video.title,
    channel: video.channel,
    image: video.image,
  }));
  res.json(sideVideoData);
});

//GET endpoint for main videos
router.get("/:id", (req, res) => {
  const videoData = readVideosData();
  //getting all the details for a specific video
  const mainVideoData = videoData.find((video) => req.params.id === video.id);
  res.json(mainVideoData);
});

//POST endpoint to add a video

module.exports = router;
