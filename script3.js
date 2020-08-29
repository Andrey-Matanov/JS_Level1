let randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
let guessAmount = 0;

alert("Компьютер загадал число. Попробуйте его отгадать!");
while (true) {
    let nextGuess = prompt("Количество попыток: " + guessAmount + "\nВведите число: ");
    if (nextGuess == randomNumber) {
        alert("Правильно! Вы угадали число с " + ++guessAmount + " попытки!");
        break;
    } else if (nextGuess < randomNumber) {
        alert("Загаданное число - больше!");
    } else {
        alert("Загаданое число - меньше!");
    }
    guessAmount++;
}