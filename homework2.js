// Задание 1
let task1Answer = 'Выражение типа "c = ++a;" означает что, сначала мы увеличиваем значение a на единицу и затем приравниваем значение a к c, ++a - здесь "++" - это префиксный инкремент. "d = b++" означает что, сначала мы приравниваем значение b к d, а затем увеличиваем значение b на единицу, b++ - здесь "++" - это постфиксный инкремент. То же самое относится к оставшимся выражениям.';

alert('Задание 1\n' + task1Answer);

// Задание 2
let task2Answer = 'var a = 2; var x = 1 + (a *= 2); \nЗдесь запись вида "a *= 2" приводится к виду "a = a * 2". Соответсвенно, высчитываем значение a и получаем x = 5'

alert('Задание 2\n' + task2Answer);

// Задание 3
alert('Задание 3');

let firstNum = parseInt(prompt("Введите первое число: "));
let secondNum = parseInt(prompt("Введите второе число: "));

if (firstNum >= 0 && secondNum >= 0) {
    alert("Т.к. оба числа - положительные, выводим их разность: " + (firstNum - secondNum));
} else if (firstNum < 0 && b < 0) {
    alert("Т.к. оба числа - отрицательные, выводим их сумму: " + (firstNum + secondNum));
} else {
    alert("Т.к. одно из чисел отрицательное, а другое - положительное, выводим их произведение: " + (firstNum * secondNum));
}

// Задание 4
alert('Задание 4');

let num = parseInt(prompt("Присвойте a значение в промежутке [0..15]"));

while (num < 0 || num > 15) {
    num = parseInt(prompt("Неправильно введеные данные! Присвойте a значение в промежутке [0..15]"));
}

while (num <= 15) {
    alert(num++);
}

// Задание 5
alert('Задание 5\nОпределяем функции сложения, вычитания, умножения, деления двух чисел');

function numbersAddition(a, b) {
    return a + b;
}

function numbersSubtraction(a, b) {
    return a - b;
}

function numbersMultiplication(a, b) {
    return a * b;
}

function numbersDivision(a, b) {
    return a / b;
}

//Задание 6
alert('Задание 6\nКодируем простейший калькулятор, используя функции из 5 задания');

function mathOperation(arg1, arg2, operation) {
    switch (operation) {
        case "+": {
            return numbersAddition(arg1, arg2);
        }
        case "-": {
            return numbersSubtraction(arg1, arg2);
        }
        case "*": {
            return numbersMultiplication(arg1, arg2);
        }
        case "/": {
            return numbersDivision(arg1, arg2);
        }
    }
}

// Задание 7
let task7answer = 'null == 0 // ' + (null == 0) + '\nОсобенностью типа данных "null" в языке JS, а также "undefined" является то, что если использовать оператор нестрогого сравнения, то они равны только себе и друг другу.'

alert('Задание 7\n' + task7answer);

// Задание 8
alert('Задание 8\nОпределяем функцию возведения числа в степень');

function power(val, pow) {
    if (pow != Math.ceil(pow)) {
        alert('Функция в качестве степени принимает только целые числа');
        return null;
    } else {
        if (pow == 0) {
            return 1;
        } else if (pow < 0) {
            return 1 / power(val, -pow);
        } else if (pow == 1) {
            return val;
        } else {
            return val * power(val, pow - 1);
        }
    }
}

// Моя версия игры "Угадай число".

// // Практикум. Угадай число
// let randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
// let guessAmount = 0;

// alert("Компьютер загадал число. Попробуйте его отгадать!");
// while (true) {
//     let nextGuess = prompt("Количество попыток: " + guessAmount + "\nВведите число: ");
//     if (nextGuess == randomNumber) {
//         alert("Правильно! Вы угадали число с " + ++guessAmount + " попытки!");
//         break;
//     } else if (nextGuess < randomNumber) {
//         alert("Загаданное число - больше!");
//     } else {
//         alert("Загаданое число - меньше!");
//     }
//     guessAmount++;
// }

