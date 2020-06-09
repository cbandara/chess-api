const express = require("express");
const cors = require("cors");
const app = express();


//middleware
app.use(cors());
app.use(express.json());

app.post("/hello", async (req, res) => {
  try {
    const position = req.body.position
    console.log(position)
    res.json(position);
  } catch (error) {
    console.error(err.message);
  }
})

app.listen(5000, () => {
  console.log("server has started on port 5000");
}) 