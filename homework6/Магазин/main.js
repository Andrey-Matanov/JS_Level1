// Объявление функций

// addShopRangeToDocument - добавляет ассортимент товаров на страницу

function initializeShopRangeOnDocument_2() {
    let shopRangeDiv = document.querySelector('.shop-range');
    let htmlString = '';

    htmlString +=
        `
        <h2 class="shop-range-heading">Ассортимент товаров</h2>
        <div class="shop-range-list">
        `;

    for (let product of shopRange) {
        htmlString += `
        <div class="shop-range-item">
        <p class="shop-range-item-name">${product['name']}</p>
        <img src="${product['src']}" class="shop-range-item-image">
        <p class="shop-range-item-price">Цена за один товар: ${product['priceForOne']}.</p>
        <div class="shop-range-item-buttons">
            <button name="${product['name']}" class="shop-range-item-add-button button">
                Добавить товар(ы) в корзину
                </button>
            <p class="shop-range-item-buttons-text">
                Количество товаров, которое вы хотите добавить или удалить:
                </p>
            <button name="${product['name']}" class="shop-range-item-delete-button button">
                Удалить товар(ы) из корзины
                </button>
            <input type="number" value="1" min="1" max="50" class="shop-range-item-amount-button button">
            </div>
        </div>
        `
    }

    htmlString += `</div>`;

    shopRangeDiv.innerHTML = htmlString;

    let buttonsContainers = document.querySelectorAll('.shop-range-item-buttons');

    for (let buttonsContainer of buttonsContainers) {
        buttonsContainer.children[0].addEventListener('click', addProductToBasket);
        buttonsContainer.children[2].addEventListener('click', deleteProductFromBasket);
    }
}

function initializeBasketOnDocument_2() {

}

function initializeShopRangeOnDocument() {
    let shopRangeDiv = document.querySelector('.shop-range');
    let shopRangeHeading = document.createElement('h2');
    let shopRangeList = document.createElement('div');

    shopRangeHeading.classList.add('shop-range-heading');
    shopRangeList.classList.add("shop-range-list");

    shopRangeHeading.innerHTML = 'Ассортимент товаров';

    for (let product of shopRange) {
        let shopRangeItem = document.createElement('div');
        let shopRangeItemName = document.createElement('p');
        let shopRangeItemImage = document.createElement('img');
        let shopRangeItemPrice = document.createElement('p');
        let shopRangeItemButtonsDiv = document.createElement('div');
        let shopRangeItemButtonsDivText = document.createElement('p');
        let shopRangeItemAddProductButton = document.createElement('button');
        let shopRangeItemDeleteProductButton = document.createElement('button');
        let shopRangeItemAmountButton = document.createElement('input');

        shopRangeItemName.innerText = product['name'];
        shopRangeItemImage.setAttribute('src', product['src']);
        shopRangeItemPrice.innerText = `Цена за один товар: ${product['priceForOne']}.`;
        shopRangeItemButtonsDivText.innerText = 'Количество товаров, которое вы хотите добавить или удалить:';
        shopRangeItemAddProductButton.innerText = 'Добавить товар(ы) в корзину';
        shopRangeItemAddProductButton.setAttribute('name', product['name']);
        shopRangeItemAddProductButton.setAttribute('title', 'В окне количества товаров введите число от 1 до 50');
        shopRangeItemAddProductButton.addEventListener('click', addProductToBasket);
        shopRangeItemDeleteProductButton.innerText = 'Удалить товар(ы) из корзины';
        shopRangeItemDeleteProductButton.setAttribute('name', product['name']);
        shopRangeItemDeleteProductButton.setAttribute('title', 'В окне количества товаров введите число от 1 до 50');
        // shopRangeItemDeleteProductButton.addEventListener('click', deleteProductFromBasket);
        shopRangeItemDeleteProductButton.onclick = deleteProductFromBasket;
        shopRangeItemAmountButton.setAttribute('type', 'number');
        shopRangeItemAmountButton.setAttribute('title', 'Введите число от 1 до 50');
        shopRangeItemAmountButton.setAttribute('value', 1);
        shopRangeItemAmountButton.setAttribute('min', 1);
        shopRangeItemAmountButton.setAttribute('max', 50);

        shopRangeItem.classList.add('shop-range-item');
        shopRangeItemName.classList.add('shop-range-item-name');
        shopRangeItemImage.classList.add('shop-range-item-image');
        shopRangeItemPrice.classList.add('shop-range-item-price');
        shopRangeItemButtonsDiv.classList.add('shop-range-item-buttons');
        shopRangeItemButtonsDivText.classList.add('shop-range-item-buttons-text');
        shopRangeItemAddProductButton.classList.add('shop-range-item-add-button', 'button');
        shopRangeItemDeleteProductButton.classList.add('shop-range-item-delete-button', 'button');
        shopRangeItemAmountButton.classList.add('shop-range-item-amount-button', 'button');

        shopRangeItem.appendChild(shopRangeItemName);
        shopRangeItem.appendChild(shopRangeItemImage);
        shopRangeItem.appendChild(shopRangeItemPrice);
        shopRangeItemButtonsDiv.appendChild(shopRangeItemAddProductButton);
        shopRangeItemButtonsDiv.appendChild(shopRangeItemButtonsDivText);
        shopRangeItemButtonsDiv.appendChild(shopRangeItemDeleteProductButton);
        shopRangeItemButtonsDiv.appendChild(shopRangeItemAmountButton);
        shopRangeItem.appendChild(shopRangeItemButtonsDiv);
        shopRangeList.appendChild(shopRangeItem);
    }

    shopRangeDiv.appendChild(shopRangeHeading);
    shopRangeDiv.appendChild(shopRangeList);
}

