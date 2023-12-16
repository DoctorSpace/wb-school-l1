console.log("Задание №27");

const btn = document.getElementById('btn')
const btn1 = document.getElementById('btn1')

const card1 = document.getElementById('card1')
const card2 = document.getElementById('card2')

// Анимация поднятия карточки
// cardUp - идёт на задний план
// cardDown - идёт на передний план
function AnimatedUp(cardUp, cardDown) {
    cardUp.classList.add('animatedUp');
    setTimeout(addAnimatedDown(cardUp, cardDown), 200);
}

// Продолжение анимации
function addAnimatedDown(cardUp, cardDown) {
    // Карточка cardUp, становиться вперёд
    cardUp.classList.add('zIndexFront');
    cardUp.classList.remove('zIndexBack');

    // Карточка cardDown, становиться назад
    cardDown.classList.remove('zIndexFront');
    cardDown.classList.add('zIndexBack');

    // Меняет позиция вперёд
    cardUp.classList.remove('positionUp');
    cardUp.classList.add('positionDown');

    // Меняет позиция назад
    cardDown.classList.remove('positionDown');
    cardDown.classList.add('positionUp');
}


// При нажатии на синию (чтобы появилась красная)
card1.addEventListener('click', ()=>{
    if(card1.classList.contains('positionDown')){
        setTimeout(AnimatedUp(card2, card1), 200);
    } else{
        setTimeout(AnimatedUp(card1, card2), 200);
    }
})

// При нажатии на синию (чтобы появилась красная)
card2.addEventListener('click', ()=>{
    if(card2.classList.contains('positionUp')){
        setTimeout(AnimatedUp(card2, card1), 200);
    } else{
        setTimeout(AnimatedUp(card1, card2), 200);
    }
})


// Уменьшить размер карточек
btn.addEventListener('click', ()=>{
    card1.classList.add('scaleON');
    card2.classList.add('scaleON');
})

// Увеличить размер карточек
btn1.addEventListener('click', ()=>{
    card1.classList.remove('scaleON');
    card2.classList.remove('scaleON');
})