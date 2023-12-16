console.log("Задание №26");

function throughDOM(element, action) {
  //Если нет элемента, то ничего не делаем
  if (!element) return;

  // Выполняем действие с текущим элементом
  action(element);

  // Рекурсивно обходим все дочерние элементы
  for (let i = 0; i < element.childNodes.length; i++) {
    throughDOM(element.childNodes[i], action);
  }
}

// Пример использования:
const action = (node) => {
  //Только если узел является элементом
  if (node.nodeType === Node.ELEMENT_NODE) {
    console.log("Тег:", node.tagName);
  }
};


// Вызов функции, начиная с корня документа
throughDOM(document.body, action);

