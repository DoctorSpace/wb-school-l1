console.log("Задание №24");


// Инициализируем кнопки
const btnNext = document.querySelector("#btnNext");
const btnPrev = document.querySelector("#btnPrev");
// Инициализируем поля thead
const fname = document.querySelector("#fname");
const lname = document.querySelector("#lname");
const tel = document.querySelector("#tel");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const state = document.querySelector("#state");
const zip = document.querySelector("#zip");
// Инициализируем поле tBody
const tBody = document.querySelector("#tBody");


//Данные таблицы
let data = [];

//Текущая cтраница
let currentPage = 1;

//Колличество строк на одной странице
const itemsPerPage = 50;

//Направление сортировки
let sortDirection = 1;

//Текущий параметр сортировки
let currentSortField = null;


let pageNumber = document.getElementById("pageNumber");
// Загрузка данных с сервера
function loadData() {
  fetch("http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true")
    .then((response) => response.json())
    .then((json) => {
      //Запись данных в текущую переменную
      data = json;
      //Отрисовка данных
      renderData(data);
    })
    //Обработка ошибок запроса
    .catch((error) => {
      console.error(error);
    });
}

//Отрисовка данных на странице
function renderData(data) {

  //Получаем срез данных для текущей страницы
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const slice = data.slice(start, end);

  //Вставляем данные в таблицу при помощи создания нового элемента
  tBody.innerHTML = slice.map(
      (item) => `
        <tr>
            <td>${item.fname}</td>
            <td>${item.lname}</td>
            <td>${item.tel}</td>
            <td>${item.address}</td>
            <td>${item.city}</td>
            <td>${item.state}</td>
            <td>${item.zip}</td>
        </tr>
    `
    ).join("");
}

//Сортировка даных
function sortData(field) {
  //Если поле не меняется, то пеняется направление сортировки
  if (currentSortField === field) {
    sortDirection = -sortDirection;
  } else {
    //Иначе меняется поле сортировки
    currentSortField = field;
    sortDirection = 1;
  }
  //Сортируем данные по текущей колонке
  data.sort((colm1, colm2) => {
    if (colm1[field] > colm2[field]) return sortDirection;
    if (colm1[field] < colm2[field]) return -sortDirection;
    return 0;
  });
  //Перерисовываем данные на странице
  renderData(data);
}

//Переход на следующую страницу
function nextPage() {
  // Проверка, есть ли данные для следующей страницы
  if (currentPage * itemsPerPage < data.length) {
    currentPage++;
    //Меняем номер страницы на странице
    pageNumber.textContent = currentPage;
    renderData(data);
  }
}

//Переход на предыдущие страницу
function prevPage() {
  // Если мы не дошли до начала документа
  if (currentPage > 1) {
    currentPage--;
    //Меняем номер страницы на странице
    pageNumber.textContent = currentPage;
    renderData(data);
  }
}

//Вызов функции загрузки
loadData();

// Конпки для пагинации
btnNext.addEventListener("click", function () {
  nextPage();
});
btnPrev.addEventListener("click", function () {
  prevPage();
});

// Сортировка при нажатии на thead
fname.addEventListener("click", function () {
  sortData("fname");
});
lname.addEventListener("click", function () {
  sortData("lname");
});
tel.addEventListener("click", function () {
  sortData("tel");
});
address.addEventListener("click", function () {
  sortData("address");
});
city.addEventListener("click", function () {
  sortData("city");
});
state.addEventListener("click", function () {
  sortData("state");
});
zip.addEventListener("click", function () {
  sortData("zip");
});
