// Ссылка на сервер для запроса
var apiUrl = "https://api.example.com/data";

document.getElementById("myForm").addEventListener("submit", function (event) {
  // Предотвращаем стандартное поведение формы (отправка формы)
  event.preventDefault();

    // Получаем данные из формы
  const name = event.target.name.value;
  const email = event.target.email.value;
  const password = event.target.password.value;

  alert(`Введённые данные\nИмя: ${name}\nПочта: ${email}`);

  // Отправляем POST-запрос на сервер
  sendRequest(apiUrl, "POST", { name, email, password })
    .then(function (response) {
      // Обработка успешного ответа
      console.log("Ответ от сервера:", response);
    })
    .catch(function (error) {
      // Обработка ошибки
      console.error("Ошибка при отправке запроса:", error);
    });
});

// Функция, возвращающая промис для отправки запроса на сервер
function sendRequest(url, method, data) {
  return new Promise(function (resolve, reject) {
    // Создаем новый XMLHttpRequest объект
    var xhr = new XMLHttpRequest();

    // Настраиваем запрос
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    // Обработчик события при успешном завершении запроса
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        // Запрос успешно выполнен
        resolve(xhr.response);
      } else {
        // Запрос завершился ошибкой
        reject(xhr.statusText);
      }
    };

    // Обработчик события при ошибке
    xhr.onerror = function () {
      reject(xhr.statusText);
    };

    // Преобразуем данные в JSON и отправляем запрос
    var jsonData = JSON.stringify(data);
    xhr.send(jsonData);
  });
}
