const express = require("express");
const router = express.Router();
const fs = require("fs");
const uniqid = require("uniqid");

const readVideosData = () => {
  const videosData = fs.readFileSync("./data/videos.json");
  return JSON.parse(videosData);
};

router
  //GET endpoint for side videos
  .get("/", (req, res) => {
    console.log("get root");
    const videoData = readVideosData();
    //getting small amount of data for each video
    const sideVideoData = videoData.map((video) => ({
      id: video.id,
      title: video.title,
      channel: video.channel,
      image: video.image,
    }));
    res.json(sideVideoData);
  })
  //POST endpoint to add a video
  .post("/", (req, res) => {
    console.log(req.body);
    // //create a new Video with a unique ID
    const newVideo = {
      id: uniqid(),
      title: req.body.title,
      description: req.body.description,
      image: "./public/images/cute-cat.jpg",
    };
    console.log(newVideo);
    const videos = readVideosData();
    videos.push(newVideo);
    console.log(videos);
    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
    res.status(201).json(newVideo);
  });

//GET endpoint for main videos
router.get("/:id", (req, res) => {
  console.log("get id");
  const videoData = readVideosData();
  //getting all the details for a specific video
  const mainVideoData = videoData.find((video) => req.params.id === video.id);
  res.json(mainVideoData);
});

module.exports = router;
