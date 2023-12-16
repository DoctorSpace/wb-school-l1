function addUserCard() {
    // Получаем ссылку на наш шаблон
    const setTitle = document.getElementById('setTitle')
    const setText = document.getElementById('setText')

    const template = document.getElementById('myTemplate');

    // Создаём объект стилий
    const styles = {
        color: document.getElementById('setTextColor').value,
        backgroundColor: document.getElementById('setBackgroundColor').value,
    };


    // Клонируем содержимое шаблона
    const Block = document.importNode(template.content, true);
    
    // Устанавливаем значения для карточки пользователя

    Block.querySelector('.block__title').textContent  = setTitle.value;
    Block.querySelector('.block__text').textContent  = setText.value;

    // Добавляем стилий в блок
    for (let [key, value] of Object.entries(styles)) {
        Block.querySelector('.block').style[key] = value;
    }
    

    // Добавляем карточку пользователя в DOM
    document.getElementById('content').appendChild(Block);
}


document.getElementById('btn').addEventListener('click', ()=>{
    addUserCard()
})