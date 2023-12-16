console.log("Задание №7");

// Пример массива функций
const functionsArray = [
  () => {
    console.log("Функция 1");
  },
  () => {
    console.log("Функция 2");
  },
  () => {
    console.log("Функция 3");
  },
  // Добавьте другие функции по мере необходимости
];

// Функция для выполнения функций по порядку
const executeFunctionsSequentially = (functions, index = 0) => {
  if (index < functions.length) {
    // Вызов текущей функции
    functions[index]();
    console.log(`Завершение ${index + 1}`);

    // Рекурсивный вызов для следующей функции
    executeFunctionsSequentially(functions, index + 1);
  }
};

// Вызов первой функции для начала выполнения
executeFunctionsSequentially(functionsArray);
