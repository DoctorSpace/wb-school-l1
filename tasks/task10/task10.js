console.log("Задание №10");

// Из 9-ой задачи взял функцию преобразования объекта в строку
const jsonToString = function (obj) {
  // Есть ли в объекте данные?
  if (obj === null) return "null";
  // Разные пути решения для разных данных
  switch (typeof obj) {
    // Если это число или булевый тип данных, то преобразуем его в строку
    case "number":
      return obj.toString();
    case "boolean":
      return obj.toString();
    // Если это строка, то оборачиваем ее в кавычки
    case "string":
      return `"${obj}"`;
    // Если это объект то
    case "object":
      // Если это массив, то вызываем рекурсивно функцию к элементам массива и соединияем запятыми
      if (Array.isArray(obj)) {
        const arrayElements = obj.map((item) => jsonToString(item)).join(",");
        return `[${arrayElements}]`;
        // Если это объект, то вызываем функцию рекурсивно к каждому свойству объекта, а ключ записываем без изменений
      } else {
        const objectEntries = Object.entries(obj)
          .map(([key, value]) => `"${key}":${jsonToString(value)}`)
          .join(",");
        return `{${objectEntries}}`;
      }
    //если тип не удается определить или он не вхоит в случаи выше, то вызываем ошибку
    default:
      throw new Error(`Неизвестный тип: ${typeof obj}`);
  }
};

/// Преобразование строки в объект с популярными проверками
function simpleJSONParse(str) {
  let index = 0;

  function parseValue() {
    skipWhitespace();
    //Если символом является открвающеяся кавычка, то переходим к парсингу строки
    if (str[index] === '"') return parseString();
    //Если символом является открвающеяся фигурная скобка, то переходим к парсингу объекта
    if (str[index] === "{") return parseObject();
    //Если символом является открвающеяся квадартная скобка, то переходим к парсингу массива
    if (str[index] === "[") return parseArray();
    // Если проходит тест на число, то парсим число
    if (/^-?\d/.test(str[index])) return parseNumber();
    // Если это булевое значение, то парсим булевое значение
    if (str.substr(index, 4) === "true" || str.substr(index, 5) === "false")
      return parseBoolean();
    // Если это null, то парсим null
    if (str.substr(index, 4) === "null") return parseNull();
    // Обработка символов-исключений
    throw new Error(`Unexpected token at ${index}`);
  }
  //Пропускаем пробелы, табуляцию, перенос строки и возврат
  function skipWhitespace() {
    while (
      str[index] === " " ||
      str[index] === "\t" ||
      str[index] === "\n" ||
      str[index] === "\r"
    ) {
      index++;
    }
  }

  function parseString() {
    let result = "";
    // Пропускаем открывающиеся кавычки
    index++;
    // Пока не встретим новую кавычку записываем строку
    while (str[index] !== '"') {
      result += str[index];
      index++;
    }
    // Пропускаем закрывающиеся ковычки
    index++;
    return result;
  }

  function parseNumber() {
    //Берем индекс начала числа
    const start = index;
    //Проверяем все последующие символы на число при помощи простого регулярного выражения
    while (/^-?\d/.test(str[index])) index++;
    //Возвращаем число при помощи вырезания по найденному индексу
    return Number(str.slice(start, index));
  }

  function parseBoolean() {
    //Если в строке записанно true, то возваращем true
    if (str.substr(index, 4) === "true") {
      index += 4;
      return true;
      //Аналогично в противном случае возвращаем false
    } else {
      index += 5;
      return false;
    }
  }
  //Возвращаем null
  function parseNull() {
    index += 4;
    return null;
  }

  function parseObject() {
    let result = {};
    // Пропускаем открывающиеся кавычки
    index++;
    skipWhitespace();
    while (str[index] !== "}") {
      const key = parseString();
      skipWhitespace();
      if (str[index] !== ":") throw new Error(`Expected ':' at ${index}`);
      // Пропустить двоеточие
      index++;
      const value = parseValue();
      result[key] = value;
      skipWhitespace();
      if (str[index] === ",") {
        // Пропускаем запятые
        index++;
        skipWhitespace();
      }
    }
    // Пропускаем закрывающиеся ковычки
    index++;
    return result;
  }

  function parseArray() {
    let result = [];
    // Пропускаем открывающиеся кавычки
    index++;
    skipWhitespace();
    while (str[index] !== "]") {
      const value = parseValue();
      result.push(value);
      skipWhitespace();
      if (str[index] === ",") {
        // Пропускаем запятые
        index++;
        skipWhitespace();
      }
    }
    // Пропускаем закрывающиеся ковычки
    index++;
    return result;
  }

  return parseValue();
}

const myObject = {
  name: "Dmitry",
  age: 24,
  address: {
    city: "Tagantor",
    zip: "10001",
  },
};

console.log(
  simpleJSONParse(jsonToString(myObject)),
  `is ${typeof simpleJSONParse(jsonToString(myObject))}`
);
