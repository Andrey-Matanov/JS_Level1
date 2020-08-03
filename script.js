let shopRange = {
    'Яблоки': 10,
    'Картофель': 5,
    'Шоколад': 50,
    'Молоко': 30,
    'Мороженое': 25
}

startShopping(shopRange);

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

function shopRangeToString(shopRange) {
    let stringResult = 'Ассортимент товаров магазина: \n';
    let counter = 1;

    for (let name in shopRange) {
        stringResult += '№' + counter + ': название - ' + name + '; стоимость - ' + shopRange[name] + '.\n';
        counter++;
    }

    return stringResult;
}

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

function countBasketPrice(basket) {
    let price = 0;

    for (let good of basket) {
        let name = Object.keys(good).pop();
        let amount = Object.values(good).pop();
        price += shopRange[name] * amount;
    }

    return price;
}