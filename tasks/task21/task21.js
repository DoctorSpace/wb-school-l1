console.log("Задание №21");


function determineStackSize() {
    try {
        return 1 + determineStackSize();
    } catch (e) {
        // Когда достигнут максимальный размер стека, будет выброшено исключение.
        return 1;
    }
}

console.log(determineStackSize());
document.getElementById('text').textContent = determineStackSize()

console.log('Результаты в браузерах:',
'\nGoogle Chrome = 10452', '\nBrave = 10414', '\nEgde = 10477', '\nYandex = 10446');
