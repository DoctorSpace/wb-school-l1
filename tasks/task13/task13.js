console.log("Задание №13");

// Rect
const InputRectHeight = document.getElementById("InputRectHeight");
const InputRectWidth = document.getElementById("InputRectWidth");
const textRectArea = document.getElementById("textRectArea");
const textRectPerimeter = document.getElementById("textRectPerimeter");
const btnRect = document.getElementById("btnRect");
// Circle
const CircleInputRadius = document.getElementById("CircleInputRadius");
const textCircleArea = document.getElementById("textCircleArea");
const textCirclePerimeter = document.getElementById("textCirclePerimeter");
const btnCircle = document.getElementById("btnCircle");
// Triangle
const TriangleInputSideA = document.getElementById("TriangleInputSideA");
const TriangleInputSideB = document.getElementById("TriangleInputSideB");
const TriangleInputSideC = document.getElementById("TriangleInputSideC");
const textTriangleArea = document.getElementById("textTriangleArea");
const textTrianglePerimeter = document.getElementById("textTrianglePerimeter");
const btnTriangle = document.getElementById("btnTriangle");

// Класс Родитель
class Shape {
  // Площадь
  area() {throw new Error("Прощадь");}

  // Периметр
  perimeter() {throw new Error("Периметр");}
}

class Rectangle extends Shape {
  constructor(width, height) {
    //Наследуем свйства родительского объекта
    super();

    // Добавим значения ширины и высоты
    this.width = width;
    this.height = height;
  }
  // Посчитаем площадь прямоугольника
  area() {
    return this.width * this.height;
  }
  // Посчитаем периметр прямоугольника
  perimeter() {
    return 2 * (this.width + this.height);
  }
}

class Circle extends Shape {
  constructor(radius) {
    //Наследуем свйства родительского объекта
    super();
    // Добавим значение радиуса окружности
    this.radius = radius;
  }
  // Посчитаем площадь круга
  area() {
    return Math.PI * this.radius * this.radius;
  }
  // Посчитаем периметр круга
  perimeter() {
    return 2 * Math.PI * this.radius;
  }
}

class Triangle extends Shape {
  constructor(a, b, c) {
    //Наследуем свйства родительского объекта
    super();
    //Добавим длины сторон треугольника
    this.a = a;
    this.b = b;
    this.c = c;
  }
  // Посчитаем площадь треугольника
  area() {
    const s = this.perimeter() / 2;
    return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
  }
  // Посчитаем периметр треугольника
  perimeter() {
    return this.a + this.b + this.c;
  }
}

// Вывод значений Прямоугольника
btnRect.addEventListener("click", () => {
  const rect = new Rectangle(
    Number(InputRectHeight.value),
    Number(InputRectWidth.value)
  );
  // Записываем в вывод результат
  textRectArea.innerText = rect.area();
  textRectPerimeter.innerText = rect.perimeter();
});

// Вывод значений Круга
btnCircle.addEventListener("click", () => {
  const circle = new Circle(Number(CircleInputRadius.value));
  // Записываем в вывод результат
  textCircleArea.innerText = circle.area();
  textCirclePerimeter.innerText = circle.perimeter();
});

// Вывод значений Треугольника
btnTriangle.addEventListener("click", () => {
  const triangle = new Triangle(
    Number(TriangleInputSideA.value),
    Number(TriangleInputSideB.value),
    Number(TriangleInputSideC.value)
  );
  // Записываем в вывод результат
  textTriangleArea.innerText = triangle.area();
  textTrianglePerimeter.innerText = triangle.perimeter();
});
