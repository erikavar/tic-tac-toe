// factory function for players
const Player = (name, symbol) => {
    
    const announcement = document.querySelector(".winnerPopup");

    const playerWins = () => {
        setTimeout(() => {
            announcement.classList.add("openWinnerPopup");
            document.querySelector(".winText").textContent = `${name} wins! 🎉`;
        }, 300);

        document.querySelector(".resetter").textContent = "PLAY AGAIN";

        document.querySelectorAll(".spot").forEach((div) => {
            div.classList.add("noClicksAllowed");
        });

        document.querySelector(".close").addEventListener("click", function() {
            announcement.classList.remove("openWinnerPopup");
        });

        document.querySelector(".pa").addEventListener("click", function() {
            arr = ["","","","","","","","",""];
            document.querySelectorAll(".spot").forEach((div) => {
                div.textContent = "";
                div.classList.remove("noClicksAllowed");
            });
            announcement.classList.remove("openWinnerPopup");
        });

    }

    const playersTied = () => {
        setTimeout(() => {
            document.querySelector(".winnerPopup").classList.add("openWinnerPopup");
            document.querySelector(".winText").textContent = "It's a tie!";
        }, 300);
        document.querySelector(".resetter").textContent = "PLAY AGAIN";
    }

    return { name, symbol, playerWins, playersTied }
};

const Gameboard = (() => {
    let arr = ["","","","","","","","",""];
   
    const clicked = document.querySelectorAll(".spot");

    // adding placeholder to array every time corresponding spot is clicked
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

        const gameWon = () => {
           //player1.symbol = "";
           //player2.symbol = "";
        }
        
        let count = 0;
        let turn;

        // using array with placeholders to determine whose turn it is
        clicked.forEach((div) => {
            div.addEventListener("click", () => {
                arr.forEach((item, index) => {
                    if (arr[index] !== "") {
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
                if ((turn === "Player 2") && (div.textContent === String.fromCharCode(160) || div.textContent == "")) {
                    div.textContent = player2.symbol;
                    arr.forEach((item, index) => {
                        if (div.id === index.toString() && arr[index] === "placeholder") {
                            arr[index] = player2.symbol;
                        }
                    });
                } else if ((turn === "Player 1") && (div.textContent === String.fromCharCode(160) || div.textContent == "")) {
                    div.textContent = player1.symbol;
                    arr.forEach((item, index) => {
                        if (div.id === index.toString() && arr[index] === "placeholder") {
                            arr[index] = player1.symbol;
                        }
                    });
                }

                // check for winner of round

                if ((arr[0]!=="") && ((arr[0] === arr[1] && arr[0] === arr[2]) 
                    || (arr[0] === arr[3] && arr[0] === arr[6]))) {
                        if (arr[0] === player1.symbol) {
                            player1.playerWins();
                            gameWon();
                        } else if (arr[0] === player2.symbol) {
                            player2.playerWins();
                            gameWon();
                        }
                } else if ((arr[4]!=="") && ((arr[0] === arr[4] && arr[0] === arr[8]) 
                    || (arr[3] === arr[4] && arr[3] === arr[5])
                    || (arr[1] === arr[4] && arr[1] === arr[7])
                    || (arr[2] === arr[4] && arr[2] === arr [6]))) {
                        if (arr[4] === player1.symbol) {
                            player1.playerWins();
                            gameWon();
                        } else if (arr[4] === player2.symbol) {
                            player2.playerWins();
                            gameWon();
                        }
                } else if ((arr[8]!=="") && ((arr[6] === arr[7] && arr[6] === arr[8])
                    || (arr[2] === arr[5] && arr[2] === arr[8]))) {
                        if (arr[8] === player1.symbol) {
                            player1.playerWins();
                            gameWon();
                        } else if (arr[8] === player2.symbol) {
                            player2.playerWins();
                            gameWon();
                        }
                } else if (arr[0] !== "" && arr[1] !== "" && arr[2] !== "" 
                        && arr[3] !== "" && arr[4] !== "" && arr[5] !== ""
                        && arr[6] !== "" && arr[7] !== "" && arr[8] !== "") {
                        player1.playersTied();
                }
            });
        });
    }

    const resetGame = () => {
        arr = ["","","","","","","","",""];
        clicked.forEach((div) => {
            div.textContent = "";
            div.classList.remove("noClicksAllowed");
        });
    }

    return { arr, addPlaceholders, playGame, resetGame };
})();


// game flow
const Game = (() => {

    Gameboard.addPlaceholders();
    Gameboard.playGame();

    let resetBtn = document.querySelector(".resetter")

    resetBtn.addEventListener("click", () => {
        Gameboard.resetGame();
        resetBtn.textContent = "RESET";
    });

})();