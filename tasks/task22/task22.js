console.log("Задание №22");

// Посчитайте сколько раз можно вызвать функцию `document.write()` внутри `document.write()`. Объясните результат.

// В статье https://habr.com/ru/articles/305366/ утверждают что document.write можно вызвать 21 раз для Google Chome

// Заметил что он не запускается из файла js, только если писать напрямую
document.write()
// Иначе выдаёт Ошибку чтения
// Невозможно выполнить запись в документ из асинхронно загруженного внешнего скрипта, если он не открыт явно.

// Я вызвал document.write() 34 раза и думаю можно больше
// Считаю что количество вызовов document.write внутри document.write равна call stack ~10000 вызовов


console.log('Посчитайте сколько раз можно вызвать функцию `document.write()` внутри `document.write()`. Объясните результат.');
console.log('В статье https://habr.com/ru/articles/305366/ утверждают что document.write можно вызвать 21 раз для Google Chome\nТак же заметил что он не запускается из файла js, только если писать напрямую\nИначе выдаёт Ошибку чтения\nНевозможно выполнить запись в документ из асинхронно загруженного внешнего скрипта, если он не открыт явно.');

console.log('Я вызвал document.write() 34 раза\nСчитаю что количество вызовов document.write внутри document.write равна call stack ~10000 вызовов');