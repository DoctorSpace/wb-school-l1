
console.log("Задание №25");

const btn = document.getElementById('btn')
const content = document.getElementById('content')



btn.addEventListener('click', ()=>{
    createStyledElement()
})

function createStyledElement() {
    //Получаем стили из инпутов со страницы
    const styles = {
        color: document.getElementById('textColor').value,
        backgroundColor: document.getElementById('backgroundColor').value,
        padding: document.getElementById('padding').value + 'px',
        margin: document.getElementById('margin').value + 'px',
        fontSize: document.getElementById('fontSize').value + 'px'
    };
    // Создаем новый элемент
    const div = document.createElement('div');
    // Применяем стили к созданному элементу
    for (let [key, value] of Object.entries(styles)) {
        div.style[key] = value;
    }
    //Вставляем текст в документ
    div.textContent = document.getElementById('text').value;
    //Добавляем элемент на страницу
    content.appendChild(div);
}