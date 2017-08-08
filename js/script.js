let gameBoard =
[
  [],
  [],
  []
];

let gameWon = false;
let twoPlayer = true;
let xTurn = true;
let log = $("#results")[0];

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
    console.log("Error, someone has already won. Please refresh the browser.");
    log.innerHTML = "Error, someone has already won. Please refresh the browser.";
    return;
  } // if

  // First let's check to see if the position has anything in it. If so, break out of the function.
  if (gameBoard[yPos][xPos] !== " ") {
    console.log("Error, position is not empty.");
    log.innerHTML = "Error, position is not empty.";
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

  console.log("--------------");
  // Now let's print the board out to the console.
  for (let i = 0; i < gameBoard.length; i++) {
    console.log(gameBoard[i].join(" | "));
  } // for

  // Check if anyone has won yet
  checkForWin();

  // Update the HTML
  updateHTML();

  // Now, if we need to check if we're playing one player or two player, and if we're playing two player AND its o's turn, we need the ai to make a move.
  if (!twoPlayer && !xTurn && !gameWon) {
    aiTurn();
  } // if

  turns++;
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
          log.innerHTML = `Congratulations, ${gameBoard[i][0]} wins!`;
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
          log.innerHTML = `Congratulations, ${gameBoard[0][i]} wins!`;
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
        log.innerHTML = `Congratulations, ${gameBoard[0][0]} wins!`;
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
        log.innerHTML = `Congratulations, ${gameBoard[0][2]} wins!`;
        gameWon = true;
        return;
      }
    } // if
  } // if
} // checkForWin


// Now let's create another array which just has a reference to the elements in the table.
let tableRef = $(".box");

// Now create a function which loops through our gameBoard array and updates the th tags accordingly.
let updateHTML = function() {
  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[0].length; j++) {
      // Now check to see that in this index, it's not just equal to nothing.
      if (gameBoard[j][i] !== " ") {
        // Convert the 2 dimensional array indices to a one dimensional array index.
        let tableRefIndex = (j * 3) + i;
        // Now change the th to be equal to the corresponding value of gameboard.
        tableRef[tableRefIndex].innerHTML = gameBoard[j][i];
      } // if
    } // j loop
  } // i loop
} // updateHTML

// Create a variable that will increment every time a turn is made, and will stop the game once it reaches 9 (i.e. there will be no more space on the board).
let turns = 0;

// Use jQuery to check for a click
$(".box").click(function() {
  if (turns < 9 && !gameWon) {
    let index = this.id;

    // Calculate the x and y position based off of the id.
    let xPos = index % 3;
    let yPos = Math.floor(index / 3);

    newTurn(xPos, yPos);
    if (turns === 9) {
      console.log(`Game Over. Draw!`);
      log.innerHTML = `Game Over. Draw!`;
    }
  }
});


$("#onep").click(function() {
  $("#game").css("display", "inline");
  $("#buttons").css("display", "none");
  twoPlayer = false;
});

$("#twop").click(function() {
  $("#game").css("display", "inline");
  $("#buttons").css("display", "none");
  twoPlayer = true;
});

$("#restart").click(function() {
  // Reset the board
  for (let i = 0; i < gameBoard.length; i ++) {
    for (let j = 0; j < gameBoard[0].length; j++) {
        gameBoard[i][j] = " ";
    } // j loop
  } // i loop

  // Reset the actual content of the table.
  for (let i = 0; i < tableRef.length; i ++) {
    tableRef[i].innerHTML = "";
  }

  // Hide the game and reshow the buttons
  $("#game").css("display", "none");
  $("#buttons").css("display", "inline-block");

  // Reset the booleans...
  gameWon = false;
  xTurn = true;
  turns = 0;

  // Reset the log.
  log.innerHTML = "";
})


