import cipher from "./cipher.js";
import { countries } from "./data_prefix.js";
import { NotificacionToast } from "./notification_toast.js";
import { instructions } from "./instructions_cyper.js";

customElements.define("notification-toast", NotificacionToast);
const message = document.getElementById("message");
const offset = document.getElementById("offset");
const botonDecode = document.getElementById("button_decode");
const botonEncode = document.getElementById("button_encode");
const modalMontainer = document.getElementById("modal_container");
const btnCloseModal = document.getElementById("close-modal");
const modal = document.getElementById("modal");
const targetCel = document.getElementById("destino");
const containerBtnModal = document.querySelector(".btn-modal-whatsapp");
const containerListCountry = document.getElementById("container-countries");
const inputCountry = document.getElementById("input-country");
const btnInfo = document.querySelector(".btn-info");

const printToatsNotification = (messageDone) => {
  const notification = document.getElementById("notification");
  const toastErrorSpan = notification.shadowRoot.querySelector("span");
  toastErrorSpan.textContent = messageDone;
  notification.shadowRoot.querySelector("div").classList.add("show");
};

const listCountries = () => {
  const dataListCountries = document.createElement("datalist");
  dataListCountries.id = "countries";
  for (let i = 0; i < countries.length; i++) {
    const itemcountry = document.createElement("option");
    itemcountry.value = countries[i].country;
    dataListCountries.appendChild(itemcountry);
  }
  containerListCountry.appendChild(dataListCountries);
};

const sendWhatapp = (message) => {
  containerBtnModal.innerHTML = "";
  const btnWhatsapp = document.createElement("button");
  btnWhatsapp.classList.add("btn-whatsapp");
  containerBtnModal.appendChild(btnWhatsapp);
  btnWhatsapp.addEventListener("click", function () {
    window.open(
      "https://wa.me/" + parseInt(targetCel.value) + "?text=" + message
    );
  });
};

const showMessage = (title, message) => {
  modalMontainer.classList.add("show");
  modal.innerHTML = "";
  const containerMessage = document.createElement("div");
  const titleMessge = document.createElement("h1");
  const contentMessage = document.createElement("div");
  titleMessge.textContent = title;
  contentMessage.innerHTML = message;
  containerMessage.insertAdjacentElement("afterbegin", titleMessge);
  containerMessage.insertAdjacentElement("beforeend", contentMessage);
  modal.appendChild(containerMessage);
};

const paintInputError = () => {
  modalMontainer.classList.remove("show");
  if (!offset.value && !message.value) {
    message.classList.add("shake");
    offset.classList.add("shake");
  }
  if (!offset.value) {
    offset.classList.add("shake");
  }
  if (!message.value) {
    message.classList.add("shake");
  }
};

message.addEventListener("change", () => message.classList.remove("shake"));
offset.addEventListener("change", () => offset.classList.remove("shake"));

inputCountry.addEventListener("change", () => {
  for (let i = 0; i < countries.length; i++) {
    if (inputCountry.value === countries[i].country) {
      targetCel.value = countries[i].prefix;
    }
  }
});

botonEncode.addEventListener("click", function () {
  //boton cifrar
  const title = "Tu mensaje cifrado es:";
  try {
    const messageEncode = cipher.encode(parseInt(offset.value), message.value);
    showMessage(title, messageEncode);
    sendWhatapp(messageEncode);
  } catch (error) {
    printToatsNotification(error.message);
    paintInputError(error.message);
  }
});

botonDecode.addEventListener("click", function () {
  // boton descifrar
  const title = "Tu mensaje descifrado es:";
  try {
    const messageDecode = cipher.encode(parseInt(offset.value), message.value);
    showMessage(title, messageDecode);
    sendWhatapp(messageDecode);
  } catch (error) {
    printToatsNotification(error.message);
    paintInputError();
  }
});

btnInfo.addEventListener("click", () =>
  showMessage("Bienvenidos....", instructions)
);
btnCloseModal.addEventListener("click", () =>
  modalMontainer.classList.remove("show")
);

listCountries();
