console.log("Задание №23");

const input = document.getElementById('input')
const div = document.getElementById('div')


function analyzePasswordComplexity(password) {
    let score = 0;
    let recommendations = [];


    //Длина пароля
    if (password.length >= 10) {
        score++;
    } else {
        recommendations.push('Используйте пароль длиной 10 символов или более.');
    }

    //Наличие чисел
    if (/\d/.test(password)) {
        score++;
    } else {
        recommendations.push('Добавьте хотя бы одну цифру.');
    }

    //Наличие строчных букв
    if (/[a-z]/.test(password)) {
        score++;
    } else {
        recommendations.push('Добавьте хотя бы одну строчную букву.');
    }

    //Наличие прописных букв
    if (/[A-Z]/.test(password)) {
        score++;
    } else {
        recommendations.push('Добавьте хотя бы одну прописную букву.');
    }

    //Наличие специальных символов
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
        score++;
    } else {
        recommendations.push('Добавьте хотя бы один специальный символ.');
    }

    //Оценка сложности на основании набранных очков
    let complexity;
    if (score <= 2) {
        complexity = 'Слабый';
    } else if (score <= 3) {
        complexity = 'Средний';
    } else if (score <= 4) {
        complexity = 'Хороший';
    } else {
        complexity = 'Зашищенный';
    }

    //Возвращаем объект с уровнем сложности и рекомендациями
    return {
        complexity: complexity,
        recommendations: recommendations
    };
}

function checkPassword() {
    // Получаем значение пароля из элемента input
    let password = input.value;
    // Проверяем, если пароль пустой
    if (password.length === 0) {
        // Если пароль пустой, выводим сообщение о необходимости ввода пароля
        div.innerText = 'Введите пароль';
    } else {
        // Вызываем функцию анализа сложности пароля
        let result = analyzePasswordComplexity(password);

        // Выводим результат анализа в консоль (может быть использовано в разработке для отладки)
        console.log(result);

        // Выводим результат анализа на страницу
        // Проверяем, есть ли рекомендации, и добавляем их к выводу при необходимости
        div.innerText = `Оценка сложности пароля: ${result.complexity}` + (result.recommendations.length ? `\nРекомендации: \n${result.recommendations.join('\n')}` : '');
    }
}

// При изменении поля password запускается проверка пароля
input.addEventListener('input', ()=>{
    checkPassword()
})
