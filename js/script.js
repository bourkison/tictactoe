let gameBoard =
[
  [],
  [],
  []
];

// First let's set the length of each sub array.
for (let i = 0; i < gameBoard.length; i++) {
  gameBoard[i].length = 3;
} // for loop

// Now let's populate the array with empty spaces.
for (let i = 0; i < gameBoard.length; i ++) {
  for (let j = 0; j < gameBoard[0].length; j++) {
      gameBoard[i][j] = " ";
  } // j loop
} // i loop

let xTurn = true;

let newTurn = function(xPos, yPos) {

  // First let's check to see if the position has anything in it. If so, break out of the function.
  if (gameBoard[yPos][xPos] !== " ") {
    console.log("Error, position is not empty.");
    return;
  } // if

  // Now let's check to see who's turn it is using the xTurn boolean.
  // We then change xTurn to the opposite as it's now the next person's turn.
  if (xTurn) {
    gameBoard[yPos][xPos] = "X";
    xTurn = false;
  } else {
    gameBoard[yPos][xPos] = "O";
    xTurn = true;
  }

  // Now let's print the board out to the console.
  for (let i = 0; i < gameBoard.length; i++) {
    console.log(gameBoard[i].join(" | "));
  }
} // newTurn