let aiTurn = function() {
  // Let's set up an array of the move to make, where the 0th element is x pos and the 1st element is y pos
  let moveToMake = [];

  // First let's check to see if the computer can win
  moveToMake = checkForTwoInRow("O");
  // If moveToMake is not equal to null, then we have gotten a value and should input that.
  if (moveToMake !== null) {
    newTurn(moveToMake[0], moveToMake[1]);
    return;
  }

  // Now let's check to see if the computer needs to block off a player's victory.
  moveToMake = checkForTwoInRow("X");
  if (moveToMake !== null) {
    newTurn(moveToMake[0], moveToMake[1]);
    return;
  }


  // Now let's check to see if the computer can fork the player.
  moveToMake = checkForFork("O");
  if (moveToMake !== null) {
    newTurn(moveToMake[0], moveToMake[1]);
    return;
  }

  // Now let's check to see if the player can fork, and if so let's block it.
  moveToMake = checkForFork("X");
  if (moveToMake !== null) {
    newTurn(moveToMake[0], moveToMake[1]);
    return;
  }

  // Now we need to check if the center position is available, and if so we'll choose that one.
  if (gameBoard[1][1] === " ") {
    newTurn(1, 1);
    return;
  }


  // Now let's check to see if the player has chosen a corner and if so we will pick the opposite one.
  moveToMake = checkCorner("X");
  if (moveToMake !== null) {
    newTurn(moveToMake[0], moveToMake[1]);
    return;
  }

  // Now let's just check to see if theres an empty corner available.
  moveToMake = checkEmptyCorner();
  if (moveToMake !== null) {
    newTurn(moveToMake[0], moveToMake[1]);
    return;
  }

  // Now let's just choose an empty side.
  moveToMake = checkEmptySide();
  newTurn(moveToMake[0], moveToMake[1]);
  return;
} // aiTurn

let checkForTwoInRow = function(s) {
  // First let's check horizontally.
  for (let i = 0; i < gameBoard.length; i++) {
    // Check if on this row (i) the 0th and 1st index are equal OR the 1st and 2nd index are equal OR the 0th and 2nd are equal. If so, return the best one to place.
    if (gameBoard[i][0] === gameBoard[i][1]) {
      // Now check if either the 1st are equal to the input
      if (gameBoard[i][0] === s) {
        // Now check if our desired spot is empty.
        if (gameBoard[i][2] === " ") {
          return [2, i];
        } // if
      } // if
    } // if
    else if (gameBoard[i][1] === gameBoard[i][2]) {
      if (gameBoard[i][1] === s) {
        if (gameBoard[i][0] === " ") {
          return [0, i];
        }
      } // if
    } // else if
    else if (gameBoard[i][0] === gameBoard[i][2]) {
      if (gameBoard[i][0] === s) {
        if (gameBoard[i][1] === " ") {
          return [1, i];
        }
      } // if
    } // else if
  } // for

  // Now check vertically
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[0][i] === gameBoard[1][i]) {
      // Now check if either the 1st are equal to the input
      if (gameBoard[0][i] === s) {
        if (gameBoard[2][i] === " ") {
          return [i, 2];
        }
      } // if
    } // if
    else if (gameBoard[1][i] === gameBoard[2][i]) {
      if (gameBoard[1][i] === s) {
        if (gameBoard[0][i] === " ") {
          return [i, 0];
        }
      }
    }
    else if (gameBoard[0][i] === gameBoard[2][i]) {
      if (gameBoard[0][i] === s) {
        if (gameBoard[1][i] === " ") {
          return [i, 1];
        }
      }
    }
  }


  // Now let's check diagonally from top-left to bottom-right.
  if (gameBoard[0][0] === gameBoard[1][1]) {
    if (gameBoard[0][0] === s) {
      if (gameBoard[2][2] === " ") {
        return [2, 2];
      }
    }
  }
  else if (gameBoard[0][0] === gameBoard[2][2]) {
    if (gameBoard[0][0] === s) {
      if (gameBoard[1][1] === " ") {
        return [1, 1];
      }
    }
  }
  else if (gameBoard[1][1] === gameBoard[2][2]) {
    if (gameBoard[1][1] === s) {
      if (gameBoard[0][0] === " ") {
        return [0, 0];
      }
    }
  }

  // Now lets check diagonally from top-right to bottom-left.
  if (gameBoard[0][2] === gameBoard[1][1]) {
    if (gameBoard[1][1] === s) {
      if (gameBoard[2][0] === " ") {
        return [0, 2];
      }
    }
  }
  else if (gameBoard[1][1] === gameBoard[2][0]) {
    if (gameBoard[1][1] === s) {
      if (gameBoard[0][2] === " ") {
        return [2, 0];
      }
    }
  }
  else if (gameBoard[0][2] === gameBoard[2][0]) {
    if (gameBoard[0][2] === s) {
      if (gameBoard[1][1] === " ") {
        return [1, 1];
      }
    }
  }

  // If none of these return anything, just return null.
  return null;

}



