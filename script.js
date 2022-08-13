// board
const Gameboard = (() => {
    let gameBoard = ["","","","","","","","",""];
   

    const markSpot = document.querySelectorAll(".spot");
    markSpot.forEach((div) => {
        div.addEventListener("click", () => {
            Gameboard.forEach((item, index) => {
                /*if (div.id === Gameboard[index] === 1) {
                    Gameboard[1] = "X";
                }*/
                console.log(item[index]);
            });
            div.textContent = "X";
            console.log(gameBoard);
            console.log(div.id);
        });;
    });

    return gameBoard;

})();

// populating the board using content from above
const Game = (() => {
    let board = document.getElementById("boardContainer");
    Gameboard.forEach((item, index) => {
        /*const div = document.createElement("div");
        div.setAttribute("class", "square");
        div.textContent = item;
        board.appendChild(div);*/
    });
})();

// factory function for players
const Player = (name, symbol, score) => {
    return { name, symbol, score }
};
