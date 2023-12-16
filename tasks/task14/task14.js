console.log("Задание №14");

const section = document.getElementById("section");

const imageUrl = "https://uprostim.com/wp-content/uploads/2021/05/image088-2.jpg";

function loadImage(url) {
  return new Promise((resolve, reject) => {
    // Создать новый элемент img
    const img = new Image();

    // срабатывает после того, как скрипт был загружен и выполнен
    img.onload = () => {
      // Получаем данные о изображении
      const imageInfo = {
        width: img.width,
        height: img.height,
      };
      // Отправляем промис с данными
      resolve(img);
    };

    // Выдаёт ошибку если скрипт не был выполнен
    img.onerror = (error) => {
      // Ошибка отправки промиса
      reject(error);
    };

    // Добавляет путь до картинки
    img.src = url;
  });
}

loadImage(imageUrl)
  .then((img) => {
    console.log(`Изображение загружено`);
    console.log("width:", img.width);
    console.log("height:", img.height);
    // Добавляем изображение в section
    section.appendChild(img);
  })
  .catch((error) => {
    // Ошибка изображение не загрузилось
    console.error(error);
  });
