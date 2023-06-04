import AVATAR from "./assets/avatar.jpg";
import "./App.css";
import { observer } from "mobx-react";
import { useStores } from "./stores";
import useBreakpoint from "./hooks/useBreakpoint";
import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  MouseEventHandler,
} from "react";

function App() {
  const { appState } = useStores();
  const { theme } = appState;
  const { breakpoint } = useBreakpoint();
  const [scrollPosition, setScrollPosition] = useState(0);

  const getScrollHeightForDom = useCallback(
    (domId: string, offset = 200): number | null => {
      const dom = document.getElementById(domId);
      if (!dom) {
        return null;
      }

      return dom.clientHeight - offset;
    },
    []
  );

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

  const scrollTo = (
    domName: "about" | "skillset" | "blogs"
  ): MouseEventHandler => {
    return (event) => {
      let scrollToHeight = 0;
      switch (domName) {
        // allow fallthrough
        // @ts-expect-error
        case "blogs":
          scrollToHeight += getScrollHeightForDom("skillset", 150) ?? 0;
        // eslint-disable-next-line no-fallthrough
        case "skillset":
          scrollToHeight += getScrollHeightForDom("about", 100) ?? 0;
      }

      event.preventDefault();
      window.scrollTo({ top: scrollToHeight });
    };
  };

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
                <a href="#top" onClick={scrollTo("about")}>
                  about
                </a>
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
                <a href="#skillset" onClick={scrollTo("skillset")}>
                  skillset
                </a>
              </li>
              <li
                className={
                  passedAboutHeight && passedSkillSetHeight && passedBlogsHeight
                    ? "active"
                    : ""
                }
              >
                <a href="#blogs" onClick={scrollTo("blogs")}>
                  blogs
                </a>
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
        <div className="content">
          <div className="hello">
            Hi, I am a software engineer,
            <br />
            and I do a lot of{" "}
            <span style={{ fontWeight: "bold" }}>Backend Development</span> .
          </div>
          <div className="description">
            I enjoy digitizing business workflows into automated services
            through API servers, scheduled jobs, and optimizations.
          </div>
          <div className="cta">
            <a className="button primary" href="mailto:contact@raflie.cc">
              <div>contact@raflie.cc</div>
            </a>
            <a
              className="button secondary"
              href="/resumes/Raflie Zainuddin - Backend Developer March 2023.pdf"
            >
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-file-text"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <div>resume</div>
            </a>
          </div>
        </div>
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
