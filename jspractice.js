// // Сумма цифр числа

// let number = prompt('Введите число: ');
// let temp = number
// let result = 0;

// while (temp > 0) {
//     result += temp % 10;
//     temp = Math.floor(temp / 10);
// }

// alert("Сумма цифр числа " + number + " = " + result);

// // Дни недели

// let obj = {
//     ru: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
//     en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Monday'],
// }

// let langNum = Math.floor(Math.random() * 2);
// let lang;
// if (langNum == 0) {
//     lang = 'ru';
// } else {
//     lang = 'en';
// }
// let day = Math.floor(Math.random() * 7);


// alert(obj[lang][day]);

// http://old.code.mu/tasks/javascript/base/rabota-s-konstrukciyami-if-else-switch-case-v-javascript.html

// reverseWords("This is an example!");

reverseWords("This is an example!");

function reverseWords(str) {
    return str.split(" ").map(element => {
        element.split("").reverse();
        element.push(" ");
        element.join("");
    }).join("");
}
