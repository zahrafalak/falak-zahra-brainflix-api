const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
// app.use(express.json());

app.get("/", (req, res) => {
  res.send("main app");
});

const videosRoute = require("./routes/videos");
app.use("/videos", videosRoute);

app.listen(port, () => console.log(`Listening on ${port}`));