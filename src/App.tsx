import AVATAR from "./assets/avatar.jpg";
import "./App.css";
import { observer } from "mobx-react";
import { useStores } from "./stores";
import stylesheet from "./styles";
import useBreakpoint from "./hooks/useBreakpoint";

function App() {
  const { appState } = useStores();
  const { theme } = appState;
  const { breakpoint } = useBreakpoint();

  return (
    <div className={`${breakpoint} ${theme}`}>
      <div className="header">
        <div className="header-info">
          <div className="avatar">
            <img
              style={stylesheet.RoundImage(breakpoint)}
              src={AVATAR}
              alt="Avatar of Raflie Zainuddin"
            />
          </div>
          <div className="name-contact">
            <div className="name">
              <div className="raflie">raflie</div>
              <div className="zainuddin">zainuddin</div>
            </div>
            <div className="contact">contact@raflie.cc</div>
          </div>
        </div>
        <div className="header-navbar">
          <ul>
            <li className="active">about</li>
            <li>skillset</li>
            <li>blogs</li>
            <li
              style={{
                margin: 0,
                display: breakpoint === "mobile" ? "none" : undefined,
              }}
            >
              <div
                className="header-theme"
                onClick={() =>
                  appState.setTheme(theme === "light" ? "dark" : "light")
                }
              >
                <div className={theme ?? "light"}></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default observer(App);
