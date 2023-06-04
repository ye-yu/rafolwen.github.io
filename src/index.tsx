import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ContextProvider } from "./stores";

import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
if (container === null) {
  console.error("No element with id = 'root' is in the page!");
} else {
  const root = createRoot(container);
  root.render(
    <ContextProvider>
      <App />
    </ContextProvider>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

async function refreshFromBuildName() {
  let reactAppBuildName: null | string = null;
  try {
    const buildNumber = await fetch("/build");
    if (buildNumber.headers.get("content-type")?.includes("text/plain")) {
      reactAppBuildName = await buildNumber.text();
      reactAppBuildName = reactAppBuildName.trim();
    } else {
    }
  } catch (error) {
    console.error("failed to fetch latest build number:", error);
  }

  if (!reactAppBuildName) {
    return;
  }

  console.log("got build number:", reactAppBuildName)
  const buildNameKey = "build_name";
  const buildName = localStorage.getItem(buildNameKey);
  if (buildName === reactAppBuildName) {
    return;
  }

  localStorage.setItem(buildNameKey, reactAppBuildName);
}

refreshFromBuildName();
