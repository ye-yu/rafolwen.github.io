import AVATAR from "./assets/avatar.jpg";
import "./App.css";
import { observer } from "mobx-react";
import { useStores } from "./stores";
import useBreakpoint from "./hooks/useBreakpoint";
import { useState, useEffect } from "react";

function App() {
  const { appState } = useStores();
  const { theme } = appState;
  const { breakpoint } = useBreakpoint();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
      };

      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className={`${breakpoint} ${theme}`}>
      {/* TODO: refactor into header component */}
      <div className="header">
        <div className="header-info">
          <div
            className="avatar"
            style={{
              display: scrollPosition > 100 ? "none" : undefined,
            }}
          >
            <img
              style={{
                // ...stylesheet.RoundImage(breakpoint),
                borderRadius: "100%",
                width: Math.max(0, 100 - scrollPosition),
                height: Math.max(0, 100 - scrollPosition),
              }}
              src={AVATAR}
              alt="Avatar of Raflie Zainuddin"
            />
          </div>
          <div className="name-contact">
            <div className="name">
              <div className="raflie">raflie</div>
              <div className="zainuddin">zainuddin</div>
            </div>
            <div
              className="contact"
              style={{
                display: scrollPosition > 100 ? "none" : undefined,
              }}
            >
              contact@raflie.cc
            </div>
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
