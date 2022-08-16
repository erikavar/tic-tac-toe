// adding placeholder to array every time corresponding spot is clicked
const Gameboard = (() => {
    let arr = ["","","","","","","","",""];
   
    const markSpot = document.querySelectorAll(".spot");
    markSpot.forEach((div) => {
        div.addEventListener("click", () => {
            arr.forEach((item, index) => {
                if (div.id === index.toString() && arr[index] === "") {
                    arr[index] = "placeholder";
                }
                return arr;
            });
        });
    });
    return arr;
})();

// factory function for players
const Player = (name, symbol) => {
    const playerWins = () => {
        console.log(`${name} wins!`);
    }
    return { name, symbol, playerWins }
};

// alternating players each turn + checking for wins
const Game = (() => {

    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");

    // use arr from Gameboard to check if even or odd number of marks have been made
    // even? player 1's turn. odd? player 2's turn
    let count = 0;
    let turn;

    const clicked = document.querySelectorAll(".spot");
    clicked.forEach((div) => {
        div.addEventListener("click", () => {
            Gameboard.forEach((item, index) => {
                if (Gameboard[index] !== "") {
                    count += 1;
                }
                return count;
            });
            if (count % 2 === 0) {
                turn = "Player 1";
            } else {
                turn = "Player 2";
            }
            count = 0;

            // whose turn it is will determine which symbol should be placed in the array
            // and which symbol should be displayed on the board
            if (turn === "Player 1") {
                div.textContent = player2.symbol;
                Gameboard.forEach((item, index) => {
                    if (div.id === index.toString()) {
                        Gameboard[index] = player2.symbol;
                    }
                });
            } else if (turn === "Player 2") {
                div.textContent = player1.symbol;
                Gameboard.forEach((item, index) => {
                    if (div.id === index.toString()) {
                        Gameboard[index] = player1.symbol;
                    }
                });
            }

            // check for winner of round
            if (Gameboard[0] === Gameboard[1] && Gameboard[0] === Gameboard[2]) {
                if (Gameboard[0] === player1.symbol) {
                    player1.playerWins();
                } else if (Gameboard[0] === player2.symbol) {
                    player2.playerWins();
                }
            } else if (Gameboard[3] === Gameboard[4] && Gameboard[3] === Gameboard[5]) {
                if (Gameboard[3] === player1.symbol) {
                    player1.playerWins();
                } else if (Gameboard[3] === player2.symbol) {
                    player2.playerWins();
                }
            } else if (Gameboard[6] === Gameboard[7] && Gameboard[6] === Gameboard[8]) {
                if (Gameboard[6] === player1.symbol) {
                    player1.playerWins();
                } else if (Gameboard[6] === player2.symbol) {
                    player2.playerWins();
                }
            } else if (Gameboard[0] === Gameboard[3] && Gameboard[0] === Gameboard[6]) {
                if (Gameboard[0] === player1.symbol) {
                    player1.playerWins();
                } else if (Gameboard[0] === player2.symbol) {
                    player2.playerWins();
                }
            } else if (Gameboard[1] === Gameboard[4] && Gameboard[1] === Gameboard[7]) {
                if (Gameboard[1] === player1.symbol) {
                    player1.playerWins();
                } else if (Gameboard[1] === player2.symbol) {
                    player2.playerWins();
                }
            } else if (Gameboard[2] === Gameboard[5] && Gameboard[2] === Gameboard[8]) {
                if (Gameboard[2] === player1.symbol) {
                    player1.playerWins();
                } else if (Gameboard[2] === player2.symbol) {
                    player2.playerWins();
                }
            } else if (Gameboard[0] === Gameboard[4] && Gameboard[0] === Gameboard [8]) {
                if (Gameboard[0] === player1.symbol) {
                    player1.playerWins();
                } else if (Gameboard[0] === player2.symbol) {ß
                    player2.playerWins();
                }
            } else if (Gameboard[2] === Gameboard[4] && Gameboard[2] === Gameboard [6]) {
                if (Gameboard[2] === player1.symbol) {
                    player1.playerWins();
                } else if (Gameboard[2] === player2.symbol) {
                    player2.playerWins();
                }
            } else if (Gameboard[0] !== "" && Gameboard[1] !== "" && Gameboard[2] !== "" 
                    && Gameboard[3] !== "" && Gameboard[4] !== "" && Gameboard[5] !== ""
                    && Gameboard[6] !== "" && Gameboard[7] !== "" && Gameboard[8] !== "") {
                console.log("It's a tie!");
            }
        });
    });
})();