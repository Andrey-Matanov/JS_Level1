addChessboard("chessboard#1");
putChessPiecesIntoChessBoard("chessboard#1");

function addChessboard(chessBoardId) {

    // Объявление переменных

    let heading = document.createElement('h1');
    let chessboard = document.createElement('div');
    let letters = document.createElement('div');
    let numbers = document.createElement('div');
    let board = document.createElement('div');

    // Инициализация переменных

    heading.innerText = 'Шахматная доска';

    for (let i = 0; i < 8; i++) {
        let p = document.createElement('p');
        p.innerText = String.fromCharCode(65 + i);

        letters.appendChild(p);
    }

    for (let i = 8; i > 0; i--) {
        let p = document.createElement('p');
        p.innerText = i;

        numbers.appendChild(p);
    }

    for (let i = 0; i < 64; i++) {
        let chessCell = document.createElement('div');
        let chessCellText = document.createElement('p');

        chessCellText.classList.add('chess-cell-text');

        chessCell.classList.add('chess-cell');



        if ((i % 16 < 8 && i % 2 == 1) || (i % 16 >= 8 && i % 2 == 0)) {
            chessCell.classList.add('black-cell');
        } else {
            chessCell.classList.add('white-cell');
        }

        chessCell.appendChild(chessCellText);
        board.appendChild(chessCell);
    }

    // Присвоение элементам классов

    heading.classList.add('main-heading');
    chessboard.classList.add('chessboard');
    letters.classList.add('letters');
    numbers.classList.add('numbers');
    board.classList.add('board');

    // Создание структуры

    chessboard.appendChild(letters);
    chessboard.appendChild(numbers);
    chessboard.appendChild(board);
    chessboard.id = chessBoardId;

    // Добавляем полученную структуру элементов на страницу

    document.querySelector('body').appendChild(heading);
    document.querySelector('body').appendChild(chessboard);
}

function putChessPiecesIntoChessBoard(chessBoardId) {
    let chessBoard = document.getElementById(chessBoardId);

    let board = chessBoard.children[2].children;

    for (let i = 0; i < board.length; i++) {
        chessCellText = board[i].firstChild;

        switch (i) {
            case 0:
            case 7: {
                chessCellText.innerText = '♜';
                break;
            }
            case 1:
            case 6: {
                chessCellText.innerText = '♞';
                break;
            }
            case 2:
            case 5: {
                chessCellText.innerText = '♝';
                break;
            }
            case 3: {
                chessCellText.innerText = '♛';
                break;
            }
            case 4: {
                chessCellText.innerText = '♚';
                break;
            }
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15: {
                chessCellText.innerText = '♟︎';
                break;
            }
            case 63:
            case 56: {
                chessCellText.innerText = '♖';
                break;
            }
            case 62:
            case 57: {
                chessCellText.innerText = '♘';
                break;
            }
            case 61:
            case 58: {
                chessCellText.innerText = '♗';
                break;
            }
            case 59: {
                chessCellText.innerText = '♕';
                break;
            }
            case 60: {
                chessCellText.innerText = '♔';
                break;
            }
            case 55:
            case 54:
            case 53:
            case 52:
            case 51:
            case 50:
            case 49:
            case 48: {
                chessCellText.innerText = '♙';
                break;
            }
        }
    }
}