console.log("Задание №4");

// Инициализировали блоки
const input = document.getElementById("input");
const input1 = document.getElementById("input1");

const text = document.getElementById("text");
const text1 = document.getElementById("text1");


// Вешаем слушатель событий на ввод
input.addEventListener("input", () => {
    // Меняем текст в зависимости от числа
    text.innerText = correctСase(input.value, ["Сообщение", "Сообщения", "Сообщений"])
});

// Вешаем слушатель событий на ввод
input1.addEventListener("input", () => {
    // Меняем текст1 в зависимости от числа
    text1.innerText = correctСase(input1.value, ["Пользователь", "Пользователя", "Пользователей"])
});


function correctСase(number, ending){
    // Получаем последнии цифры числа
    let lastNumber = number % 10;
    let lastDecimalNumber = number % 100;

    // Если число заканчивается на 1, но не на 11
    if (lastNumber == 1 && lastDecimalNumber != 11) {
        // Возвращаем первую форму окончания
        return ending[0];
    }
    // Если число заканчивается на 2, 3 или 4, но не на 12, 13 или 14
    else if (lastNumber >= 2 && lastNumber <= 4 && (lastDecimalNumber < 10 || lastDecimalNumber >= 20)) {
        // Возвращаем вторую форму окончания
        return ending[1];
    }
    
    // Все остальные случаи
    else {
        // Возвращаем третью форму окончания
        return ending[2];
    }
}
