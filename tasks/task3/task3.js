console.log("Задание №3");

// Инициализировали блоки
const btn = document.getElementById("btn");
const input = document.getElementById("input");
const btn1 = document.getElementById("btn1");
const input1 = document.getElementById("input1");
const btn2 = document.getElementById("btn2");
const input2 = document.getElementById("input2");
const btn3 = document.getElementById("btn3");
const input3 = document.getElementById("input3");

// Вешаем слушатель событий на нажатие на кнопки 1
btn.addEventListener("click", () => {
  alert(MathX.fibonacciN(input.value));
});

// Вешаем слушатель событий на нажатие на кнопки 2
btn1.addEventListener("click", () => {
  alert(MathX.fibonacciSeries(input1.value));
});

// Вешаем слушатель событий на нажатие на кнопки 3
btn2.addEventListener("click", () => {
  alert(MathX.orderPrime(input2.value));
});

// Вешаем слушатель событий на нажатие на кнопки 3
btn3.addEventListener("click", () => {
  alert(MathX.primeSeries(input3.value));
});

// Создаем объект функций для работы с математикой
const MathX = {
  // ---- Вычисление N-го числа в ряду Фибоначчи
  fibonacciN: function (n) {
    // Инициализация первых двух чисел Фибоначчи
    let current = 0
    let next = 1
    
    for (let i = 0; i < n; i++) {
      // Обновляем current и next, перемещая их в последовательности Фибоначчи
      [current, next] = [next, current + next];
    }
    return current;
  },

  // ---- Функция для получения последовательности Фибоначчи до n
  fibonacciSeries: function (num) {
    // Создаем пустой массив для последовательности фибоначи
    let series = [];
    // Инициализация первых двух чисел Фибоначчи
    let current = 0
    let next = 1

    while (current <= num) {
      // Добавляем current в последовательность
      series.push(current);
      // Обновляем current и next, соответственно с последовательностью Фибоначчи
      [current, next] = [next, current + next];
    }
    return series;
  },

  //  ----  Функция для получения n-го простого числа
  orderPrime: function (n) {
    // count - Счетчик для отслеживания найденных простых чисел
    // num - Начинаем с первого простого числа
    let [count, num] = [0, 2];

    // Пока не найдем n простых чисел
    while (count < n) {
      // Если число простое, то увеличиваем счетчик
      if (MathX.isPrime(num)) {
        count++;
      }
      //Переходим к следующему числу
      if (count < n) {
        num++;
      }
    }
    return num;
  },

  // ---- Функция для получения всех простых чисел до n
  primeSeries: function (limit) {
    // Массив для хранения простых чисел.
    let result = [];

    // Для каждого числа, начиная с двух до limit,
    // если число простое, то добавляем его в список
    for (let i = 2; i <= limit; i++) {
      if (MathX.isPrime(i)) {
        result.push(i);
      }
    }

    return result;
  },

  //  ----  Проверка на простое число
  isPrime: function (num) {
    // 1 и отрицательные числа не являются простыми
    if (num <= 1) {
      return false;
    }

    // Проверка число делится нацело и не является простым
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        return false;
      }
    }

    // Если цикл завершен, то число простое
    return true;
  },
};
