console.log("Задание №11");

const parentFucntion = function() {
    // Определяем перемнную, внутри внешней функции
    let someParentFuctionVarible = "секретная информация";

    // Возвращаем вложенную функцию, которая основывается на переменных внешней функции
    return function innerFunction() {
        // Выводим в консоль значение переменной
        console.log(someParentFuctionVarible);
    }
}

// Вызываем внешнюю функцию и сохраняем возвращаемую вложенную функцию в переменную
const someFunction = parentFucntion()

// Вызываем вложенную функцию
someFunction()