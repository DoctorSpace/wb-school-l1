console.log("Задание №19");

const token = "_token";

// Инициализация константной строки с версией API
const version = "5.131";
// Инициализация константной строки с идентификатором владельца
const ownerId = "-30602036";
// Установка начального смещения (для постраничного вывода данных из API)
let offset = 0;
// Флаг, указывающий, идет ли в данный момент загрузка данных
let isLoading = false;
// Переменная для временного хранения данных из ответа API
let data;

// Функция для создания и добавления скрипта на страницу для запроса к VK API методом JSONP
const createAndAppendScript = (callbackName) => {
  // Создание нового тега <script>
  const script = document.createElement("script");
  // Формирование URL запроса
  script.src = `https://api.vk.com/method/wall.get?owner_id=${ownerId}&access_token=${token}&v=${version}&offset=${offset}&callback=${callbackName}`;
  // Добавление скрипта в раздел <head> документа
  document.head.appendChild(script);
};

//Функция подсчета занимаемых данных в локальном хранилище
const calculateLocalStorageSize = () => {
  let total = 0;

  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      // Умножение на 2 из-за UTF-16 кодирования
      total += localStorage[key].length * 2;
    }
  }

  return total; // Размер в байтах
};
function testLocalStorageLimit() {
  // Переменная для накопления данных при увеличении объема (начнем с 1 символа)
  let testData = "1";
  // Счетчик итераций
  let iteration = 0;

  // Сначала быстро увеличиваем размер, пока не получим ошибку
  while (true) {
    try {
      // Попытка записать в localStorage
      localStorage.setItem("test", testData);
      // удваиваем объем данных
      testData += testData;
      iteration++;
      // Для предотвращения бесконечных циклов ставим 30
      if (iteration > 30) {
        // Прекратить цикл после достижения лимита
        break;
      }
    } catch (e) {
      // Выход из цикла, если произошла ошибка
      break;
    }
  }

  // Применяем бинарный поиск для точного определения лимита
  let low = testData.length / 2; // Начальная нижняя граница поиска
  let high = testData.length; // Начальная верхняя граница поиска
  let lastSuccessfulLength; // Последний успешный размер данных

  while (low <= high) {
    let mid = Math.floor((low + high) / 2); // Находим середину интервала
    try {
      localStorage.setItem("test", testData.slice(0, mid)); // Пытаемся сохранить обрезанные данные
      lastSuccessfulLength = mid; // Если успешно, обновлем последний успешный размер
      low = mid + 1; // Перемщаем нижнюю границу выше
    } catch (e) {
      high = mid - 1; // При ошибке перемещаем верхнюю границу ниже
    }
  }
  // Очищаем хранилизе после окончания тестирования

  localStorage.removeItem("test"); // Очищаем хранилизе после окончания тестирования
  return (lastSuccessfulLength + JSON.stringify(localStorage).length) * 2;
}

// Запустить функцию (вызывайте ее осторожно, так как она может "зависать" на некоторое время)
const maxSize = testLocalStorageLimit();
// Функция для сохранения данных в локальное хранилище (localStorage)
const saveToLocalStorage = (key, value, type = "start") => {
  try {
    // Пробуем сохранить данные
    localStorage.setItem(key, JSON.stringify(value));
    const currentSize = calculateLocalStorageSize();

    // Определяем текст для значения
    const textCurrentSize = document.querySelector("#textCurrentSize");

    // Вывод данных на экран
    textCurrentSize.innerHTML = `Использованно данных: ${currentSize / 1024} KB / ${maxSize / 1024} KB`;

    console.log( `Использованно данных: ${(currentSize / 1024000).toFixed(5)} МB / ${(maxSize / 1024000).toFixed(5)} МB`);
  } catch (e) {
    // Если ошибка связана с превышением лимита
    if (e.name === "QuotaExceededError" && key === "cachedPosts") {
      let trimedValue = type === "end" ? value.slice(0, -20) : value.slice(20); // Обрезаем массив данных

      saveToLocalStorage("lastPostId", trimedValue[0].id.toString()); // Сохраняем ID последнего поста
      saveToLocalStorage(key, trimedValue, type); // Рекурсивно пытаемся сохранить еще раз
    } else {
      throw e; // В случае другой ошибки
    }
  }
};

// Функция для загрузки сохраненных ранее постов из локального хранилища
const loadCachedPosts = () => {
  const cachedData = JSON.parse(localStorage.getItem("cachedPosts") || "[]"); // Загрузка данных
  if (cachedData.length > 0) {
    // Если есть сохраненные посты, отображаем их
    addPosts(cachedData);
    // Обновляем смещение на основе количества загруженных постов
    offset = cachedData.length;
  }
};

// Функция-коллбек для обработки ответа от VK API
const callbackFunc = (result) => {
  // Сохраняем полученные посты
  data = result.response.items;
  // Увеличиваем смещение
  offset += data.length;
  // Отображаем посты на странице
  addPosts(data);

  // Загружаем текущие кэшированные посты
  const cachedData = JSON.parse(localStorage.getItem("cachedPosts") || "[]");
  // Добавляем новые посты к кэшу и сохраняем
  saveToLocalStorage("cachedPosts", cachedData.concat(data));
  isLoading = false; // загрузка завершена
};

