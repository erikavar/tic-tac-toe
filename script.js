// factory function for players
const Player = (name, symbol) => {
    const playerWins = () => {
        console.log(`${name} wins!`);


    }
    return { name, symbol, playerWins }
};

// adding placeholder to array every time corresponding spot is clicked
const Gameboard = (() => {
    let arr = ["","","","","","","","",""];
   
    const clicked = document.querySelectorAll(".spot");

    const addPlaceholders = () => {
        clicked.forEach((div) => {
            div.addEventListener("click", () => {
                arr.forEach((item, index) => {
                    if (div.id === index.toString() && arr[index] === "") {
                        arr[index] = "placeholder";
                    }
                    return arr;
                });
            });
            return clicked;
        });
    }

    const playGame = () => {
        
        const player1 = Player("Player 1", "X");
        const player2 = Player("Player 2", "O");
        
        let count = 0;
        let turn;

        Gameboard.clicked.forEach((div) => {
            div.addEventListener("click", () => {
                Gameboard.arr.forEach((item, index) => {
                    if (Gameboard.arr[index] !== "") {
                        count += 1;
                    }
                    return count;
                });
                if (count % 2 === 0) {
                    turn = "Player 2";
                } else {
                    turn = "Player 1";
                }
                count = 0;

                // whose turn it is will determine which symbol should be placed in the array
                // and which symbol should be displayed on the board
                if ((turn === "Player 2") && (div.textContent === String.fromCharCode(160))) {
                    div.textContent = player2.symbol;
                    Gameboard.arr.forEach((item, index) => {
                        if (div.id === index.toString() && Gameboard.arr[index] === "placeholder") {
                            Gameboard.arr[index] = player2.symbol;
                        }
                    });
                } else if ((turn === "Player 1") && (div.textContent === String.fromCharCode(160))) {
                    div.textContent = player1.symbol;
                    Gameboard.arr.forEach((item, index) => {
                        if (div.id === index.toString() && Gameboard.arr[index] === "placeholder") {
                            Gameboard.arr[index] = player1.symbol;
                        }
                    });
                }

                // check for winner of round

                if ((Gameboard.arr[0]!=="") && ((Gameboard.arr[0] === Gameboard.arr[1] && Gameboard.arr[0] === Gameboard.arr[2]) 
                    || (Gameboard.arr[0] === Gameboard.arr[3] && Gameboard.arr[0] === Gameboard.arr[6]))) {
                        if (Gameboard.arr[0] === player1.symbol) {
                            player1.playerWins();
                        } else if (Gameboard.arr[0] === player2.symbol) {
                            player2.playerWins();
                        }
                } else if ((Gameboard.arr[4]!=="") && ((Gameboard.arr[0] === Gameboard.arr[4] && Gameboard.arr[0] === Gameboard.arr[8]) 
                    || (Gameboard.arr[3] === Gameboard.arr[4] && Gameboard.arr[3] === Gameboard.arr[5])
                    || (Gameboard.arr[1] === Gameboard.arr[4] && Gameboard.arr[1] === Gameboard.arr[7])
                    || (Gameboard.arr[2] === Gameboard.arr[4] && Gameboard.arr[2] === Gameboard.arr [6]))) {
                        if (Gameboard.arr[4] === player1.symbol) {
                            player1.playerWins();
                        } else if (Gameboard.arr[4] === player2.symbol) {
                            player2.playerWins();
                        }
                } else if ((Gameboard.arr[8]!=="") && ((Gameboard.arr[6] === Gameboard.arr[7] && Gameboard.arr[6] === Gameboard.arr[8])
                    || (Gameboard.arr[2] === Gameboard.arr[5] && Gameboard.arr[2] === Gameboard.arr[8]))) {
                        if (Gameboard.arr[8] === player1.symbol) {
                            player1.playerWins();
                        } else if (Gameboard.arr[8] === player2.symbol) {
                            player2.playerWins();
                        }
                } else if (Gameboard.arr[0] !== "" && Gameboard.arr[1] !== "" && Gameboard.arr[2] !== "" 
                        && Gameboard.arr[3] !== "" && Gameboard.arr[4] !== "" && Gameboard.arr[5] !== ""
                        && Gameboard.arr[6] !== "" && Gameboard.arr[7] !== "" && Gameboard.arr[8] !== "") {
                        console.log("It's a tie!");
                }
                //console.log(Gameboard.arr);
            });
        });

    }

    const resetGame = () => {
        Gameboard.arr = ["","","","","","","","",""];
        allSquares = document.querySelectorAll(".spot");
        allSquares.forEach((div) => {
            div.textContent = "";
        });
    }

    return { arr, addPlaceholders, clicked, playGame, resetGame };
})();


