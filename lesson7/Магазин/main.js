// Идеи для реализации:
// а) При нажатии на картинки, они будут выводится в большем размере

// Шаг № 1: Объявление функций

// addShopRangeToDocument - добавляет ассортимент товаров на страницу

function initializeShopRangeOnDocument() {
    let shopRangeDiv = document.querySelector('.shop-range');
    let htmlString = '';

    htmlString +=
        `
        <h2 class="shop-range-heading heading">Ассортимент товаров</h2>
        <div class="shop-range-list">
        `;

    for (let product of shopRange) {
        htmlString += `
        <div class="shop-range-item">
        <p class="shop-range-item-name">${product['name']}</p>
        <img src="${product['image']}" class="shop-range-item-image">
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

    shopRangeDiv.innerHTML = htmlString;

    document.querySelectorAll('.shop-range-item-add-button').forEach((button) => button.addEventListener('click', addSomeAmountToBasket));
    document.querySelectorAll('.shop-range-item-delete-button').forEach((button) => button.addEventListener('click', deleteSomeAmountFromBasket));
}

// initiateShopRangePrices - инициализирует объект ShopRangePrices

function initiateShopRangePrices() {
    for (let product of shopRange) {
        shopRangePrices.set(product['name'], product['priceForOne']);
    }
}

// initializeBasketOnDocument - создает структуру корзины

function initializeBasketOnDocument() {
    let basketDiv = document.querySelector('.basket');

    let htmlString =
        `
        <h2 class="basket-heading heading">Корзина</h2>
        <div class="basket-list-main"></div>
        `

    basketDiv.innerHTML = htmlString;

    updateBasketList();
}

// updateBasketList - добавляет список товаров в корзину

function updateBasketList() {
    let basketListMain = document.querySelector('.basket-list-main');

    let htmlString =
        `
        <p class="basket-list-text"></p>
        `

    basketListMain.innerHTML = htmlString;

    let basketListText = document.querySelector('.basket-list-text');

    if (basket.length == 0) {
        basketListText.innerText = 'Список товаров: пусто';
    } else {
        let totalAmount = 0;

        basketListMain.innerHTML +=
            `
            <div class="basket-list"></div>
            <p class="basket-price-text"></p>
            `;
        document.querySelector('.basket-list-text').innerText = 'Список товаров';

        console.log(basketListMain.innerHTML);

        let htmlStringProduct = '';

        for (let basketProduct of basket) {
            htmlStringProduct +=
                `
                <div class="basket-list-item">
                    <figure class="list-item-figure">
                        <figcaption class="basket-list-item-name">${basketProduct['name']}</figcaption>
                        <img src="${returnMiniImage(basketProduct['name'])}">
                    </figure>
                    <p class="list-item-text">${basketProduct['amount']} шт.</p>
                    <button class="list-item-delete" name="${basketProduct['name']}">X</button>
                </div>
                `;

            totalAmount += basketProduct['amount'];
        }

        document.querySelector('.basket-list').innerHTML = htmlStringProduct;

        document.querySelector('.basket-price-text').innerText = `Итого: корзине ${totalAmount} ${returnCase(totalAmount)}. Общая стоимость товаров: ${returnBasketPrice()} `;

        document.querySelectorAll('.list-item-delete').forEach((button) => button.addEventListener('click', deleteProductFromBasket));
    }

    localStorage.setItem("basket", JSON.stringify(basket));
}

// returnMiniImage

function returnMiniImage(name) {
    for (let product of shopRange) {
        if (product['name'] == name) return product['image-mini'];
    }
}

// addSomeAmountToBasket - добавляет определенное количество товаров в корзину

function addSomeAmountToBasket(event) {
    let productName = event.target.getAttribute('name');
    let productAmount = parseInt(event.target.parentElement.lastElementChild.value);

    if (productAmount <= 1) {
        event.target.parentElement.lastElementChild.value = 1;
        productAmount = 1;
    } else if (productAmount >= 50) {
        event.target.parentElement.lastElementChild.value = 50;
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

// deleteSomeAmountFromBasket - удаляет определенное количество товаров из корзины

function deleteSomeAmountFromBasket(event) {
    let productName = event.target.getAttribute('name');
    let productAmount = parseInt(event.target.parentElement.lastElementChild.value);

    if (productAmount <= 1) {
        event.target.parentElement.lastElementChild.value = 1;
        productAmount = 1;
    } else if (productAmount >= 50) {
        event.target.parentElement.lastElementChild.value = 50;
        productAmount = 50;
    }

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

function deleteProductFromBasket(event) {
    let productName = event.target.getAttribute('name');

    for (let i = 0; i < basket.length; i++) {
        if (basket[i]['name'] = productName) {
            basket.splice(i, 1);
            break;
        }
    }

    event.target.parentElement.remove();

    updateBasketList();
}

// returnBasketPrice - подсчитывает стоимость товаров в корзине

function returnBasketPrice() {
    return basket.reduce((totalPrice, good) => totalPrice + good['amount'] * shopRangePrices.get(good['name']), 0);
}

// returnCase - Возвращает слово "товар" в правильном падеже

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

// Шаг № 2: Инициализация переменных и запуск функций

// shopRange - ассортимент товаров, представляет из себя массив состоящий из объектов с полями "название", "цена за один товар" и "путь к картинке товара";

let shopRange = [
    {
        name: 'Яблоки',
        priceForOne: 10,
        image: 'assets/apple.jpg',
        'image-mini': 'assets/apple-mini.jpg',
    },
    {
        name: 'Картофель',
        priceForOne: 5,
        image: 'assets/potato.jpg',
        'image-mini': 'assets/potato-mini.jpg',
    },
    {
        name: 'Шоколад',
        priceForOne: 50,
        image: 'assets/chocolate.jpg',
        'image-mini': 'assets/chocolate-mini.jpg',
    },
    {
        name: 'Молоко',
        priceForOne: 30,
        image: 'assets/milk.jpg',
        'image-mini': 'assets/milk-mini.jpg',

    },
    {
        name: 'Мороженое',
        priceForOne: 25,
        image: 'assets/ice-cream.jpg',
        'image-mini': 'assets/ice-cream-mini.jpg',
    },
]

// shopRangePrices - объект вида Map, который хранит название товара и его стоимость

let shopRangePrices = new Map();
initiateShopRangePrices();

// basket - корзина, представляет из себя массив, состоящий из объектов с полями "название" и "количество товаров этого вида в корзине". В случае, если в localStorage уже есть массив basket, то в документе именно он, иначе basket будет пустым массивом. 

let basket;

if (localStorage.hasOwnProperty('basket')) {
    basket = JSON.parse(localStorage.getItem('basket'));
} else {
    basket = [];
}

initializeShopRangeOnDocument();
initializeBasketOnDocument();