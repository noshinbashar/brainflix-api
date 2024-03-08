const express = require("express");
const app = express();
const videos = require("./routes/videos");
const cors = require("cors");
// require('dotenv').config();

const PORT = 8080;

app.use(express.json()); 
app.use(express.static("public")); 
app.use(cors());

app.use("/videos", videos);


app.get("/", (req, res) => {
    res.send("Welcome!");
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on PORT:${PORT}`);
  });