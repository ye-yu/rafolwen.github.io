import "./style.css";
import MAIN_SECTION from "./main-section.html?raw";
import TO_BE_ADDED from "./to-be-added.html?raw";

const app = document.getElementById("app");

function appendToApp(htmlRaw: string) {
  if (!app) {
    throw new Error("no component #app found");
  }
  const mainComponent = document.createElement("template");
  mainComponent.innerHTML = htmlRaw;

  app.appendChild(mainComponent.content.cloneNode(true));
}

appendToApp(MAIN_SECTION);
appendToApp(TO_BE_ADDED);
