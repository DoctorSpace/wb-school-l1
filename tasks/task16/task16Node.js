console.log("Задание №16");

// Импортируем библиотеку moment
const moment = require('moment');

// Функция для форматирования текущей даты по заданному формату
const getCurrentDateFormatted = function(format = 'YYYY-MM-DD') {
    return moment().format(format);
}

// Функция для получения разницы между двумя датами в днях
const getDifferenceInDays = function(date1, date2) {

    const mDate1 = moment(date1);
    const mDate2 = moment(date2);
    return mDate2.diff(mDate1, 'days');
}

//Вывод результата
console.log(getCurrentDateFormatted()); 
console.log(getDifferenceInDays('2022-02-01', '2023-12-30'));