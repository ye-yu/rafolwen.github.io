import AVATAR from "./assets/avatar.jpg";
import "./App.css";
import { observer } from "mobx-react";
import { useStores } from "./stores";
import useBreakpoint from "./hooks/useBreakpoint";
import { useState, useEffect, useCallback, useMemo } from "react";

function App() {
  const { appState } = useStores();
  const { theme } = appState;
  const { breakpoint } = useBreakpoint();
  const [scrollPosition, setScrollPosition] = useState(0);

  const getScrollHeightForDom = useCallback((domId: string): number | null => {
    const dom = document.getElementById(domId);
    if (!dom) {
      return null;
    }

    return dom.clientHeight - 200;
  }, []);

  const passedAboutHeight = true;

  const passedSkillSetHeight = useMemo(() => {
    const aboutHeight = getScrollHeightForDom("about");
    if (aboutHeight === null) {
      return false;
    }

    return scrollPosition > aboutHeight;
  }, [getScrollHeightForDom, scrollPosition]);

  const passedBlogsHeight = useMemo(() => {
    const aboutHeight = getScrollHeightForDom("about");
    if (aboutHeight === null) {
      return false;
    }

    const skillsetHeight = getScrollHeightForDom("skillset");
    if (skillsetHeight === null) {
      return false;
    }

    const totalHeight = aboutHeight + skillsetHeight;

    return scrollPosition > totalHeight;
  }, [getScrollHeightForDom, scrollPosition]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
      };

      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [getScrollHeightForDom]);

  return (
    <div className={`${breakpoint} ${theme}`}>
      {/* TODO: refactor into header component */}
      <div className="fixed-top">
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
              <li
                className={
                  passedAboutHeight &&
                  !passedSkillSetHeight &&
                  !passedBlogsHeight
                    ? "active"
                    : ""
                }
              >
                <a href="#">about</a>
              </li>
              <li
                className={
                  passedAboutHeight &&
                  passedSkillSetHeight &&
                  !passedBlogsHeight
                    ? "active"
                    : ""
                }
              >
                <a href="#skillset">skillset</a>
              </li>
              <li
                className={
                  passedAboutHeight && passedSkillSetHeight && passedBlogsHeight
                    ? "active"
                    : ""
                }
              >
                <a href="#blogs">blogs</a>
              </li>
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
      <div className="spacing"></div>
      <div className="section about" id="about">
        <div className="section-name">about</div>
        <div className="content">content</div>
      </div>
      <div className="section skillset" id="skillset">
        <div className="section-name">skillset</div>
        <div className="content">
          <div className="spacing">content</div>
        </div>
      </div>
      <div className="section blogs" id="blogs">
        <div className="section-name">blogs</div>
        <div className="content">content</div>
      </div>
    </div>
  );
}

export default observer(App);
