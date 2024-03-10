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
    //create a new Video with a unique ID
    const newVideo = {
      id: uniqid(),
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      channel: "Your channel",
      views: "72,342",
      likes: "8,785",
      duration: "2:59",
      timestamp: 1630656720000,
      comments: [
        {
          id: "6ff4314c-acde-4c91-a753-95cb7a366ee9",
          name: "Lightening McQueen",
          comment: "Love it!",
          likes: 0,
          timestamp: 1632227521000,
        },
        {
          id: "894b2ef9-640e-4d55-95ac-c65cfc39d693",
          name: "Doc Hudson",
          comment:
            "Drifting along the coast in a city on the water. Such incredible destinations to see all around the world.",
          likes: 1,
          timestamp: 1631976360000,
        },
      ],
    };
    const videos = readVideosData();
    videos.push(newVideo);
    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
    res.status(201).json(newVideo);
  });

//GET endpoint for main videos
router.get("/:id", (req, res) => {
  const videoData = readVideosData();
  //getting all the details for a specific video
  const mainVideoData = videoData.find((video) => req.params.id === video.id);
  res.json(mainVideoData);
});

//POST endpoint for comments
router.post("/:id/comments", (req, res) => {
  const videos = readVideosData();
  const videoID = req.params.id;
  //Creating the new comment
  const newComment = {
    id: uniqid(),
    name: req.body.user,
    comment: req.body.comment,
    likes: 0,
    timestamp: Date.now(),
  };

  const targetVideo = videos.find((video) => {
    return video.id === videoID;
  });
  targetVideo.comments.unshift(newComment);
  fs.writeFileSync("./data/videos.json", JSON.stringify(videos));

  const videoData = readVideosData();
  const mainVideoData = videoData.find((video) => videoID === video.id);
  res.json(mainVideoData);
});

module.exports = router;
