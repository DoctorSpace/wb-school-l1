console.log("Задание №5");

class LinkedListNode {
  // Добавление значений значения и указателя на сл.элемент списка
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

  // Возвращает строку для вывода в консоль
  toString() {
    return `${this.value}`;
  }
}

class LinkedList {
  // Добавление значений Начального и Конечного элемента списка
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // Метод добавление элемента в конец списка
  append(value) {
    const newNode = new LinkedListNode(value);

    // Если нету не Начального и не Конечного
    if (!this.head || !this.tail) {
      // Тогда задаём Начало и Конец
      this.head = newNode;
      this.tail = newNode;
      // Дальше не идём
      return this;
    }

    // Берём хвост и к нему добавляем новый объект
    this.tail.next = newNode;
    // Теперь хвост это новый объект
    this.tail = newNode;
    // Возвращает текущий список
    return this;
  }

  // Прохождение по всем элементам списка
  toArray() {
    const nodes = [];
    // Записываем в currentNode значение головы
    let currentNode = this.head;
    // Если currentNode != null
    while (currentNode) {
      // Записывам в массив значение головы
      nodes.push(currentNode);
      // Присваиваем голове ссылку на сл.элемент
      currentNode = currentNode.next;
    }

    return nodes;
  }
}

function jsonToSinglyLinkedList(Json) {
  // Создаём пустой односвязанный список
  const list = new LinkedList();

  // Записываем значения из Json в список
  for (let count of JSON.parse(Json)) {
    list.append(count);
  }

  // Выводим значение в консоль
  console.log(list.toArray());
}

const Json = JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
jsonToSinglyLinkedList(Json);