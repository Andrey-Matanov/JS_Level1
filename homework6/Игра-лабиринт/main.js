var gameBoard = {
    cells : [],
    startCoords: {
        x: 0,
        y: 0,
        direction: "Up"
    }
}

var player = {
    coords: {
        x: 0,
        y: 0,
        direction: "Up",
    },
    state: {
        haveKey: false,
        exitFound: false,
    }
}

var BOARD = ["==========",
             "=        =",
             "=  K     =",
             "=        =",
             "=        =",
             "=     E  =",
             "=        =",
             "=        =",
             "=        =",
             "=========="];
var STARTPOSITION = {
    x: 1,
    y: 8,
    direction: "Right"
}

function log(text) {
    messages.innerText = text + "\n" + messages.innerText;
}

function initBoard(board, startPosition) {
    gameBoard.element = document.getElementById("board");
    gameBoard.cells = [];
    for (var i = 0; i<board.length; i++) {
        gameBoard.cells[i] = [];
        for (var j = 0; j<board[i].length; j++) {
            var cell = document.createElement("div");
            cell.classList.add("cell", "fa");
            switch (board[i][j]) {
                case "K" :
                    gameBoard.cells[i][j] = { type: "Key", element: cell };
                    cell.classList.add("fa-key");
                    break;
                case "E" :
                    gameBoard.cells[i][j] = { type: "Exit", element: cell };
                    cell.classList.add("fa-sign-in");
                    break;
                case " " :
                    gameBoard.cells[i][j] = { type: "Empty", element: cell };
                    break;
                default:
                    gameBoard.cells[i][j] = { type: "Wall", element: cell };
                    cell.classList.add("fa-bars");
            }
            gameBoard.element.appendChild(cell);
        }
    }
    gameBoard.startCoords.x = startPosition.x;
    gameBoard.startCoords.y = startPosition.y;
    gameBoard.startCoords.direction = startPosition.direction;
    gameBoard.cells[startPosition.y][startPosition.x].element.classList.add("fa-child");
}

function initPlayer(board) {
    player.coords.x = board.startCoords.x;
    player.coords.y = board.startCoords.y;
    player.coords.direction = board.startCoords.direction;
    player.state.haveKey = false;
    player.state.exitFound = false;
}

function renderBoard(board) {
    for (var i = 0; i<board.cells.length; i++) {
        var line = "";
        for (var j = 0; j<board.cells[i].length; j++) {
            if (i == player.coords.y &&
                j == player.coords.x) {
                line += "@";
            } else {
                switch (board.cells[i][j].type) {
                    case "Key":
                        line += "K";
                        break;
                    case "Exit":
                        line += "E";
                        break;
                    case "Wall":
                        line += "=";
                        break;
                    case "Empty":
                        line += " ";
                        break;
                }
            }
        }
        console.log(i + " : " + line);
    }
}

function getNewCoords(player) {
    var result = {
        x: player.coords.x,
        y: player.coords.y,
    }

    switch (player.coords.direction) {
        case "Up": 
            result.y--;
            break;
        case "Down": 
            result.y++;
            break;
        case "Left": 
            result.x--;
            break;
        case "Right": 
            result.x++;
            break;
    }

    return result;
}

function canMove(player, board) {
    var result = true;
    
    switch (player.coords.direction) {
        case "Up" : if (player.coords.y == 0 ||
                    board.cells[player.coords.y-1][player.coords.x].type == "Wall") {
                        result = false;
                    };
                break;
        case "Down" : if (player.coords.y == board.cells.length-1 ||
                     board.cells[player.coords.y+1][player.coords.x].type == "Wall") {
                        result = false;
                    };
                break;
        case "Right" : if (player.coords.x == board.cells[player.coords.y].length-1 ||
                    board.cells[player.coords.y][player.coords.x+1].type == "Wall") {
                       result = false;
                   };
               break;
        case "Left" :  if (player.coords.x == 0 ||
            board.cells[player.coords.y][player.coords.x-1].type == "Wall") {
               result = false;
           };
       break;
    }

    return result;
}

function movePlayer(player, board) {
    if (canMove(player, board)) {
        var newCoords = getNewCoords(player);
        
        switch (board.cells[newCoords.y][newCoords.x].type) {
            case "Key":
                player.state.haveKey = true;
                document.getElementById("haveKey").classList.toggle("fa-key");
                log("Вы нашли ключ! Ищите выход!");
                break;
            case "Exit":
                if (player.state.haveKey) {
                    log("Вы выиграли!");
                    player.state.exitFound = true;
                } else {
                    log("Вы нашли выход, но у вас нет ключа!");
                };
                break;                
        }
        board.cells[player.coords.y][player.coords.x].element.classList.remove("fa-child");
        player.coords.x = newCoords.x;
        player.coords.y = newCoords.y;
        board.cells[player.coords.y][player.coords.x].element.classList.add("fa-child");
    } else {
        log("Вы не можете двигаться в данном направлении!");
    }
}

var messages = document.getElementById("messages");

initBoard(BOARD, STARTPOSITION);
initPlayer(gameBoard);

var leftDirection = {
    Up: "Left",
    Down: "Right",
    Left: "Down",
    Right: "Up",
}

var rightDirection = {
    Up: "Right",
    Down: "Left",
    Left: "Up",
    Right: "Down",
}

function moveHandler() {
    movePlayer(player, gameBoard);
    console.log(JSON.stringify(player));
}

function leftHandler() {
    player.coords.direction = leftDirection[player.coords.direction]; 
    console.log(JSON.stringify(player));
}

function rightHandler() {
    player.coords.direction = rightDirection[player.coords.direction]; 
    console.log(JSON.stringify(player));
}

document.getElementById("leftButton").onclick = leftHandler;
document.getElementById("goButton").onclick = moveHandler;
document.getElementById("rightButton").onclick = rightHandler;

// messages.innerText = "Игра окончена\n" + messages.innerText;
