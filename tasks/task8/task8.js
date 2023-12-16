console.log("Задание №8");


// Создаем массив функций
const functionsArray = [
    (x) => x + 1, 
    (x) => x * 2, 
    (x) => x ** 2,
    (x) => x + 100
];

// Создаем замыкание
const combinedFunction = createClosureFunction(functionsArray);

// Число для функции
let number = 3

// Вызываем новую функцию с аргументом
const result = combinedFunction(number);

// Вывод результата
console.log(result);


function createClosureFunction(functions) {
  //Возвращаем новую функцию, которая вызывает функции в массиве фуннкций
  return function (...args) {
    return functions.map((func) => func(...args));
  };
}