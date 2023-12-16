console.log("Задание №12");

// Инициализировали блоки
const text = document.getElementById("text");
const text1 = document.getElementById("text1");
const text2 = document.getElementById("text2");
const input = document.getElementById("input");
const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");


const book = {
  title: "Гарри Поттер и философский камень",
  author: "Дж. К. Роулинг",
  year: 1997,

  // Получаем зачение свойства title из текщего контекста вызова
  getTitle: function () {
    return this.title;
  },
  // Получаем зачение свойства author из текщего контекста вызова
  getAuthor: function () {
    return this.author;
  },
  // Получаем зачение свойства year из текщего контекста вызова
  getYear: function () {
    return this.year;
  },
  // Устанавливаем текущее значение заголовка
  setTitle: function (title) {
    this.title = title;
  },
  // Устанавливаем текущее значение автора
  setAuthor: function (author) {
    this.author = author;
  },

  // Устанавливаем текущее значение года
  setYear: function (year) {
    this.year = year;
  },
};


// Первичная запись в текст
text.innerText = book.getTitle()
text1.innerText = book.getAuthor()
text2.innerText = book.getYear()


// Меняем Название Книги
input.addEventListener("input", () => {
    book.setTitle(input.value)
    text.innerText = book.getTitle()
});

// Меняем Автора
input1.addEventListener("input", () => {
    book.setAuthor(input1.value)
    text1.innerText = book.getAuthor()
});

// Меняем Год
input2.addEventListener("input", () => {
    book.setYear(input2.value)
    text2.innerText = book.getYear()
});