// game flow
const Game = (() => {

    Gameboard.addPlaceholders();
    Gameboard.playGame();

    document.querySelector("button").addEventListener("click", () => {
        Gameboard.resetGame();
        Gameboard.addPlaceholders();
        Gameboard.playGame();
        console.log(Gameboard.arr);
    });

    // use arr from Gameboard.arr to check if even or odd number of marks have been made
    // even? player 1's turn. odd? player 2's turn
    /*let count = 0;
    let turn;

    Gameboard.clicked.forEach((div) => {
        div.addEventListener("click", () => {
            Gameboard.arr.forEach((item, index) => {
                if (Gameboard.arr[index] !== "") {
                    count += 1;
                }
                return count;
            });
            if (count % 2 === 0) {
                turn = "Player 2";
            } else {
                turn = "Player 1";
            }
            count = 0;

            // whose turn it is will determine which symbol should be placed in the array
            // and which symbol should be displayed on the board
            if ((turn === "Player 2") && (div.textContent === String.fromCharCode(160))) {
                div.textContent = player2.symbol;
                Gameboard.arr.forEach((item, index) => {
                    if (div.id === index.toString() && Gameboard.arr[index] === "placeholder") {
                        Gameboard.arr[index] = player2.symbol;
                    }
                });
            } else if ((turn === "Player 1") && (div.textContent === String.fromCharCode(160))) {
                div.textContent = player1.symbol;
                Gameboard.arr.forEach((item, index) => {
                    if (div.id === index.toString() && Gameboard.arr[index] === "placeholder") {
                        Gameboard.arr[index] = player1.symbol;
                    }
                });
            }

            // check for winner of round

            if ((Gameboard.arr[0]!=="") && ((Gameboard.arr[0] === Gameboard.arr[1] && Gameboard.arr[0] === Gameboard.arr[2]) 
                || (Gameboard.arr[0] === Gameboard.arr[3] && Gameboard.arr[0] === Gameboard.arr[6]))) {
                    if (Gameboard.arr[0] === player1.symbol) {
                        player1.playerWins();
                    } else if (Gameboard.arr[0] === player2.symbol) {
                        player2.playerWins();
                    }
            } else if ((Gameboard.arr[4]!=="") && ((Gameboard.arr[0] === Gameboard.arr[4] && Gameboard.arr[0] === Gameboard.arr[8]) 
                || (Gameboard.arr[3] === Gameboard.arr[4] && Gameboard.arr[3] === Gameboard.arr[5])
                || (Gameboard.arr[1] === Gameboard.arr[4] && Gameboard.arr[1] === Gameboard.arr[7])
                || (Gameboard.arr[2] === Gameboard.arr[4] && Gameboard.arr[2] === Gameboard.arr [6]))) {
                    if (Gameboard.arr[4] === player1.symbol) {
                        player1.playerWins();
                    } else if (Gameboard.arr[4] === player2.symbol) {
                        player2.playerWins();
                    }
            } else if ((Gameboard.arr[8]!=="") && ((Gameboard.arr[6] === Gameboard.arr[7] && Gameboard.arr[6] === Gameboard.arr[8])
                || (Gameboard.arr[2] === Gameboard.arr[5] && Gameboard.arr[2] === Gameboard.arr[8]))) {
                    if (Gameboard.arr[8] === player1.symbol) {
                        player1.playerWins();
                    } else if (Gameboard.arr[8] === player2.symbol) {
                        player2.playerWins();
                    }
            } else if (Gameboard.arr[0] !== "" && Gameboard.arr[1] !== "" && Gameboard.arr[2] !== "" 
                    && Gameboard.arr[3] !== "" && Gameboard.arr[4] !== "" && Gameboard.arr[5] !== ""
                    && Gameboard.arr[6] !== "" && Gameboard.arr[7] !== "" && Gameboard.arr[8] !== "") {
                    console.log("It's a tie!");
            }
            //console.log(Gameboard.arr);
        });
    });*/

})();