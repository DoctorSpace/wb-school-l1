console.log("Задание №2");

// Инициализировали блоки
const btn = document.getElementById("btn");
const input = document.getElementById("input");

// Вешаем слушатель событий на нажатие на кнопку
btn.addEventListener("click", () => {
  // Вывод результата
  alert(checkStrangeNumber(input.value));
});


function checkStrangeNumber(number) {
  // Создаём массив чисел на которые делится number
  let array = [];

  // Записываем в array числа которые делятся без остатка на number
  for (let i = 1; i < number; i++) {
    // Если есть остаток тогда записываем в array
    number % i ? null : array.push(i);
  }

  console.log("множители: ", array);

  // Создаём переменную в которая будет хранить сумму всех элементов массива
  let sum = array.reduce((a, b) => {
    return a + b;
  });

  // Проверяет если сумма равна число -> веруть true
  return sum == number ? true : false;
}

function checkStrangeNumber2(nnumber, current = 1, sum = 0) {
  // Если текущий делитель равен числу n, проверяем равна ли сумма делителей самому числу
  if (current === number) {
    return sum === number;
  }

  // Если число n делится на текущий делитель без остатка, добавляем его к сумме
  if (number % current === 0) {
    sum += current;
  }

  // Рекурсивно вызываем функцию с увеличенным на 1 текущим делителем
  return checkStrangeNumber(number, current + 1, sum);
}
