let randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
let guessAmount = 0;
let gameNotFinished = true;

alert("Компьютер загадал число от 1000 до 9999. Попробуйте его отгадать! Если вы хотите завершить игру, нажмите ESC.");
while (gameNotFinished) {
    let nextGuess = prompt("Количество попыток: " + guessAmount + "\nВведите число: ");
    if (nextGuess == randomNumber) {
        alert("Правильно! Вы угадали число с " + ++guessAmount + " попытки!");
        gameNotFinished = false;
    } else if (nextGuess == null) {
      alert("Вы завершили игру");
      break;
    } else if (nextGuess < randomNumber) {
        alert("Загаданное число - больше!");
    } else {
        alert("Загаданое число - меньше!");
    }
    guessAmount++;
}