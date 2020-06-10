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

    function chessMoves(givenPosition) {
      return chess.moves({ square: givenPosition }).map(m => m.substring(1).replace('#', ''))
    }

    let possibleMoves = chessMoves(position);
    console.log(possibleMoves)
    let newPossibleMoves = []
    possibleMoves.forEach(element => {
      chess.put({ type: chess.KNIGHT, color: chess.WHITE }, element)
      const temp = chess.moves({ square: element }).map(m => m.slice(m.length - 2, m.length))
      newPossibleMoves = [...newPossibleMoves, ...temp].filter((x, index, self) => self.indexOf(x) === index)
    });
    console.log(newPossibleMoves)



    res.json(newPossibleMoves);
  } catch (error) {
    console.error(err.message);
  }
})

app.listen(process.env.PORT || 5000, () => {
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