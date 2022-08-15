// populating board (just "X" for now) and putting marks into an array
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
const Player = (name, symbol, score) => {
    const playerWins = () => console.log(`${name} wins!`);
    return { name, symbol, score, playerWins }
};

// checking for wins and alternating players each turn
const Game = (() => {

    const player1 = Player("Player 1", "X", 0);
    const player2 = Player("Player 2", "O", 0);

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
                console.log(count);
                return count;
            });
            if (count % 2 === 0) {
                turn = "Player 1";
            } else {
                turn = "Player 2";
            }
            count = 0;
            console.log(turn);

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
            console.log(Gameboard);

            Gameboard.forEach((item, index) => {
                // **** change this - doesn't limit to a row ****
                if (Gameboard[index] === Gameboard[index + 1] && Gameboard[index] === Gameboard [index + 2]) {
                    if (Gameboard[index] === player1.symbol) {
                        player1.playerWins();
                    } else if (Gameboard[index] === player2.symbol) {
                        player2.playerWins();
                    }
                }
            });
        });
    });

    /*const winner = () => {
        if (Gameboard[0] === Gameboard[1] && Gameboard[1] === Gameboard [2]) {
            if (Gameboard[0] === player1.symbol) {
                player1.playerWins();
            } else if (Gameboard[0] === player2.symbol) {
                player2.playerWins();
            }
        }
    };*/


    /*Gameboard.forEach((item, index) => {
        if (Gameboard[index] === "X") {
            count += 1;
        }
        console.log(count);
        return count;
    });
    if (count % 2 === 0) {
        turn = 1;
    } else {
        turn = 2;
    }*/
})();