# Chess API Documentation
This API currently has one endpoint /knight which receives position in the form of a JSON object and return a list of positions as a JSON object

## Try on Postman
  URL: https://chess-api-cbandara.herokuapp.com/knight

  Method: POST

  Auth: No Token Required
Input:
```
 {
 	"position": "b7"
 }
 ```
Expected Output:
```
["f7","e6","c6","c8","e8","6f","f5","e4","c4","b5","a6","d7","ce","d3","b3","a4","ac","ab"]
```


## Getting Started
Clone the repo
```
npm install
npm run dev
```

To configure the port, create an environmental variable for PORT or change the port manually at the bottom of the index.js file

NPM Dependencies
```
    "chess.js": "^0.10.3",
    "cors": "^2.8.5",
    "express": "^4.17.1"
```

## Algorithm
The underlying algorithm for this API was built using chess.js. The chess.js library is serves as the logic behind the chessboard. If you take a look at the [Chess.js Documentation](https://github.com/jhlywa/chess.js/blob/master/README.md) 

Once you create a Chess() instance, you can append many different methods to it. The main two I'm using are chess.put() and chess.moves()

### Knight Endpoint

### chess.put()
chess.put(piece, square) takes one piece and one square.
Example: 
```
chess.put({ type: chess.KNIGHT, color: chess.WHITE }, element)
```
I use this in two places, first to set the inital position and then again inside my forEach function when getting the initial position for each second move.

### chess.moves()
chess.moves([options]) needs to be supplied with a square that currently has a piece on it. This is why it is important for us to use chess.put() to set the piece before we ask for the moves. If we don't set the piece each time, chess.js won't know what kind of piece we are wanting to work with. 

The knight endpoint's job is to get the position of a knight and return the possible squares in exactly TWO moves. This was simple enough to execute for one move, but doing it for two moves was when it became a little bit tricky. The key is to run chess.moves() on the initial supplied position and then run chess.moves() again on the list of positions given by the first move.

In order to do this we need to execute a forEach on the list of original possible moves. This cant be done with the current data that chess.moves() returns because it contains the piece identifier. Example: 'Nf3' the N is the piece identifier for knight. We need to strip this away from each item in the list. 

So before we run the forEach, we run a map function that strips the 'N' from each item and also deletes any '#' added on by what's called 'sloppy notation' in chess. This # isn't important to us right now so we can splice that away as well.

Once we've ran the map() function on possible moves, we pass it on to the forEach() function that does the majority of the heavy lifting for the second move possible squares. You can see that after we iterate through the initial array, we append the new array to an empty aray called newPossibleMoves. Now this array contains duplicates which we don't want. To remove the duplicates we simply run a filter function that deletes any duplicates in newPossibleMoves. 


If you would like to contribute to this repo, please visit the supplemental CONTRIBUTING.md file in [Frontend App Docs](https://github.com/cbandara/chess-knight-app) and email charuthabandara@gmail.com