// Функция проверки наличия новых постов
const checkLatestPosts = (result) => {
  // Сохраняем последние посты
  const latestPosts = result.response.items;
  // Получаем последний сохраненный ID
  const lastSavedPostId = JSON.parse(localStorage.getItem("lastPostId"));
  // Если последний сохраненный ID не совпадает с последним полученным
  if (latestPosts[0].id.toString() !== lastSavedPostId) {
    // Если есть сохраненный id, то загружаем посты, пока не найдем сохраненный ID
    if (lastSavedPostId) {
      fetchUntilMatchedId(lastSavedPostId);
    } else {
      // Сохраняем новый последний ID
      saveToLocalStorage("lastPostId", latestPosts[0].id.toString());
      fetchData(); // Загружаем следующую порцию постов
    }
  } else {
    const cachedPosts = JSON.parse(localStorage.getItem("cachedPosts") || "[]");
    offset = cachedPosts.length;
    addPosts(cachedPosts);
  }
};

// Функция для загрузки постов, пока не найден указанный ID
// Загружаются новые данные до момента соединения со старыми, хвост старых данных обрезается

const fetchUntilMatchedId = (lastSavedId, accumulatedPosts = []) => {
  // Совершаем запрос к VK API
  createAndAppendScript("intermediateCallback");
  // Определяем временный коллбек для ответа в глобальной области видимости
  window.intermediateCallback = (result) => {
    // Сохраняем новые посты
    const newPosts = result.response.items;
    // Ищем индекс поста с указанным ID
    const indexOfLastSavedId = newPosts.findIndex(
      (post) => post.id.toString() === lastSavedId
    );
    // Если найден пост с сохраненным ID
    if (indexOfLastSavedId !== -1) {
      // Добавляем новые посты к накопленным
      accumulatedPosts = accumulatedPosts.concat(
        newPosts.slice(0, indexOfLastSavedId)
      );
      // Загружаем сохраненные ранее посты
      const savedPosts = JSON.parse(
        localStorage.getItem("cachedPosts") || "[]"
      );
      // Объединяем новые и сохраненные посты
      let combinedPosts = accumulatedPosts.concat(savedPosts);
      // Сохраняем объединенные данные
      saveToLocalStorage("cachedPosts", combinedPosts, "end");
      // Отображаем посты на странице
      addPosts(JSON.parse(localStorage.getItem("cachedPosts")));
      // Обновляем смещение
    } else {
      // Увеличиваем смещение
      offset += newPosts.length;
      // Рекурсивно загружаем следующую порцию постов
      fetchUntilMatchedId(lastSavedId, accumulatedPosts.concat(newPosts));
    }
  };
};

// Функция для запроса данных с VK API
const fetchData = () => {
  // Если уже идет загрузка, выходим из функции
  if (isLoading) return;
  isLoading = true;
  // Запрашиваем данные
  createAndAppendScript("callbackFunc");
};

// Отслеживание прокрутки виджета и загрузка дополнительных постов
const widget = document.querySelector("#widget");
widget.addEventListener("scroll", () => {
  if (widget.scrollHeight - widget.scrollTop <= widget.clientHeight + 50) {
    // При приближении к низу
    fetchData();
  }
});

// Инициализация шаблона для создания постов и контейнера, куда они будут добавляться
// Шаблон для поста
const postTemplate = document.querySelector("#post__emplate");
// Контейнер для постов
const postsContainer = document.querySelector("#posts__container");

// Функция для добавления массива постов на страницу
const addPosts = (data) => {
  // Для каждого поста в массиве
  data.forEach((post) => {
    // Создаем и добавляем на страницу
    createPost(post);
  });
};

// Функция для создания и добавления поста на страницу
const createPost = (postData) => {
  // Клонируем содержимое шаблона
  const post = document.importNode(postTemplate.content, true);

  //Получаем элементы содержимого шаблона
  const postDate = post.querySelector("#date");
  const postText = post.querySelector("#text");
  const postLikes = post.querySelector("#likes");
  const postComments = post.querySelector("#coments");
  const postReposts = post.querySelector("#reposts");

  // Устанавливаем дату поста
  postDate.textContent = new Date(postData.date * 1000).toLocaleString();
  //Устанавливаем текст поста
  postText.textContent = postData.text;

  //Получаем элемент для отображения фото
  const content = post.querySelector("#content");

  // Добавляем фото и видое поотдельности в content
  postData.attachments.forEach(({ type, photo, video }) => {
    type === "photo" ? content.appendChild(addPhoto(photo)) : null;
    type === "video" ? content.appendChild(addVideo(video)) : null;
  });

  //Устанавливаем лайки, коментарии, репостов
  postLikes.textContent = postData.likes.count;
  postComments.textContent = postData.comments.count;
  postReposts.textContent = postData.reposts.count;

  // Добавляем пост
  postsContainer.appendChild(post);
};

// Создание фото для поста
const addPhoto = (photoData) => {
  //Создание элемента изображения
  const img = document.createElement("img");

  // Находим картинку высокого качества
  if (photoData.sizes[7]?.url) {
    img.src = photoData.sizes[7].url;
  }
  //Присваиваем стили
  img.classList.add("content__img");
  return img;
};

// Создание видео для поста
const addVideo = (videoData) => {
  //Создание первьюшку для видео
  const preview = document.createElement("img");

  // Находим картинку высокого качества
  if (videoData.image[3]?.url) {
    preview.src = videoData.image[3].url;
  }

  //Присваиваем стили
  preview.classList.add("content__video");
  return preview;
};

//Первоначальная проверка
createAndAppendScript("checkLatestPosts");
textCurrentSize.innerHTML = `Использованно данных: ${calculateLocalStorageSize() / 1024} KB / ${maxSize / 1024} KB`;
