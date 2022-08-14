// populating board (just "X" for now) and putting marks into an array
const Gameboard = (() => {
    let arr = ["","","","","","","","",""];
   
    const markSpot = document.querySelectorAll(".spot");
    markSpot.forEach((div) => {
        div.addEventListener("click", () => {
            arr.forEach((item, index) => {
                if (div.id === index.toString() && arr[index] === "") {
                    arr[index] = "X";
                }
                return arr;
            });
            div.textContent = "X";
            console.log(arr);
        });;
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

    // array for order, need to insert somthing every time board is clicked
    // then based on whether length is even or odd we can determine whose turn it is
    let playOrderArr = [];

})();