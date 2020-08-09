// Задание 1
console.log('Задание 1: Выведем массив, состоящий из простых чисел в промежутке от 0 до 100.');

let resultArray = getPrimeNumbers(100);
console.log(resultArray);

// getPrimeNumbers - возвращает простые числа от 2 до max (включительно)

function getPrimeNumbers(max) {
    let currentNumber = 2;
    let resultArray = [];

    while (currentNumber <= max) {
        if (isPrime(currentNumber)) {
            resultArray.push(currentNumber);
        }
        currentNumber++;
    }

    return resultArray;
}

function isPrime(number) {
    if (number == 1 || number == 0) {
        return false;
    } else if (number == 2) {
        return true;
    }

    for (let i = 2; i <= Math.floor(number / 2); i++) {
        if (number % i == 0) {
            return false;
        }
    }

    return true;
}

// Задание 2
console.log('');
console.log('Задание 2: есть сущность корзины. Нужно реализовать функционал подсчета стоимости корзины в зависимости от находящихся в ней товаров.');

// shopRange - ассортимент товаров, представляет из себя объект, состоящий из названий товаров и соответстующих им стоимостью

let shopRange = {
    'Яблоки': 10,
    'Картофель': 5,
    'Шоколад': 50,
    'Молоко': 30,
    'Мороженое': 25
}

// basket - корзина покупателя, представляет из себя массив, состоящий из объектов, каждый из которых предствляет из себя название товара, содержащегося в корзине, и количество соответствующих товаров.

let basket = [{ 'Яблоки': 5 }, { 'Картофель': 10 }, { 'Шоколад': 1 }, { 'Молоко': 2 }];

console.log(showBasket(basket)); // использована функция showBasket из 3 задания

console.log('Стоимость товаров в корзине = ' + countBasketPrice(basket));

// countBasketPrice - подсчитывает стоимость товаров в корзине

function countBasketPrice(basket) {
    let price = 0;

    for (let good of basket) {
        let name = Object.keys(good).pop();
        let amount = Object.values(good).pop();
        price += shopRange[name] * amount;
    }

    return price;
}

// Задание 3
console.log('');
console.log('Задание 3: организуем массив для хранения товаров в корзине и используем функцию countBasketPrice');

console.log('Для создания массива для хранения товаров можно использовать функцию newBasketArray с параметром shopRange. ');
console.log('Также можно запустить функцию startShopping с параметром shopRange, которая создаст корзину товаров и посчитает стоимость товаров в ней.')

// startShopping - запускает программу работы магазина: создает корзину товаров и подсчитывает стоимость товаров в корзине

function startShopping(shopRange) {
    let basket = newBasketArray(shopRange);

    if (basket == null) {
        alert('Выход из программы')
    } else if (basket.length == 0) {
        alert('Корзина товаров пуста');
    } else {
        alert('Вы закончили делать покупки.\n\n' + shopRangeToString(shopRange) + '\n' + showBasket(basket) + '\nСтоимость товаров в корзине: ' + countBasketPrice(basket));
    }
}

// shopRangeToString - аналог toString() для объекта shopRange из 2 задания

function shopRangeToString(shopRange) {
    let stringResult = 'Ассортимент товаров магазина: \n';
    let counter = 1;

    for (let name in shopRange) {
        stringResult += '№' + counter + ': название - ' + name + '; стоимость - ' + shopRange[name] + '.\n';
        counter++;
    }

    return stringResult;
}

// newBasketArray - создает корзину товаров такого же вида, как во 2 задании, и возвращает ее

function newBasketArray(shopRange) {
    let basket = [];
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

            for (let i = 0; i < basket.length; i++) {
                let name = Object.keys(basket[i]).pop();
                if (name == goodName) {
                    basket[i][name] += parseInt(goodAmount);
                    return 1;
                }
            }

            let newGood = {};
            newGood[goodName] = parseInt(goodAmount);
            basket.push(newGood);
            return 1;
        }

        case 'delete': {
            for (let i = 0; i < basket.length; i++) {
                let name = Object.keys(basket[i]).pop();
                if (name == goodName) {
                    if (basket[i][name] < goodAmount) {
                        return 3;
                    } else {
                        basket[i][name] -= goodAmount;
                        if (basket[i][name] == 0) {
                            basket.splice(i, 1);
                        }
                        return 2;
                    }
                }
            }

            return 4;
        }
    }

    return 5;
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