// addBasketToDocument - добавляет корзину на страницу

function initializeBasketOnDocument() {
    let basketDiv = document.querySelector('.basket');
    let basketHeading = document.createElement('h2');
    let basketListMain = document.createElement('div');

    basketHeading.classList.add('basket-heading');
    basketListMain.classList.add('basket-list-main');

    basketHeading.innerHTML = 'Корзина';

    basketDiv.appendChild(basketHeading);
    basketDiv.appendChild(basketListMain);

    updateBasketList()
}

// updateBasketList - добавляет список товаров в корзину

function updateBasketList() {
    let basketListMain = document.querySelector('.basket-list-main');
    basketListMain.innerHTML = '';

    let basketListText = document.createElement('p');
    let basketList = document.createElement('div');
    let basketPriceText = document.createElement('p');

    basketListText.classList.add('basket-list-text');
    basketList.classList.add('basket-list');
    basketPriceText.classList.add('basket-price-text');

    if (basket.length == 0) {
        basketListText.innerText = 'Список товаров: пусто';

        basketListMain.appendChild(basketListText);

    } else {
        let totalAmount = 0;

        basketListText.innerText = 'Список товаров:';

        for (let product of basket) {
            let basketListItem = document.createElement('p');
            basketListItem.classList.add('basket-list-item');
            basketListItem.innerText = `${product['name']} : ${product['amount']} шт.`;

            totalAmount += product['amount'];

            basketList.appendChild(basketListItem);
        }

        basketPriceText.innerText = `В корзине ${totalAmount} ${returnCase(totalAmount)}.Общая стоимость товаров: ${returnBasketPrice()} `;

        basketListMain.appendChild(basketListText);
        basketListMain.appendChild(basketList);
        basketListMain.appendChild(basketPriceText);
    }
}

// addProductToBasket

function addProductToBasket(event) {
    let productName = event.target.getAttribute('name');
    let productAmount = parseInt(event.target.parentElement.lastElementChild.value);

    if (productAmount > 50) {
        productAmount = 50;
    }

    if (isNaN(productAmount) || productAmount < 1 || productAmount > 50) {
        return;
    }

    let productFound = false;

    for (let product of basket) {
        if (product['name'] == productName) {
            product['amount'] += productAmount;
            if (product['amount'] > 50) {
                product['amount'] = 50;
            }
            productFound = true;
            break;
        }
    }

    if (!productFound) {
        basket.push({
            name: productName,
            amount: productAmount
        })
    }

    updateBasketList();
}

// deleteProductFromBasket

function deleteProductFromBasket(event) {
    let productName = event.target.getAttribute('name');
    let productAmount = parseInt(event.target.parentElement.lastElementChild.value);

    for (let i = 0; i < basket.length; i++) {
        if (basket[i]['name'] == productName) {
            basket[i]['amount'] -= productAmount;

            if (basket[i]['amount'] <= 0) {
                basket.splice(i, 1);
            }
        }
    }

    updateBasketList();
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

    return totalPrice;
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
        src: 'assets\\apple.jpg',
    },
    {
        name: 'Картофель',
        priceForOne: 5,
        src: 'assets/potato.jpg',
    },
    {
        name: 'Шоколад',
        priceForOne: 50,
        src: 'assets/chocolate.jpg',
    },
    {
        name: 'Молоко',
        priceForOne: 30,
        src: 'assets/milk.jpg',

    },
    {
        name: 'Мороженое',
        priceForOne: 25,
        src: 'assets/ice-cream.jpg',
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

// initializeShopRangeOnDocument();
// initializeBasketOnDocument();

initializeShopRangeOnDocument_2();
initializeBasketOnDocument();