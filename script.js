const board = ["", "", "", "", "", "", "", "", ""];
const humanPlayer = "X";
const cpuPlayer = "O";
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let currentPlayer = humanPlayer;
const boxes = document.querySelectorAll(".box");

function main() {
    boxes.forEach((box, index) => {
        box.addEventListener("click", () => {
            if (board[index] === "") {
                board[index] = humanPlayer;
                box.textContent = humanPlayer;
                box.style.color = "#000";
                currentPlayer = cpuPlayer;
                if (!checkWin()) {
                    setTimeout(cpuMove, 300);
                }
            }
        });
    });
}

function cpuMove() {
    let emptyBoxes = [];
    boxes.forEach((box, index) => {
        if (board[index] === "") {
            emptyBoxes.push(index);
        }
    });
    const randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    board[randomIndex] = cpuPlayer;
    boxes[randomIndex].textContent = cpuPlayer;
    // boxes[randomIndex].style.color = "#000";
    currentPlayer = humanPlayer;
    checkWin();
}

function checkWin() {
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (board[a] === board[b] && board[b] === board[c] && board[a] !== "") {
            endGame(board[a] === humanPlayer ? "You win!" : "CPU wins!");
            return true;
        }
    }
    if (!board.includes("")) {
        endGame("It's a draw!");
        return true;
    }
    return false;
}

function endGame(message) {
    setTimeout(() => {
        alert(message);
        board.fill("");
        boxes.forEach((box) => {
            box.textContent = "";
        });
        currentPlayer = humanPlayer;
    }, 100);
}

main();
// function reset() {
//     winBoxesIds = [];
//     boxes.forEach((val, index) => {
//         boxes[board] = null;
//     })
// }