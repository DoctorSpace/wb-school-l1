console.log("Задание №6");

// Инициализировали блоки
const btn = document.getElementById("btn");
const btn1 = document.getElementById("btn1");
const text = document.getElementById("text");

const array = [
  { name: "Kris", age: 20 },
  { name: "John", age: 52 },
  { name: "Jame", age: 33 },
  { name: "Denis", age: 20 },
  { name: "Eli", age: 58 },
  { name: "Sergey", age: 20 },
  { name: "Sofia", age: 25 },
];

// Выводим в текст значения массива
text.innerText = JSON.stringify(array);

// Вешаем слушатель событий на кнопку (возрастание)
btn.addEventListener("click", () => {
  text.innerText = JSON.stringify(sortByAgeAscending(array));
});

// Вешаем слушатель событий на кнопку1 (убывание)
btn1.addEventListener("click", () => {
  text.innerText = JSON.stringify(sortByAgeDescending(array));
});


// Сотрировка по возрастанию
function sortByAgeAscending(array) {
  return array.sort((obj1, obj2) => {
    // сортируем по возрасту
    // Находит разницу в возрастах
    if (obj1.age != obj2.age) {
      return obj1.age - obj2.age;
    }

    // сортируем по имени
    // Если строка совпадает с заданной строкой
    return obj1.name.localeCompare(obj2.name);
  });
}

// Сотрировка по убыванию
function sortByAgeDescending(array) {
  return array.reverse((obj1, obj2) => {
    // сортируем по возрасту
    // Находит разницу в возрастах
    if (obj1.age != obj2.age) {
      return obj1.age - obj2.age;
    }

    // сортируем по имени
    // Если строка совпадает с заданной строкой
    return obj1.name.localeCompare(obj2.name);
  });
}
