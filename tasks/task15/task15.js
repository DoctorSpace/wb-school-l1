console.log("Задание №15");

// Находим кнопку
const btn = document.getElementById("btn");

function delay(ms) {
  // Создаём промис ожидания
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

//   Ключевое слово await заставит интерпретатор JavaScript
//   ждать до тех пор, пока промис справа от await не выполнится.
//   После чего оно вернёт его результат, и выполнение кода продолжится.

async function asyncFunction() {
  console.log("Запущено");

  // Остановится на строке до тех пор, пока промис не выполнится
  await delay(1000);
  console.log("Прошла 1 секунда");

  // Остановится на строке до тех пор, пока промис не выполнится
  await delay(700);
  console.log("Прошло 700 ms");

  // Остановится на строке до тех пор, пока промис не выполнится
  await delay(1000);
  console.log("Прошла ещё 1 секунда");
}

// Вешаем слушатель событий на кнопку и запускаем скрипит при нажатии
btn.addEventListener("click", () => {
  asyncFunction();
});
