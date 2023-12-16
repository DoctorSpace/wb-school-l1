console.log("Задание №18");

function testLocalStorageLimit() {
  // Инициализируем тестовые данные
  let testData = "1";
  // Счетчик итераций
  let iteration = 0;

  // Определяем, куда записывать данные
  const text = document.getElementById("text");

// Быстро увеличиваем размер до появления ошибки
  while (true) {
    try {
      // Пытаемся записать в localStorage
      localStorage.setItem("test", testData);
      // Удваиваем объем данных
      testData += testData;
      iteration++;
      // Ограничиваем число итераций, чтобы избежать бесконечного цикла (30 значение)
      if (iteration > 30) {
        // Прекращаем цикл после достижения лимита
        break;
      }
    } catch (e) {
      // Выход из цикла, если произошла ошибка
      break;
    }
  }

  // Применяем бинарный поиск для точного определения лимита
  // Начальная нижняя граница поиска
  let low = testData.length / 2;
  // Начальная верхняя граница поиска
  let high = testData.length;
  // Последний успешный размер данных
  let lastSuccessfulLength;

  while (low <= high) {
    // Находим середину интервала
    let mid = Math.floor((low + high) / 2);
    try {
       // Пытаемся сохранить обрезанные данные
      localStorage.setItem("test", testData.slice(0, mid));
      // Если успешно, обновлем последний успешный размер
      lastSuccessfulLength = mid;
      // Перемщаем нижнюю границу выше
      low = mid + 1;
    } catch (e) {
      // При ошибке перемещаем верхнюю границу ниже
      high = mid - 1;
    }
  }
  // Очищаем хранилизе после окончания тестирования
  localStorage.removeItem("test");

  // Если в локалсторедж уже есть записанные данные, То прибавим их к подсчетам
  return lastSuccessfulLength + JSON.stringify(localStorage).length;
}

// Очищаем localstorage перед началом тестирования
localStorage.clear();

// Рассчитываем объем данных в мегабайтах, учитывая, что каждый символ в строке JavaScript в кодировке UTF-16 занимает 2 байта.
text.textContent = (testLocalStorageLimit() * 2) / 1024 / 1024 + " Мегабайт";
