const express = require("express");
const router = express.Router();
const fs = require("fs");

const readVideosData = () => {
  const videosData = fs.readFileSync("./data/videos.json");
  return JSON.parse(videosData);
};

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

module.exports = router;
