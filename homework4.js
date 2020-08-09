// Задание 1
console.log('Задание 1.')
console.log('createNumberObject - функция, преобразующая число в объект');

function createNumberObject(number) {
    if (number < 0 || number > 999) {
        console.log('Введите число от 0 до 999.');
        return {};
    } else {
        let ones = number % 10;
        number = (number - ones) / 10;
        let tens = number % 10;
        let hundreds = (number - tens) / 10

        return {
            'единицы': ones,
            'десятки': tens,
            'сотни': hundreds
        }
    }
}

console.log('\n');

// Задание 2
console.log('Задание 2.')
console.log('Практикум. Создание игры. В моей версии игры следующие изменения:\n-Теперь игрок отображается на игровом поле в виде треугольника, треугольник смотрит в ту сторону, в которую он повернут.\n-Новая команда turn_around, чтобы развернуть игрока на 180 градусов.\n-Игровое поле генерируется случайным образом.\n-Вместо ключа теперь терминал, который нужно взломать, проходя игру "Быки и коровы". В случае неудачного взлома, игра будет проиграна.\n-Команда "exit" удалена. Теперь для выхода из игры нужно нажать ESC или "Отмена" в любой момент игры (в т.ч. во время взлома терминала)\n-Игра запускается командой startLabyrinthGame().');

function startLabyrinthGame() {
    alert('Добро пожаловать в игру "Лабиринт". Ваша задача: найти выход.\nУсловные обозначения:\n- "T" - терминал\n- "E" - дверь\n- "=" - стена\n- "▴" - игрок');
    let gameBoard = generateGameBoard(10);
    let player = createPlayer(gameBoard);
    let gameClosed = false;

    var leftDirection = {
        up: "left",
        down: "right",
        left: "down",
        right: "up",
    }

    var rightDirection = {
        up: "right",
        down: "left",
        left: "up",
        right: "down",
    }

    var turnAround = {
        up: "down",
        down: "up",
        left: "right",
        right: "left",
    }

    while (!player.state.exitFound && !gameBoard.gameClosed && !gameBoard.gameLost) {
        renderBoard(gameBoard, player);
        var command = prompt("Введите команду: go/left/right/turn_around. Либо нажмите ESC или отмена для выхода из игры):");

        switch (command) {
            case "go":
                movePlayer(player, gameBoard);
                break;
            case "left":
                player.coords.direction = leftDirection[player.coords.direction];
                break;
            case "right":
                player.coords.direction = rightDirection[player.coords.direction];
                break;
            case "turn_around":
                player.coords.direction = turnAround[player.coords.direction];
                break;
            case null:
                gameBoard.gameClosed = true;
                break;
            default:
                alert("Неизвестная команда!");
        }
    }

    renderBoard(gameBoard, player);
    if (gameClosed || gameBoard.gameClosed) {
        alert('Вы завершили игру');
    } else if (gameBoard.gameLost) {
        alert('Вы не смогли взломать терминал! Игра окончена!');
    } else {
        alert("Вы победили! Игра окончена!");
    }

}

function generateGameBoard(size) {
    // В качестве результата функция возвращает объект вида gameBoard

    let gameBoard = {
        cells: [],
        playerStartCoords: {},
        gameLost: false,
        gameClosed: false,
    };

    // Генерация пустого игрового поля

    for (let i = 0; i < size; i++) {
        gameBoard.cells[i] = [];

        for (let j = 0; j < size; j++) {
            if (i == 0 || i == size - 1 || j == 0 || j == size - 1) {
                gameBoard.cells[i][j] = { type: 'Wall' };
            } else {
                gameBoard.cells[i][j] = { type: 'Empty' };
            }
        }
    }

    // Задаем координаты ключа и выхода

    let terminalCoordX = Math.floor(Math.random() * 8 + 1);
    let terminalCoordY = Math.floor(Math.random() * 8 + 1);
    let exitCoordX = Math.floor(Math.random() * 8 + 1);
    let exitCoordY = Math.floor(Math.random() * 8 + 1);

    gameBoard.cells[terminalCoordY][terminalCoordX] = { type: 'Terminal' };
    gameBoard.cells[exitCoordY][exitCoordX] = { type: 'Exit' };

    // Задаем координаты и направление игрока, в зависимости от координат ключа

    if (terminalCoordX >= 1 && terminalCoordX <= 4) {
        gameBoard.playerStartCoords.x = 8
    } else {
        gameBoard.playerStartCoords.x = 1
    }

    if (terminalCoordY >= 1 && terminalCoordY <= 4) {
        gameBoard.playerStartCoords.y = 8
    } else {
        gameBoard.playerStartCoords.y = 1
    }

    if (gameBoard.playerStartCoords.x == 1) {
        gameBoard.playerStartCoords.direction = 'right';
    } else {
        gameBoard.playerStartCoords.direction = 'left';
    }

    return gameBoard;
}

