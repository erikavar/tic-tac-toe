// factory function for players
const Player = (name, symbol) => {
    
    const winnerPopup = document.querySelector(".winnerPopup");
    const winText = document.querySelector(".winText");

    const playerWins = () => {
        setTimeout(() => {
            winnerPopup.classList.add("openWinnerPopup");
            document.querySelector(".winText").textContent = `${name} wins! 🎉`;
        }, 300);
    }

    const playersTied = () => {
        setTimeout(() => {
            document.querySelector(".winnerPopup").classList.add("openWinnerPopup");
            document.querySelector(".winText").textContent = "It's a tie!";
        }, 300);
    }

    return { name, symbol, playerWins, playersTied }
};

const Gameboard = (() => {
    let arr = ["","","","","","","","",""];
   
    const clicked = document.querySelectorAll(".spot");

    const displayTurn = document.querySelector(".turnDisplayer");

    // stop form with player names from submitting (to avoid page refresh)
    document.querySelector(".nameForm").addEventListener("click", function(e) {
        e.preventDefault();
    });

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
        });
    }

    const gameWon = () => { 

        // makes some elements unclickable when the game is won

        const resetterBtn = document.querySelector(".resetter");
        const winnerPopup =  document.querySelector(".winnerPopup");

        resetterBtn.textContent = "PLAY AGAIN";
        resetterBtn.classList.add("noClicksAllowed");

        clicked.forEach((div) => {
            div.classList.add("noClicksAllowed");
        });

        document.querySelector(".close").addEventListener("click", function() {
            winnerPopup.classList.remove("openWinnerPopup");
            resetterBtn.classList.remove("noClicksAllowed");
        });
        
        document.querySelector(".playAgain").addEventListener("click", function() {
            arr = ["","","","","","","","",""];
            clicked.forEach((div) => {
                div.textContent = "";
                div.classList.remove("noClicksAllowed");
            });
            winnerPopup.classList.remove("openWinnerPopup");
            resetterBtn.textContent = "RESET";
            resetterBtn.classList.remove("noClicksAllowed");
            displayTurn.textContent = `${player1.name} starts`;
        });

        // get rid of turn displayer text
        displayTurn.textContent="";

    }

    const playGame = () => {

        let player1;
        let player2;

        //name popup
        document.querySelector(".startGame").addEventListener("click", function() {
            document.querySelector(".namePopup").classList.add("hideNamePopup");
        
            player1 = Player(document.getElementById("player1name").value, "X");
            player2 = Player(document.getElementById("player2name").value, "O");

            displayTurn.textContent = `${player1.name} starts`
        });

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
                    displayTurn.textContent = `${player1.name}'s turn`
                } else {
                    turn = "Player 1";
                    displayTurn.textContent = `${player2.name}'s turn`
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
                        gameWon();
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