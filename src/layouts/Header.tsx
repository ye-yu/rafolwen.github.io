import React from "react";
import { observer } from "mobx-react";
import { Display } from "../components/Display";
import { HighlightButton } from "../components/HighlightButton";
import useBreakpoint from "../hooks/useBreakpoint";
import stylesheet from "../styles";
import CardItem from "./CardItem";
import { project } from "../constants/projects";
import AVATAR from "../assets/avatar.jpg";
import { Contact } from "./Contact";
import FadeIn from "react-fade-in";
import { useStores } from "../stores";

function Header() {
  const {
    appState: { theme: mode },
  } = useStores();
  const [headerSelection, setHeaderSelection] = React.useState<
    keyof typeof project | "Contact"
  >("Backend");
  const { breakpoint } = useBreakpoint();

  return (
    <div style={stylesheet.ColumnFlex}>
      {/* TITLE */}
      <div style={stylesheet.FlexItemGrow}>
        <Display style={stylesheet.CenteredResponsive(breakpoint)}>
          Raflie Zainuddin
        </Display>
      </div>
      <div style={stylesheet.RowFlex}>
        <button
          style={{
            padding: "5px 10px",
            letterSpacing: "0.1rem",
            marginTop: "-1rem",
            marginBottom: "2rem",
            ...stylesheet.RowFlex,
          }}
          className={`button-${mode}`}
          onClick={() =>
            (window.location.href =
              "/resumes/Raflie Zainuddin - Backend Developer March 2023.pdf")
          }
        >
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
          </svg>{" "}
          <span
            style={{
              marginLeft: "0.5rem",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            RESUME
          </span>
        </button>
      </div>
      <div style={stylesheet.FlexItemGrow}>
        <div
          style={{
            ...stylesheet.RowFlex,
            maxWidth:
              breakpoint === "mobile"
                ? "100%"
                : breakpoint === "tablet"
                ? 600
                : 900,
            margin: "auto",
          }}
        >
          <HighlightButton
            mode={mode}
            size={1.5}
            style={breakpoint === "desktop" ? {} : stylesheet.FlexItemCouple}
            key="Backend"
            active={headerSelection === "Backend"}
            onClick={() => setHeaderSelection("Backend")}
          >
            Backend
          </HighlightButton>
          <HighlightButton
            mode={mode}
            size={1.5}
            style={breakpoint === "desktop" ? {} : stylesheet.FlexItemCouple}
            key="Cloud"
            active={headerSelection === "Cloud"}
            onClick={() => setHeaderSelection("Cloud")}
          >
            Cloud
          </HighlightButton>
          <HighlightButton
            mode={mode}
            size={1.5}
            style={breakpoint === "desktop" ? {} : stylesheet.FlexItemCouple}
            key="Data"
            active={headerSelection === "Data"}
            onClick={() => setHeaderSelection("Data")}
          >
            Data
          </HighlightButton>
          <HighlightButton
            mode={mode}
            size={1.5}
            style={breakpoint === "desktop" ? {} : stylesheet.FlexItemCouple}
            key="Contact"
            active={headerSelection === "Contact"}
            onClick={() => setHeaderSelection("Contact")}
          >
            Contact
          </HighlightButton>
        </div>
      </div>
      <div style={stylesheet.FlexItemGrow}>
        <FadeIn key={headerSelection}>
          <div
            style={{
              ...(breakpoint === "mobile"
                ? stylesheet.ColumnFlex
                : stylesheet.RowFlex),
              width:
                breakpoint === "mobile"
                  ? "80%"
                  : breakpoint === "tablet"
                  ? 900
                  : 1200,
              margin: "5rem auto 1rem",
            }}
          >
            {headerSelection === "Contact" ? (
              <>
                <div
                  style={{
                    flexBasis:
                      breakpoint === "mobile"
                        ? "unset"
                        : breakpoint === "tablet"
                        ? 280
                        : 310,
                    textAlign: "center",
                    alignSelf: "center",
                  }}
                >
                  <img
                    style={stylesheet.RoundImage(breakpoint)}
                    src={AVATAR}
                    alt="avatar"
                  />
                </div>
                <Contact
                  style={{
                    alignSelf: "center",
                    flexBasis:
                      breakpoint === "mobile"
                        ? "unset"
                        : 2 * (breakpoint === "tablet" ? 280 : 310),
                  }}
                />
              </>
            ) : (
              project[headerSelection].map(({ title, pills, content }, i) => (
                <CardItem
                  center={breakpoint === "tablet"}
                  style={{
                    flexBasis:
                      breakpoint === "mobile"
                        ? "unset"
                        : breakpoint === "tablet"
                        ? 280
                        : 310,
                    marginBottom: breakpoint === "mobile" ? "3rem" : "unset",
                  }}
                  title={title}
                  pills={pills}
                  content={content}
                  key={`${headerSelection}-${i}`}
                />
              ))
            )}
          </div>
        </FadeIn>
      </div>
      <div style={stylesheet.FlexItemGrow}>
        <HighlightButton
          mode={mode}
          size={1.5}
          style={{
            textAlign: "center",
            margin: "5rem auto",
          }}
          onClick={() => window.open("https://github.com/ye-yu/", "_blank")}
        >
          Browse for more project
        </HighlightButton>
      </div>
    </div>
  );
}

export default observer(Header);
