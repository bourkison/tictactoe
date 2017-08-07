let gameBoard =
[
  [],
  [],
  []
];

let gameWon = false;

let xTurn = true;


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

let newTurn = function(xPos, yPos) {
  // First let's check to see if someone has won the game.
  if (gameWon) {
    console.log("Error, someone has already won. Please refresh the browser");
    return;
  } // if

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
  } // if else

  // Now let's print the board out to the console.
  for (let i = 0; i < gameBoard.length; i++) {
    console.log(gameBoard[i].join(" | "));
  } // for

  // Check if anyone has won yet
  checkForWin();
} // newTurn


// This function will be checking if someone has won the game.
let checkForWin = function() {

  // First let's check horizontally.
  for (let i = 0; i < gameBoard.length; i++) {
    // Check if on this row (i) the 0th and 1st index are equal.
    if (gameBoard[i][0] === gameBoard[i][1]) {
      // If so check if the 1st and second are.
      if (gameBoard[i][1] === gameBoard[i][2]) {
        // Now we need to check that at least one of these is equal to X or O so that we're not getting here with just a space.
        if (gameBoard[i][0] === "X" || gameBoard[i][0] === "O") {
          // If this is true then someone was won.
          console.log(`Congratulations, ${gameBoard[i][0]} wins!`);
          gameWon = true;
          return;
        } // if
      } // if
    } // if
    // If not, increment i (i.e. let's check the next row).
  } // i loop


  // Now let's check vertically
  for (let i = 0; i < gameBoard[0].length; i++) {
    // Check if on this column (i), the 0th and 1st index are equal.
    if (gameBoard[0][i] === gameBoard[1][i]) {
      // If so check if the 1st and 2nd index are/
      if (gameBoard[1][i] === gameBoard[2][i]) {
        // Now check that at least one of these is equal X or O
        if (gameBoard[0][i] === "X" || gameBoard[0][i] === "O") {
          // If this is true then someone has won.
          console.log(`Congratulations, ${gameBoard[0][i]} wins!`);
          gameWon = true;
          return;
        }// if
      } // if
    } // if
  } // i loop

  // Now let's check diagonally, firstly from top-left to bottom-right.
  // First check that the top left is equal to the middle.
  if (gameBoard[0][0] === gameBoard[1][1]) {
    // Next check to see if the middle is equal to the bottom-right
    if (gameBoard[1][1] === gameBoard[2][2]) {
      // Now check to see that one of these is equal to X or O
      if (gameBoard[0][0] === "X" || gameBoard[0][0] === "O") {
        console.log(`Congratulations, ${gameBoard[0][0]} wins!`);
        gameWon = true;
        return;
      }
    }// if
  } // if

  // Finally let's check diagonally from top-right to bottom-left.
  // First check that the top right is equal to the middle.
  if (gameBoard[0][2] === gameBoard[1][1]) {
    // Next check that the middle is equal to the bottom left.
    if (gameBoard[1][1] === gameBoard[2][0]) {
      // Now check to see that one of these is equal to X or O
      if (gameBoard[0][2] === "X" || gameBoard[0][2] === "O") {
        console.log(`Congratulations, ${gameBoard[0][2]} wins!`);
        gameWon = true;
        return;
      }
    } // if
  } // if
}
