console.log("Задание №1");

// Инициализировали блоки
const btn = document.getElementById("btn");
const input = document.getElementById("input");

// Вешаем слушатель событий на нажатие на кнопку
btn.addEventListener("click", () => {
  // Вывод результата
  alert(checkPalindrome(input.value));
});

function checkPalindrome(text) {
  // Проверка на наличие текста
  if (text) {
    // Запишем текст маленькими буквами
    let loverText = text.toLowerCase();
    // Запишем текст без пробелов
    let LowNoSpaceText = loverText.replace(/\s/g, "");
    // Запишем длину строки
    let lengthText = LowNoSpaceText.length;

    // Задаём булевую переменную для выдачи результата
    let isPalindrome = true;

    // Если длинна строки нечётная, тогда убираем центральный элемент
    if (lengthText % 2 != 0) {
      // Находим центр
      let center = Math.floor(lengthText / 2, 2);
      // Удаляем центральный элемент
      LowNoSpaceText = LowNoSpaceText.slice(0, center) + LowNoSpaceText.slice(center + 1);
      // Меняем длинну строки
      lengthText = LowNoSpaceText.length;
    }

    // Найдём половину
    let part = lengthText / 2;

    // Пройдёмся по тексту
    for (let index = 0; index < part; index++) {
      // сравниваем первую часть со второй частью (1-ый элемент с последним, 2-ой с последним -1)
      isPalindrome =
        LowNoSpaceText[index] == LowNoSpaceText[lengthText - 1 - index];
      // Если Не сходятся значения, то функция прекращает работу
      if (!isPalindrome) {
        return false;
      }
    }

    // Вывод результата
    return isPalindrome;
  } else {
    // поле текста пустое
    return "введите текст";
  }
}


function checkPalindrome2(text) {
  // Запишем текст маленькими буквами
  let loverText = text.toLowerCase();
  // Запишем текст без пробелов
  let LowNoSpaceText = loverText.replace(/\s/g, "");

  // Переворачиваем текст и сравниваем его с изначальным
  if (LowNoSpaceText == LowNoSpaceText.split("").reverse().join("")) {
    return true;
  } else {
    return false;
  }
}
