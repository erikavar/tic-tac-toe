// board with dummy content just to visualize
const Gameboard = (() => {
    let gameBoard = ["X","X","X","X","X","X","X","X","X"];
    return gameBoard;
})();

// populating the board using content from above
// probably going to have to change this, the divs need to already exist so that they can be clicked
const Game = (() => {
    let board = document.getElementById("boardContainer");
    Gameboard.forEach((item, index) => {
        const div = document.createElement("div");
        div.setAttribute("class", "square");
        div.textContent = item;
        board.appendChild(div);
    });
})();

// factory function for players
const Player = (name, score) => {
    return { name, score }
};