function createPlayer(gameBoard) {
    return player = {
        coords: {
            x: gameBoard.playerStartCoords.x,
            y: gameBoard.playerStartCoords.y,
            direction: gameBoard.playerStartCoords.direction,
        },
        state: {
            terminalHacked: false,
            exitFound: false,
        }
    }
}

function renderBoard(board, player) {
    for (var i = 0; i < board.cells.length; i++) {
        var line = "";
        for (var j = 0; j < board.cells[i].length; j++) {
            if (i == player.coords.y &&
                j == player.coords.x) {
                switch (player.coords.direction) {
                    case 'up': {
                        line += '▴';
                        break;
                    }
                    case 'right': {
                        line += '▸';
                        break;
                    }
                    case 'down': {
                        line += '▾';
                        break;
                    }
                    case 'left': {
                        line += '◂';
                        break;
                    }
                }
            } else {
                switch (board.cells[i][j].type) {
                    case "Terminal":
                        line += "T";
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
        console.log(twoSymbolsNumber(i + 1) + ' : ' + line);
    }
    console.log('');
}

function twoSymbolsNumber(number) {
    return (number < 10) ? '0' + number : number;
}

function getNewCoords(player) {
    var result = {
        x: player.coords.x,
        y: player.coords.y,
    }

    switch (player.coords.direction) {
        case "up":
            result.y--;
            break;
        case "down":
            result.y++;
            break;
        case "left":
            result.x--;
            break;
        case "right":
            result.x++;
            break;
    }

    return result;
}

function canMove(player, board) {
    var result = true;

    switch (player.coords.direction) {
        case "up": if (player.coords.y == 0 ||
            board.cells[player.coords.y - 1][player.coords.x].type == "Wall") {
            result = false;
        };
            break;
        case "down": if (player.coords.y == board.cells.length - 1 ||
            board.cells[player.coords.y + 1][player.coords.x].type == "Wall") {
            result = false;
        };
            break;
        case "right": if (player.coords.x == board.cells[player.coords.y].length - 1 ||
            board.cells[player.coords.y][player.coords.x + 1].type == "Wall") {
            result = false;
        };
            break;
        case "left": if (player.coords.x == 0 ||
            board.cells[player.coords.y][player.coords.x - 1].type == "Wall") {
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
            case "Terminal":
                let code = startBullsAndCowsGame(board);

                switch (code) {
                    case 0: {
                        board.gameClosed = true;
                        break;
                    }
                    case 1: {
                        board.gameLost = true;
                        break
                    }
                    case 2: {
                        alert("Вы успешно взломали терминал! Дверь теперь открыта!");
                        player.state.terminalHacked = true;
                    }
                }

                break;
            case "Exit":
                if (player.state.terminalHacked) {
                    player.coords.x = newCoords.x;
                    player.coords.y = newCoords.y;
                    player.state.exitFound = true;
                } else {
                    alert("Дверь закрыта! Нужно как-то открыть ее.");
                };
                break;
        }

        player.coords.x = newCoords.x;
        player.coords.y = newCoords.y;
    } else {
        alert("Вы не можете двигаться в данном направлении!");
    }
}

// Быки и коровы

function startBullsAndCowsGame(gameBoard) {
    let randomNumber = generateRandomNumberWithDifferentDigits();
    let randomNumberDigits = generateDigitsArray(randomNumber);
    let lastGuess;
    let attempsAmount = 10;
    let cowsAmount;
    let bullsAmount;
    let gameBreaked = false;

    alert('Для того, чтобы взломать терминал выиграйте в игру "Быки и коровы".\n\nПравила игры: компьютер загадал число от 1000 до 9999 с разными цифрами. После каждой попытки компьютер назовет число коров (количество угаданных цифр, которые присутствуют в загаданном числе, но стоят не на своих местах) и число быков (количество угаданных цифр, которые присутствуют в загаданном числе и стоят на своих местах). Вводить можно только четырехзначные числа.\n\nЧтобы закрыть игру нажмите ESC или "Отмена".');

    while (attempsAmount > 0) {
        let msg = '';
        let cowsBullsMsg;

        if (attempsAmount == 10) {
            msg = 'Количество оставшихся попыток: ' + attempsAmount + '\nЧтобы закрыть игру нажмите ESC или "Отмена".\nВведите число: ';
        } else {
            cowsBullsMsg = 'Вы не угадали! Попробуйте еще раз\nЧтобы закрыть игру нажмите ESC или "Отмена".\n\nВы ввели число: ' + lastGuess + ' . Количество коров: ' + cowsAmount + '. Количество быков: ' + bullsAmount + '. \n';
            msg = cowsBullsMsg + "Количество оставшихся попыток: " + attempsAmount + "\nВведите число: ";
        }

        let nextGuess = prompt(msg);

        if (nextGuess == null) {
            gameBreaked = true;
            break;
        }

        while (nextGuess < 1000 || nextGuess > 9999) {
            nextGuess = prompt("Неправильно введенные данные. Введите четырехзначное число.");
        }

        let guessArray = generateDigitsArray(nextGuess);
        bullsAmount = countBulls(randomNumberDigits, guessArray);
        cowsAmount = countCows(randomNumberDigits, guessArray) - bullsAmount;


        if (nextGuess == randomNumber) {
            attempsAmount = 0;
        }

        lastGuess = nextGuess;
        attempsAmount--;
    }

    if (gameBreaked) {
        return 0;
    } else if (attempsAmount == 0) {
        return 1;
    } else {
        return 2;
    }
}

function countBulls(randomNumberDigits, guessArray) {
    let result = 0;

    for (let i = 0; i < guessArray.length; i++) {
        if (guessArray[i] == randomNumberDigits[i]) {
            result++;
        }
    }

    return result;
}

function countCows(randomNumberDigits, guessArray) {
    let result = 0;

    for (let i = 0; i < guessArray.length; i++) {
        if (randomNumberDigits.includes(guessArray[i])) {
            result++;
        }
    }

    return result;
}

function generateDigitsArray(number) {
    let digitsArray = [];

    while (number > 0) {
        digitsArray.push(number % 10);
        number = Math.floor(number / 10);
    }

    return digitsArray.reverse();
}

function checkNumber(number) {
    let setOfDigits = new Set();

    while (number > 0) {
        let temp = number % 10;
        let setLength = setOfDigits.size;
        setOfDigits.add(temp);

        if (setLength == setOfDigits.size) {
            return false;
        }

        number = Math.floor(number / 10);
    }

    return true;
}

function generateRandomNumberWithDifferentDigits() {
    let randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    while (true) {
        if (checkNumber(randomNumber)) {
            break;
        }
        randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    }

    return randomNumber;
}

console.log('');

// Задание 3
console.log('Задание 3.');
console.log('Игра "Поиск пар". Запускается командой startFindPairsGame().');

// startFindPairsGame - запускает игру "Найди пары"

function startFindPairsGame() {
    alert('Добро пожаловать в игру "Поиск пар".');
    let difficulty = parseInt(prompt('Выберите сложность игры. Введите число от 1 до 4, где\n 1 - легкая сложность\n 2 - средняя сложность\n 3 - высокая сложность\n 4 - экстремальная сложность'));

    while (difficulty < 1 || difficulty > 4 || isNaN(difficulty)) {
        difficulty = parseInt(prompt('Неправильно введенные данные. Попробуйте еще раз.\nВведите число от 1 до 4, где\n 1 - легкая сложность\n 2 - средняя сложность\n 3 - высокая сложность\n 4 - экстремальная сложность'));
    }

    let pairsArray = generatePairsArray(difficulty);

    switch (difficulty) {
        case 1: {
            difficulty = 'легкий';
            break;
        }
        case 2: {
            difficulty = 'средний';
            break;
        }
        case 3: {
            difficulty = 'высокий';
            break;
        }
        case 4: {
            difficulty = 'экстремальный';
            break;
        }
    }

    alert('Вы выбрали ' + difficulty + ' уровень сложности игры. Приятной игры!');

    let isGameFinished = false;
    let isGameClosed = false;
    let pairsFound = 0;
    let currentChosenItems = [];
    let turnCounter = 0;

    while (!isGameFinished && !isGameClosed) {
        let renderedGameField = renderPairsGameField(pairsArray, turnCounter);
        if (pairsFound == pairsArray.length / 2) {
            isGameFinished = true;
        } else if (currentChosenItems.length == 2) {
            let firstItem = currentChosenItems[0];
            let secondItem = currentChosenItems[1];

            if (pairsArray[firstItem].symbol == pairsArray[secondItem].symbol) {
                pairsArray[firstItem].isChosen = false;
                pairsArray[secondItem].isChosen = false;
                pairsArray[firstItem].isFound = true;
                pairsArray[secondItem].isFound = true;
                pairsFound++;
                currentChosenItems = [];
                alert(renderedGameField + '\nВы нашли пару!');
            } else {
                pairsArray[firstItem].isChosen = false;
                pairsArray[secondItem].isChosen = false;
                currentChosenItems = [];
                alert(renderedGameField + '\nПара не найдена!');
            }
        } else {
            let code = pickOneItem(pairsArray, renderedGameField);

            switch (code) {
                case -3: {
                    isGameClosed = true;
                    break;
                }
                case -2: {
                    alert('Этот элемент уже выбран. Попробуйте еще раз!');
                    break;
                }
                case -1: {
                    alert('Этот элемент уже был найден. Попробуйте еще раз!');
                    break;
                }
                default: {
                    currentChosenItems.push(code);
                    turnCounter++;
                }
            }
        }
    }

    if (isGameClosed) {
        alert('Вы завершили игру.');
    } else {
        alert('Поздравляем! Вы завершили игру за ' + turnCounter + ' ходов.');
    }
}

// generatePairsArray - генерация массива, состоящиего из объектов, которые представляют из себя карточки на игровом поле игры

function generatePairsArray(level) {
    let symbolsArray = ['+', ')', '*', '/', '=', '~', '!', '?', '.', ',', '}', ']'];
    let pairsArray = [];
    let itemsAmount;

    switch (level) {
        case 1: {
            itemsAmount = 12;
            break
        }
        case 2: {
            itemsAmount = 16;
            break;
        }
        case 3: {
            itemsAmount = 20;
            break;
        }
        case 4: {
            itemsAmount = 24;
            break;
        }
    }

    for (let i = 0, j = 0; j < itemsAmount; i++, j += 2) {
        pairsArray[j] = getItem(symbolsArray[i], 1, j + 1);
        pairsArray[j + 1] = getItem(symbolsArray[i], 2, j + 2);
    }

    return shuffle(pairsArray);
}

// getItem - генерирует новую карточку

function getItem(symbol, id, number) {
    return {
        symbol,
        id,
        number,
        isChosen: false,
        isFound: false,
    }
}

// shuffle - перемешивает любой массив

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// renderPairsGameField - рендеринг игрового поля

function renderPairsGameField(pairsArray, turnCounter) {
    let resultMsg = ''

    resultMsg += 'Ход № ' + turnCounter + ':\n';
    resultMsg += '      1     2     3     4\n';

    for (let i = 0; i < pairsArray.length / 4; i++) {
        let msg = '' + (i + 1) + '     ';

        for (let j = 0; j < 4; j++) {
            if (pairsArray[4 * i + j].isChosen) {
                msg += pairsArray[4 * i + j].symbol + '    ';
            } else if (pairsArray[4 * i + j].isFound) {
                msg += 'V    ';
            } else {
                msg += '-     ';
            }
        }

        resultMsg += msg + '\n';
    }

    resultMsg += '\n';

    return resultMsg;
}

// pickOneItem - игрок вводит числа, на выходе функция выдает код в соотвествии с полученным результатом выполнения

function pickOneItem(pairsArray, renderedGameField) {
    let itemCoords = prompt(renderedGameField + '\nОткройте элемент. Введите команду вида "a b", где a - номер строки элемента, b - номер столбца элемента.');

    if (itemCoords == null) {
        return -3;
    }

    while (!checkItemData(itemCoords, pairsArray)) {
        itemCoords = prompt(renderedGameField + '\nНеправильно введенные данные. Попробуйте еще раз. Введите команду вида "a b", где a - номер строки элемента, b - номер столбца элемента.');

        if (itemCoords == null) {
            return -3;
        }
    }

    let itemCoordsArray = itemCoords.split(' ').map((item) => parseInt(item));

    let itemNumber = (itemCoordsArray[0] - 1) * 4 + itemCoordsArray[1] - 1;

    if (pairsArray[itemNumber].isChosen) {
        return -2;
    } else if (pairsArray[itemNumber].isFound) {
        return -1;
    } else {
        pairsArray[itemNumber].isChosen = true;
        return itemNumber;
    }
}

// checkItemData - проверка введенных данных на корректность

function checkItemData(itemData, pairsArray) {
    let dataArray = itemData.split(' ').map((item) => parseInt(item));
    let item1 = dataArray[0];
    let item2 = dataArray[1];

    let condition1 = (dataArray.length == 2) && !isNaN(item1) && !isNaN(item2);

    return condition1 && checkIfNumberInRange(item1, 1, pairsArray.length / 4) && checkIfNumberInRange(item2, 1, 4);
}

// Проверяет что число лежит в диапозоне от min до max включительно

function checkIfNumberInRange(number, min, max) {
    return number >= min && number <= max;
}

console.log('');

// Задание 4
console.log('Задание 4.');
console.log('basket - теперь является объектом, содержащий в себе информацию о содержащихся в корзине товарах, а именно их названия и количество. Все функции из задания 3 прошлого дз работают для объекта вида basket из этого задания, например startShopping так же запускает процесс покупки товаров: формирование новой корзины товаров и подсчет стоимости товаров в корзине, и т.д..');

// shopRange - ассортимент товаров, представляет из себя объект, состоящий из названий товаров и соответстующих им стоимостью

let shopRange = {
    'Яблоки': 10,
    'Картофель': 5,
    'Шоколад': 50,
    'Молоко': 30,
    'Мороженое': 25
}

// basket - корзина, представляет из себя объект, состоящий из названий товаров и соответствующим им количеством в корзине

let basket = {
    'Яблоки': 5,
    'Шоколад': 1,
    'Молоко': 2
}

// startShopping - запускает программу работы магазина: создает корзину товаров и подсчитывает стоимость товаров в корзине

function startShopping(shopRange) {
    let basket = newBasket(shopRange);

    if (basket == null) {
        alert('Выход из программы')
    } else if (basket.length == 0) {
        alert('Корзина товаров пуста');
    } else {
        alert('Вы закончили делать покупки.\n\n' + shopRangeToString(shopRange) + '\n' + showBasket(basket) + '\nСтоимость товаров в корзине: ' + countBasketPrice(basket));
    }
}

// shopRangeToString - аналог toString() для объекта shopRange 

function shopRangeToString(shopRange) {
    let stringResult = 'Ассортимент товаров магазина: \n';
    let counter = 1;

    for (let name in shopRange) {
        stringResult += '№' + counter + ': название - ' + name + '; стоимость - ' + shopRange[name] + '.\n';
        counter++;
    }

    return stringResult;
}

// newBasketArray - создает корзину товаров 

function newBasket(shopRange) {
    let basket = {};
    let notfinishedBasket = true;
    let shopRangeString = shopRangeToString(shopRange) + '\n';

    while (notfinishedBasket) {
        let addGoodMsg = 'Чтобы добавить товар(ы) в корзину, введите сообщение вида "add good amount", где good - название товара (вводить нужно так, как записано в ассортименте товаров магазина выше), amount - количество товаров. \nЧтобы удалить товар(ы) из корзины, введите сообщение вида "delete good amount". \nЧтобы закончить делать покупки и посчитать стоимость товаров в корзине введите "finish".\nЧтобы выйти из программы, нажмите "ESC" или "Отмена"';

        let basketMsg = showBasket(basket);
        let addGood = prompt(shopRangeString + basketMsg + '\n' + addGoodMsg);

        if (addGood == null) {
            return null;
        } else if (addGood == 'finish') {
            return basket;
        } else {
            let operationMsgCode = proccessBasketOperation(addGood, basket);
            switch (operationMsgCode) {
                case 0: {
                    alert('Неправильно введенные данные. Попробуйте еще раз.');
                    break;
                }
                case 1: {
                    alert('Товар(ы) успешно добавлен(ы) в корзину.')
                    break;
                }
                case 2: {
                    alert('Товар(ы) успешно удален(ы) из корзины.')
                    break;
                }
                case 3: {
                    alert('В вашей корзине нет товаров такого количества. Попробуйте еще раз.');
                    break;
                }
                case 4: {
                    alert('Такого товара нет в корзине. Попробуйте еще раз.');
                    break;
                }
                case 5: {
                    alert('Вы не добавили ни одного товара в корзину. Попробуйте еще раз');
                    break;
                }
                case 6: {
                    alert('Произошла ошибка. Попробуйте еще раз.');
                }
            }
        }
    }
}

// showBasket - формирует сообщение, описывающее содержимое корзины

function showBasket(basket) {
    if (Object.keys(basket).length == 0) {
        return "Корзина товаров: пусто\n";
    } else {
        let result = 'Корзина товаров:\n';

        for (let good in basket) {
            result += good + " - " + basket[good] + "шт.\n";
        }

        return result;
    }
}

// countBasketPrice - подсчитывает стоимость товаров в корзине

function countBasketPrice(basket) {
    let price = 0;

    for (let good in basket) {
        let priceForOne = shopRange[good];
        let amount = basket[good];
        price += priceForOne * amount;
    }

    return price;
}

// proccessBasketOperation - обрабатывает одну операцию add или delete корзины и выдает соответствующий код после завершения обработки

function proccessBasketOperation(message, basket) {
    let msgArray = message.split(" ");

    if (!checkMsgArrayData(shopRange, msgArray)) {
        return 0;
    }

    let operation = msgArray[0];
    let goodName = msgArray[1];
    let goodAmount = msgArray[2];

    switch (operation) {
        case 'add': {
            if (goodAmount == 0) {
                return 5;
            } else if (goodAmount < 0) {
                return 0;
            }

            if (basket.hasOwnProperty(goodName)) {
                basket[goodName] += goodAmount;
            } else {
                basket[goodName] = goodAmount;
            }

            return 1;
        }

        case 'delete': {
            if (!basket.hasOwnProperty(goodName)) {
                return 4;
            } else if (basket[goodName] < goodAmount) {
                return 3;
            } else {
                basket[goodName] -= goodAmount;

                if (basket[goodName] == 0) {
                    delete basket[goodName];
                }

                return 2;
            }
        }
    }

    return 6;
}

// checkMsgArrayData - проверяет корректность введенной команды корзине

function checkMsgArrayData(shopRange, msgArray) {
    if (msgArray.length != 3) {
        return false;
    }

    let operation = msgArray[0];
    let good = msgArray[1];
    let amount = msgArray[2];

    let condition1 = operation == 'add' || operation == 'delete';
    let condition2 = Object.keys(shopRange).includes(good);
    let condition3 = !isNaN(parseInt(amount));

    return condition1 && condition2 && condition3;
}

console.log('');

// Задание 5
console.log('Задание 5.');
console.log('Объект, который я реализовал в этом задании, имеет все необходимые свойста и методы для того, чтобы работать с корзиной напрямую через объект: можно добавлять или удалять из корзины продукты, можно увеличивать или уменьшать из количество в корзине. Реализовывать возможность добавления новых продуктов в ассортимент магазина мне кажется бессмысленным без использования классов.');

// Возьмем объекты shopRange и basket из предыдущего задания

let shopRangeTask5 = {
    'Яблоки': 10,
    'Картофель': 5,
    'Шоколад': 50,
    'Молоко': 30,
    'Мороженое': 25
}

let basketTask5 = {
    'Яблоки': 5,
    'Шоколад': 1,
    'Молоко': 2
}

// Создадим объект продукта product1 (яблоки), который соответствует объектам shopRange и basket

let product1 = {
    name: 'Яблоки',
    amount: basketTask5[name],
    priceForOne: shopRangeTask5[name],
    totalPrice: this.amount * this.priceForOne,

    addProductsToBasket(newAmount) {
        if (basketTask5.hasOwnProperty(this.name)) {
            basketTask5[this.name] += newAmount;
            this.amount += newAmount;
        } else {
            basketTask5[this.name] = newAmount;
            this.amount = newAmount;
        }

    },

    deleteProductsFromBasket(newAmount) {
        if (basketTask5.hasOwnProperty(this.name)) {
            basketTask[this.name] -= newAmount;

            if (basket[this.name] <= 0) {
                delete basket.name;
                this.amount = 0;
            } else {
                this.amount -= newAmount;
            }
        }
    },
}
