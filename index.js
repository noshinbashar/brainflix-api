const express = require("express");
const app = express();
const videos = require("./routes/videos");
const cors = require("cors");

const PORT = 8080;

app.use(express.json()); // sets the req.body
app.use(express.static("public")); // make resources from the "public" folder available from the client
app.use(cors());

app.use("/videos", videos);

app.get("/", (req, res) => {
    res.send("Welcome to the dungeon!");
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on PORT:${PORT}`);
  });