// showBasket - формирует сообщение, описывающее содержимое корзины

function showBasket(basket) {
    if (basket.length == 0) {
        return "Корзина товаров: пусто\n";
    } else {
        let result = 'Корзина товаров:\n';

        for (let good of basket) {
            let name = Object.keys(good).pop();
            let amount = Object.values(good).pop();
            result += name + " - " + amount + "шт.\n";
        }

        return result;
    }
}

// countBasketPrice - продублирована здесь из 2 задания еще раз на всякий случай

function countBasketPrice(basket) {
    let price = 0;

    for (let good of basket) {
        let name = Object.keys(good).pop();
        let amount = Object.values(good).pop();
        price += shopRange[name] * amount;
    }

    return price;
}

// Задание 4
console.log('');
console.log('Задание 4: Выведем с помощью цикла for числа от 0 до 9, не используя тело цикла.');

for (let i = 0; i < 10; console.log(i++)) {
}

// Задание 5
console.log('');
console.log('Задание 5: Пирамида.');

let pyramid = '';

const twoDigitsString = (i) => (i < 10) ? '0' + i : i;

for (let i = 1; i <= 20; i++) {
    pyramid += twoDigitsString(i) + ': ' + 'x'.repeat(i) + '\n\n';
}

console.log(pyramid);

// Игра "Быки и коровы". Моя версия

function startGame() {
    let randomNumber = generateRandomNumberWithDifferentDigits();
    console.log(randomNumber);
    let randomNumberDigits = generateDigitsArray(randomNumber);
    let lastGuess;
    let attempsAmount = 10;
    let guessAmount = 0;
    let cowsAmount;
    let bullsAmount;
    let gameBreaked = false;

    alert('Сыграем в игру "Быки и коровы". Компьютер загадал число от 1000 до 9999 с разными цифрами. Попробуйте его отгадать! После каждой попытки компьютер назовет число коров (одна корова означает, что цифра угадана, а ее позиция — нет) и число быков (один бык означает, что угадана и цифра, и ее позиция). Вводить можно только четырехзначные числа. Если вы хотите завершить игру, нажмите "ESC" или "Отмена".');

    while (attempsAmount > 0) {
        let msg = '';
        let cowsBullsMsg;

        if (attempsAmount == 10) {
            msg = "Количество оставшихся попыток: " + attempsAmount + "\nВведите число: ";
        } else {
            cowsBullsMsg = 'Вы не угадали! Попробуйте еще раз\n\nВы ввели число: ' + lastGuess + ' . Количество коров: ' + cowsAmount + '. Количество быков: ' + bullsAmount + '. \n';
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
        cowsAmount = countCows(randomNumberDigits, guessArray);
        bullsAmount = countBulls(randomNumberDigits, guessArray);

        if (nextGuess == randomNumber) {
            alert("Правильно! Вы угадали число с " + ++guessAmount + " попытки!");
            attempsAmount = 0;
        }

        lastGuess = nextGuess;
        guessAmount++;
        attempsAmount--;
    }

    if (gameBreaked) {
        alert('Вы завершили игру.');
    } else if (attempsAmount == 0) {
        alert('Вы не смогли угадать число. Игра закончена.');
    }
}

// countBulls - подсчет быков

function countBulls(randomNumberDigits, guessArray) {
    let result = 0;

    for (let i = 0; i < guessArray.length; i++) {
        if (guessArray[i] == randomNumberDigits[i]) {
            result++;
        }
    }

    return result;
}

// countCows - подсчет коров

function countCows(randomNumberDigits, guessArray) {
    let result = 0;

    for (let i = 0; i < guessArray.length; i++) {
        if (randomNumberDigits.includes(guessArray[i])) {
            result++;
        }
    }

    return result;
}

// generateDigitsArray - генерирует массив цифр числа

function generateDigitsArray(number) {
    let digitsArray = [];

    while (number > 0) {
        digitsArray.push(number % 10);
        number = Math.floor(number / 10);
    }

    return digitsArray.reverse();
}

// checkNumber - проверяет что у числа нет одинаковых цифр

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

// generateRandomNumberWithDifferentDigits - генерирует случайное число от 1000 до 9999 с разными цифрами

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

// hw4