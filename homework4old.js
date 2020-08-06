

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
console.log('Задание 2.');
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

// Задание 3

