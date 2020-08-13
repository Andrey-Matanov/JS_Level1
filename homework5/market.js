// Объявление функций

// addShopRangeToDocument - добавляет ассортимент товаров на страницу

function initializeShopRangeOnDocument() {
    let shopRangeDiv = document.querySelector('.shop-range');
    let shopRangeHeading = document.createElement('h2');
    let shopRangeList = document.createElement('div');

    shopRangeHeading.classList.add('shop-range-heading');
    shopRangeList.classList.add("shop-range-list");

    shopRangeHeading.innerHTML = 'Ассортимент товаров';

    for (let i = 0; i < shopRange.length; i++) {
        let productString = document.createElement('p');
        productString.classList.add('shop-range-product-string');

        productString.innerHTML = '№' + (i + 1) + ': название - ' + shopRange[i].name + '; стоимость - ' + shopRange[i].priceForOne + '.';

        shopRangeList.appendChild(productString);
    }

    shopRangeDiv.appendChild(shopRangeHeading);
    shopRangeDiv.appendChild(shopRangeList);
}

// addBasketToDocument - добавляет корзину на страницу

function initializeBasketOnDocument() {
    let basketDiv = document.querySelector('.basket');
    let basketHeading = document.createElement('h2');
    let basketMain = document.createElement('div');
    let basketList = document.createElement('div');
    let basketPriceP = document.createElement('p');
    let buttonsContainer = document.createElement('div');
    let addProductToBasketButton = document.createElement('button');
    let deleteProductFromBasketButton = document.createElement('button');

    basketHeading.classList.add('basket-heading');
    basketMain.classList.add('basket-main');
    basketList.classList.add('basket-list');
    basketPriceP.classList.add('basket-price-message');
    buttonsContainer.classList.add('buttons-container');
    addProductToBasketButton.classList.add('add-product-button', 'button');
    deleteProductFromBasketButton.classList.add('delete-product-button', 'button');

    basketHeading.innerHTML = 'Корзина';
    basketPriceP.innerText = returnBasketPrice();
    addProductToBasketButton.innerHTML = 'Добавить товар в корзину';
    deleteProductFromBasketButton.innerHTML = 'Удалить товар из корзины';

    addProductToBasketButton.addEventListener('click', addProductToBasket);
    deleteProductFromBasketButton.addEventListener('click', deleteProductFromBasket);


    buttonsContainer.appendChild(addProductToBasketButton);
    buttonsContainer.appendChild(deleteProductFromBasketButton);
    basketMain.appendChild(basketList);
    basketMain.appendChild(buttonsContainer);
    basketDiv.appendChild(basketHeading);
    basketDiv.appendChild(basketMain);

    generateBasketListText();
    document.querySelector('.basket-list').appendChild(basketPriceP);
}

// generateBasketListText - добавляет список товаров в корзину

function generateBasketListText() {
    if (document.querySelector('.basket-list-text') != null) {
        document.querySelector('.basket-list-text').remove();
    }

    if (basket.length == 0) {
        let basketListText = document.createElement('p');

        basketListText.innerHTML = 'Корзина пуста';
        basketListText.classList.add('basket-list-text');

        document.querySelector('.basket-list').appendChild(basketListText);
    } else {
        for (let i = 0; i < basket.length; i++) {
            let basketListText = document.createElement('p');

            basketListText.innerHTML = 'Товар №' + (i + 1) + ': ' + 'название - ' + basket[i].name + ', количество - ' + basket[i].amount + '.';
            basketListText.classList.add('basket-list-text');

            document.querySelector('.basket-list').appendChild(basketListText);
        }
    }
}

// addProductToBasket - функция для кнопки "Добавить товар в корзину"

function addProductToBasket() {
    let msg = prompt('Введите сообщение вида "name amount", где name - название товара, amount - его количество.');

    if (msg == null) {
        return;
    }

    while (!checkMsg(msg)) {
        msg = prompt('Неправильно введенные данные! Попробуйте еще раз! Введите сообщение вида "name amount", где name - название товара, amount - его количество.');

        if (msg == null) {
            return;
        }
    }

    let msgArray = msg.split(' ');
    let name = msgArray[0];
    let amount = parseInt(msgArray[1]);
    let objFound = false;

    for (let good of basket) {
        if (good['name'] == name) {
            good['amount'] += amount;
            if (good['amount'] > 50) {
                alert('В корзине не может быть больше 50 товаров одного типа!');
                good['amount'] = 50;
            }
            objFound = true;
            break;
        }
    }

    if (!objFound) {
        let product = {
            'name': name,
            'amount': amount
        }

        basket.push(product);
    }

    document.querySelector('.basket-list').innerHTML = '';
    let basketListText = generateBasketListText();
    let basketPriceMsg = document.createElement('p');
    basketPriceMsg.classList.add('basket-price-message');
    basketPriceMsg.innerText = returnBasketPrice();
    document.querySelector('.basket-list').appendChild(basketPriceMsg);
}

