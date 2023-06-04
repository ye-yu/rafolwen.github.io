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

import LOGO_TS from "./assets/logos/typescript.svg";
import LOGO_ESBUILD from "./assets/logos/esbuild.svg";
import LOGO_NESTJS from "./assets/logos/nestjs.svg";
import LOGO_EXPRESSJS from "./assets/logos/expressjs.png";
import LOGO_MYSQL from "./assets/logos/mysql.svg";
import LOGO_POSTGRESQL from "./assets/logos/postgresql.svg";
import LOGO_REDIS from "./assets/logos/redis.svg";
import PROJECTS_UNTYPED from "./assets/blogs.json";

type Projects = {
  link: string;
  title: string;
  description: string;
  thumbnail: string;
  timestamp: string;
  categories: string[];
};

const projects: Projects[] = PROJECTS_UNTYPED;

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
              ></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="spacing"></div>
      <div className="section about" id="about">
        <div
          className="section-name"
          style={{ display: breakpoint === "mobile" ? "none" : undefined }}
        ></div>
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
            <a
              className="button primary no-visited"
              href="mailto:contact@raflie.cc"
            >
              <div>contact@raflie.cc</div>
            </a>
            <a
              className="button secondary no-visited"
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
          <div className="cards">
            <div className="card">
              <div className="logos">
                <img src={LOGO_TS} alt="TypeScript" />
                <img src={LOGO_ESBUILD} alt="ESBuild" />
              </div>
              <div className="title">Plain TypeScript (w esbuild)</div>
              <div className="description">
                <p>
                  <span className="bold">TypeScript</span> is my strongest skill
                  in application development. I use{" "}
                  <span className="bold">esbuild</span> for blazingly-fast TS to
                  JS compilation while also making use of `tsc --noEmit` for
                  typechecking utility.
                </p>
                <p>
                  See how I also transfer the similar technique to{" "}
                  <span className="bold">Deno</span> application.
                </p>
              </div>
              <div className="cta">
                <a href="/">see related projects &rarr;</a>
              </div>
            </div>
            <div className="card">
              <div className="logos">
                <img src={LOGO_NESTJS} alt="NestJS" />
                <img src={LOGO_EXPRESSJS} alt="ExpressJS" />
              </div>
              <div className="title">NestJS API Server</div>
              <div className="description">
                <p>
                  For battle-tested production API server, my first choice would
                  be creating a <span className="bold">NestJS</span>{" "}
                  application. Each endpoint would be module-scoped to ensure
                  high maintainability for production and testing environment.
                </p>
                <p>
                  I also have experience using both{" "}
                  <span className="bold">ExpressJS</span> and{" "}
                  <span className="bold">Fastify</span> platform as the API
                  engine.
                </p>
              </div>
              <div className="cta">
                <a href="/">see related projects &rarr;</a>
              </div>
            </div>
            <div className="card">
              <div className="logos">
                <img src={LOGO_MYSQL} alt="MySQL" />
                <img src={LOGO_POSTGRESQL} alt="PostgreSQL" />
                <img src={LOGO_REDIS} alt="Redis" />
              </div>
              <div className="title">MySQL, PostgreSQL, & Redis</div>
              <div className="description">
                <p>
                  For basic data storage, I will usually utilize{" "}
                  <span className="bold">MySQL</span> and
                  <span className="bold">PostgresSQL</span> as the primary
                  databases, allowing efficient storage and retrieval of data.
                  Additionally, I am well-versed in implementing{" "}
                  <span className="bold">Redis</span> as a hot data storage
                  solution, enhancing performance and responsiveness in my
                  applications.
                </p>
              </div>
              <div className="cta">
                <a href="/">see related projects &rarr;</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section blogs" id="blogs">
        <div className="section-name">blogs</div>
        <div className="content">
          <div className="blogs-content">
            {projects.map((e, i) => (
              <div className="blogs-item" key={e.link}>
                <div
                  className="thumbnail"
                  style={{
                    background: `url(${e.thumbnail})`,
                    backgroundSize: "cover",
                  }}
                >
                  {" "}
                </div>
                <div className="item">
                  <div className="title">
                    <a href={e.link}>
                      [{i + 1}] {e.title}
                    </a>
                  </div>
                  <div className="timestamp">
                    {new Date(e.timestamp).toLocaleString()}
                  </div>
                  <div className="categories">
                    {e.categories.map((e) => (
                      <span key={e}>{e}</span>
                    ))}
                  </div>
                  <div className="description">{e.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="theme-switch">
        <div
          // className="header-theme"
          onClick={() =>
            appState.setTheme(theme === "light" ? "dark" : "light")
          }
        >
          {theme === "light" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="yellow"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-sun"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-moon"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

export default observer(App);
