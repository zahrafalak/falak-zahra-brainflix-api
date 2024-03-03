const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const videosRoute = require("./routes/videos");
app.use("/videos", videosRoute);

app.listen(port, () => console.log(`Listening on ${port}`));