// deleteProductFromBasket - функция для кнопки "Удалить товар из корзины"

function deleteProductFromBasket() {
    let msg = prompt('Введите сообщение вида "name amount", где name - название товара, amount - его количество.');

    if (msg == null) {
        return;
    }

    while (!checkMsg(msg)) {
        msg = prompt('Неправильно введенные данные! Попробуйте еще раз! Введите сообщение вида "name amount", где name - название товара, amount - его количество.');

        if (msg == null) {
            return;
        }
    }

    let msgArray = msg.split(' ');
    let name = msgArray[0];
    let isGoodInBasket = false;

    for (let good of basket) {
        if (good['name'] == name) {
            isGoodInBasket = true;
        }
    }

    if (isGoodInBasket) {

        let amount = parseInt(msgArray[1]);
        let objFound = false;
        let notEnoughGoods = false;

        for (let good of basket) {
            if (good['name'] == name) {
                if (good['amount'] < amount) {
                    alert('В корзине нет столько товаров этого вида!');
                    notEnoughGoods = true;
                } else {
                    good['amount'] -= amount;
                    objFound = true;
                    break;
                }

            }
        }

        if (!notEnoughGoods) {
            for (let i = 0; i < basket.length; i++) {
                if (basket[i]['amount'] <= 0) {
                    basket.splice(i, 1);
                    break;
                }
            }

            document.querySelector('.basket-list').innerHTML = '';
            let basketListText = generateBasketListText();
            document.querySelector('.basket-price-message');
            let basketPriceMsg = document.createElement('p');
            basketPriceMsg.classList.add('basket-price-message');
            basketPriceMsg.innerText = returnBasketPrice();
            document.querySelector('.basket-list').appendChild(basketPriceMsg);
        }
    } else {
        alert('В корзине нет столько товаров этого вида!');
    }
}

// checkMsg - проверяет введенную команду на корректность

function checkMsg(msg) {
    let msgArray = msg.split(' ');
    let product = msgArray[0];
    let amount = msgArray[1];
    if (msgArray.length != 2) {
        return false;
    }

    let condition1 = false;

    for (let good of shopRange) {
        if (product == good['name']) {
            condition1 = true;
        }
    }

    return condition1 && parseInt(amount) > 0;
}

// returnBasketPrice - подсчитывает стоимость товаров в корзине

function returnBasketPrice() {
    let totalPrice = 0;
    let totalAmount = 0;

    for (let good of basket) {
        let price;

        for (let product of shopRange) {
            if (product['name'] == good['name']) {
                price = product['priceForOne'];
            }
        }

        totalAmount += good['amount'];
        totalPrice += price * good['amount'];
    }

    if (totalPrice == 0) {
        return 'Стоимость товаров в корзине: 0';
    } else {
        return 'В корзине: ' + totalAmount + ' ' + returnCase(totalAmount) + ' на сумму ' + totalPrice + ' рублей.'
    }
}

// Возвращает слово "товар" в правильном падеже

function returnCase(amount) {
    let remainder100 = amount % 100;
    let remainder10 = amount % 10;

    if (remainder100 >= 11 && remainder100 <= 14) {
        return 'товаров';
    }

    switch (remainder10) {
        case 1: {
            return 'товар';
        }
        case 2:
        case 3:
        case 4: {
            return 'товара';
        }
        default: {
            return 'товаров';
        }
    }
}

// Инициализация переменных и запуск функций

// shopRange - ассортимент товаров, представляет из себя массив состоящий из объектов с полями "название" и "цена за один товар"

let shopRange = [
    {
        name: 'Яблоки',
        priceForOne: 10,
    },
    {
        name: 'Картофель',
        priceForOne: 5,
    },
    {
        name: 'Шоколад',
        priceForOne: 50,
    },
    {
        name: 'Молоко',
        priceForOne: 30,
    },
    {
        name: 'Мороженое',
        priceForOne: 25,
    },
]


// basket - корзина, представляет из себя массив, состоящий из объектов с полями "название" и "количество товаров этого вида в корзине"

// Пример:
//
// let basket = [
//     {
//         name: 'Яблоки',
//         amount: 5,
//     },
//     {
//         name: 'Шоколад',
//         amount: 1,
//     },
//     {
//         name: 'Молоко',
//         amount: 2,
//     }
// ]

let basket = [];

initializeShopRangeOnDocument();
initializeBasketOnDocument();