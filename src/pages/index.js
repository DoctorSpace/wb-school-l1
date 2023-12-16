import { dataTasks } from "../date/dataTasks.js";

dataTasks.forEach((item) => {
  let card = document.createElement(`div`);
  card.classList.add("card");

  card.innerHTML = `
    <a href="./tasks/task${item.id}/task${item.id}.html">Задание ${item.id}</a>
    <a href="https://github.com/DoctorSpace/wb-school-l1/tree/main/tasks/task${item.id}" class="card__github" target="_blank"><img src="./src/img/GitHub.svg" /></a>
    `;

  document.getElementById("content").appendChild(card);
});
