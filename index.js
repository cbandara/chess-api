const express = require("express");
const cors = require("cors");
const app = express();

const { Chess } = require('chess.js')



//middleware
app.use(cors());
app.use(express.json());

app.post("/knight", async (req, res) => {
  try {
    const chess = new Chess()
    chess.clear()

    const position = req.body.position
    console.log(position)

    chess.put({ type: chess.KNIGHT, color: chess.WHITE }, position)
    console.log(chess.ascii())

    const possibleMoves = chess.moves({ square: position }).map(m => m.substring(1).replace('#', ''));
    console.log(possibleMoves)

    res.json(possibleMoves);
  } catch (error) {
    console.error(err.message);
  }
})

app.listen(5000, () => {
  console.log("server has started on port 5000");
})

// Import chess.jss

// Get the Knight's current position fom the App request body

// Create a list of possible moves
// .moves([ options ])
// Knight can move 2 squares horizontally and 1 square vertically
// or 1 square horizontally and 2 squares vertically

// Throw out any possible moves that are beyond the board
// a-h and 1-8
// Possibly use a grid setup of 64 squares???

// Return list of positions in response body

// Deploy API to heroku