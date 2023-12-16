console.log("Задание №9");

// Объект
const myObject = {
  name: "Dmitry",
  age: 24,
  address: {
    city: "Tagantor",
    zip: "10001",
  },
};

// Записывам в jsonString обработанный объект
const jsonString = jsonToString(myObject);
// Выводим результат в консоль
console.log(jsonString, "-", typeof jsonString);

function jsonToString(obj) {
  // Проверяем, содержатся ли данные в объекте
  if (obj === null) return "null";

  // Различные пути обработки для разных типов данных
  switch (typeof obj) {
    // Если это число или булевый тип данных, то преобразуем его в строку
    case "number":
      return obj.toString();
    case "boolean":
      return obj.toString();

    // Если это строка, то оборачиваем ее в кавычки
    case "string":
      return `"${obj}"`;

    // Если это объект
    case "object":
      // Если это массив, вызываем рекурсивно функцию для каждого элемента массива и объединяем их запятыми
      if (Array.isArray(obj)) {
        const arrayElements = obj.map((item) => jsonToString(item)).join(",");
        return `[${arrayElements}]`;
        // Если это объект, вызываем функцию рекурсивно для каждого свойства объекта, сохраняя ключи без изменений
      } else {
        const objectEntries = Object.entries(obj)
          .map(([key, value]) => `"${key}":${jsonToString(value)}`)
          .join(",");
        return `{${objectEntries}}`;
      }
    // Если тип не удается определить или он не входит в вышеуказанные случаи, выбрасываем ошибку
    default:
      throw new Error(`Неизвестный тип: ${typeof obj}`);
  }
}