let checkForFork = function(s) {
  // First let's check to see if the top-left corner is equal to s
  if (gameBoard[0][0] === s) {
    // Now let's check to see if the top-left corner is equal to any other corners.
    if (gameBoard[0][0] === gameBoard[0][2]) {
      // Now let's check to see if either of the remaining corners are available.
      if (gameBoard[2][2] === " ") {
        return [2, 2];
      }

      if (gameBoard[2][0] === " ") {
        return [0, 2];
      }

    }
    else if (gameBoard[0][0] === gameBoard[2][2]) {
      if (gameBoard[0][2] === " ") {
        return [2, 0];
      }

      if (gameBoard[2][0] === " ") {
        return [0, 2];
      }
    }
    else if (gameBoard[0][0] === gameBoard[2][0]) {
      if (gameBoard[0][2] === " ") {
        return [2, 0];
      }

      if (gameBoard[2][2] === " ") {
        return [2, 2];
      }
    }
  }

  // Now let's check for the top-right corner - keeping in mind that we don't have to check the top-left corner again. As we've already checked every possible outcome.
  if (gameBoard[0][2] === s) {
    if (gameBoard[0][2] === gameBoard[2][2]) {
      if (gameBoard[0][0] === " ") {
        return[0, 0];
      }

      if (gameBoard[2][0] === " ") {
        return [0, 2];
      }
    }
    else if (gameBoard[0][2] === gameBoard[2][0]) {
      if (gameBoard[0][0] === " ") {
        return [0, 0];
      }

      if (gameBoard [2][2] === " ") {
        return [2, 2];
      }
    }
  }

  // Finally we just need to compare the bottom-right corner with the bottom-left corner as we've compared every other possible option.
  if (gameBoard[2][2] === s) {
    if (gameBoard[2][2] === gameBoard[2][0]) {
      if (gameBoard[0][0] === " ") {
        return [0, 0];
      }

      if (gameBoard[0][2] === " ") {
        return [2, 0];
      }
    }
  }

  // If none of these return anything, just return null.
  return null;

}


let checkCorner = function(s) {

  // Top left corner
  if (gameBoard[0][0] === s && gameBoard[2][2] === " ") {
    return [2, 2];
  }

  // Top right corner
  if (gameBoard[0][2] === s && gameBoard[2][0] === " ") {
    return [0, 2];
  }

  // Bottom right corner
  if (gameBoard[2][2] === s && gameBoard[0][0] === " ") {
    return [0, 0];
  }

  // Bottom left corner
  if (gameBoard[2][0] === s && gameBoard[0][2] === " ") {
    return [2, 0];
  }

  // Else return null
  return null;
}


let checkEmptyCorner = function() {

  // Top-left
  if (gameBoard[0][0] === " ") {
    return [0, 0];
  }

  //Top-right
  if (gameBoard[0][2] === " ") {
    return [2, 0];
  }

  // Bottom-right
  if (gameBoard[2][2] === " ") {
    return [2, 2];
  }

  // Bottom-left
  if (gameBoard[2][0] === " ") {
    return [0, 2];
  }

  return null;

}


let checkEmptySide = function() {
  // Top-middle
  if (gameBoard[0][1] === " ") {
    return [1, 0];
  }

  // Right-middle
  if (gameBoard[1][2] === " ") {
    return [2, 1];
  }

  // Bottom-middle
  if(gameBoard[2][1] === " ") {
    return [1, 2];
  }

  //Left-middle
  if (gameBoard[1][0] === " ") {
    return[0, 1];
  }
}
