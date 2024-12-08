const btn = document.querySelector(".j-btn-test");

btn.addEventListener("click", () => {
  btn.classList.toggle("btn--magic");
});

/*Задание 1.

Сверстайте кнопку, которая будет содержать в себе icon_01 
При клике на кнопку иконка должна меняться на icon_02. 
Повторный клик меняет иконку обратно.*/

// Получаем элементы кнопки и иконки
const iconButton = document.querySelector(".icon__change");
const icon = document.getElementById("icon");

let isFirstIcon = true;

iconButton.addEventListener("click", () => {
  if (isFirstIcon) {
    icon.innerHTML = `
            <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-5.904-2.803a.5.5 0 1 1 .707.707L6.707 10h2.768a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.525a.5.5 0 0 1 1 0v2.768z"/>
        `;
  } else {
    icon.innerHTML = `
            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-5.904-2.854a.5.5 0 1 1 .707.708L6.707 9.95h2.768a.5.5 0 1 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.475a.5.5 0 1 1 1 0v2.768z"/>
        `;
  }

  isFirstIcon = !isFirstIcon;
});

/* Задание 2
Сверстайте кнопку, 
клик на которую будет выводить данные о размерах экрана с помощью alert. */

const sizeButton = document.querySelector(".size__button");

sizeButton.addEventListener("click", function () {
  const widthInner = window.innerWidth;
  const heightInner = window.innerHeight;
  alert(
    `Размеры вашего экрана: Ширина экрана - ${widthInner}px, а высота экрана - ${heightInner}px`
  );
});

// 3 задание

const chat = document.querySelector(".chat");
const messageInput = document.querySelector(".input__search");
const sendMessageButton = document.querySelector(".btn__send_message");
const sendLocationButton = document.querySelector(".send__location");
const messageComunic = document.querySelector(".message__communication");

const webSocket = new WebSocket("wss://echo.websocket.org");

sendMessageButton.addEventListener("click", () => {
  webSocket.send(messageInput.value);
  const p = document.createElement("p");
  p.textContent = messageInput.value;
  p.classList.add("my__msg");
  chat.appendChild(p);
  messageInput.value = "";
});

webSocket.addEventListener("message", (event) => {
  // игнор первого сообщения, если включены такие слова
  if (event.data.toLowerCase().includes("request served by")) {
    return;
  }

  console.log(event);
  const p = document.createElement("p");
  p.textContent = event.data;
  p.classList.add("msg");
  chat.appendChild(p);
  sendLocationButton.style.display = "block";
  chat.appendChild(p);
});

sendLocationButton.addEventListener("click", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      const p = document.createElement("p");
      p.textContent = coords.latitude + "," + coords.longitude;
      console.log(navigator);

      p.classList.add("msg__geo");
      chat.appendChild(p);
    });
  }
});
