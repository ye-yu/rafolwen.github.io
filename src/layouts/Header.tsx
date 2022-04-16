import React from 'react';
import { observer } from 'mobx-react';
import { Display } from '../components/Display';
import { HighlightButton } from '../components/HighlightButton';
import useBreakpoint from '../hooks/useBreakpoint';
import stylesheet from '../styles';
import { CardItem } from './CardItem';
import { project } from '../constants/projects';

function Header() {
  const [headerSelection, setHeaderSelection] = React.useState("Backend")
  const { breakpoint } = useBreakpoint()

  return <div style={stylesheet.ColumnFlex}>

    {/* TITLE */}
    <div style={stylesheet.FlexItemGrow}>
      <Display style={{
        textAlign: "center",
        marginTop: breakpoint === "mobile" ? "5rem" : "9rem",
        marginBottom: breakpoint === "mobile" ? "1rem" : "3rem",
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: breakpoint === "mobile" ? "50%" : "100%",
      }}>
        Raflie Zainuddin
      </Display>
    </div>
    <div style={stylesheet.FlexItemGrow}>
      <div style={{
        ...stylesheet.RowFlex,
        maxWidth: breakpoint === "mobile" ? "100%" : breakpoint === "tablet" ? 600 : 900,
        margin: "auto",
      }}>
        <HighlightButton
          size={1.5}
          style={breakpoint === "desktop" ? {} : stylesheet.FlexItemCouple}
          key="Backend" active={headerSelection === "Backend"}
          onClick={() => setHeaderSelection("Backend")}>
          Backend
        </HighlightButton>
        <HighlightButton
          size={1.5}
          style={breakpoint === "desktop" ? {} : stylesheet.FlexItemCouple}
          key="Cloud" active={headerSelection === "Cloud"}
          onClick={() => setHeaderSelection("Cloud")}>
          Cloud
        </HighlightButton>
        <HighlightButton
          size={1.5}
          style={breakpoint === "desktop" ? {} : stylesheet.FlexItemCouple}
          key="Data" active={headerSelection === "Data"}
          onClick={() => setHeaderSelection("Data")}>
          Data
        </HighlightButton>
        <HighlightButton
          size={1.5}
          style={breakpoint === "desktop" ? {} : stylesheet.FlexItemCouple}
          key="Contact" active={headerSelection === "Contact"}
          onClick={() => setHeaderSelection("Contact")}>
          Contact
        </HighlightButton>
      </div>
    </div>
    <div style={stylesheet.FlexItemGrow}>
      <div style={{
        ...(breakpoint === "mobile" ? stylesheet.ColumnFlex : stylesheet.RowFlex),
        width: breakpoint === "mobile" ? "80%" : breakpoint === "tablet" ? 900 : 1200,
        margin: "5rem auto 1rem",
      }}>
        {
          project.Backend.map(({ title, pills, content }, i) => <CardItem
            center={breakpoint === "tablet"}
            style={{
              flexBasis: breakpoint === "mobile" ? "unset" : breakpoint === "tablet" ? 280 : 310,
              marginBottom: breakpoint === "mobile" ? "3rem" : "unset",
            }}
            title={title}
            pills={pills}
            content={content}
            key={`Backend-${i}`}
          />)
        }
      </div>
    </div>
    <div style={stylesheet.FlexItemGrow}>
      <HighlightButton
        size={1.5}
        style={{
          textAlign: "center",
          marginTop: "5rem",
        }}
        onClick={() => window.open("https://github.com/ye-yu/", "_blank")}
      >
        Browse for more project
      </HighlightButton>
    </div>
  </div>
}

export default observer(Header)