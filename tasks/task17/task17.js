console.log("Задание №17");

const apikey = "_apikey"; //Вставить ключ "JavaScript API и HTTP Геокодер"

const input = document.getElementById("input");
const address = document.getElementById("address");

// Таймер запроса
function debounce(fn, delay) {
  let timeout; //Харнилизе таймера

  return function (...args) {
    // Сохраняем контекст вызова
    const context = this;
    // Очищаем устаревший таймер
    clearTimeout(timeout);
    // Устанавливаем новый таймер, который выполнит функцию с заданной задрежкой
    timeout = setTimeout(() => fn.apply(context, args), delay);
  };
}

function throttle(fn, limit) {
  let inThrottle; // Флаг, указывающий на активное ограничение частоты
  let lastFunction; // Таймер последней запланированной функции
  let lastRan; // Время последнего запуска функции

  return function (...args) {
    const context = this; // Сохраняем контекст вызова
    // Если нет активного ограничения, вызываем функцию
    if (!inThrottle) {
      fn.apply(context, args);
      lastRan = Date.now(); // Обновляем время последнего запуска
      inThrottle = true; // Устанавливаем флаг активного ограничения
    } else {
      // Если есть активное ограничение, отменяем предыдущий запланированный таймер
      clearTimeout(lastFunction);
      // Создаем новый таймер, который выполнит функцию, если прошло достаточно времени
      lastFunction = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          fn.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
    // Снимаем ограничение после интервала limit
    setTimeout(() => (inThrottle = false), limit);
  };
}

input.addEventListener("input", function (e) {
  // Получаем значение input
  let query = e.target.value;

  if (query.length > 3) {
    // чтобы не начинать поиск слишком рано
    // Отправляем запрос к геокодеру
    debouncedFetchAddress(query);
  }
});

function fetchAddress(query) {
  //Определяем url запроса к api яндекс-карт
  let apiURL = `https://geocode-maps.yandex.ru/1.x/?apikey=${apikey}&format=json&geocode=${query}`;
  fetch(apiURL)
    // Преобразуем полученные данные в json формат
    .then((response) => response.json())
    .then((data) => {
      // Получаем подсказки к адресу
      let suggestions = data.response.GeoObjectCollection.featureMember;
      // С использованием метода тротлинга передаем полученные данные в выпадающий список
      throttledDisplayAddresses(suggestions);
    });
}

//Получаем элемент списка
function displayAddresses(suggestions) {

  // очищаем предыдущие результаты
  address.innerHTML = "";

  suggestions.forEach((suggestion) => {
    //Создаем новый элемент списка
    let li = document.createElement("li");
    //Записываем полученную с сервера подсказку адреса
    li.textContent =
      suggestion.GeoObject.description + ", " + suggestion.GeoObject.name;

    // Добавляем обработчик клика, чтобы можно было выбрать адрес
    li.addEventListener("click", function () {
      document.getElementById("input").value = li.textContent;
      // очищаем список после выбора адреса
      list.innerHTML = "";
    });
    // Добалвяем элемент в список
    address.appendChild(li);
  });
}

//Определяем функции, Обарачивая их в "защитные" методы
const debouncedFetchAddress = debounce(fetchAddress, 300);
const throttledDisplayAddresses = throttle(displayAddresses, 300);
