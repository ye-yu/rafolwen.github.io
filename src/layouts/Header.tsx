import React from 'react';
import { observer } from 'mobx-react';
import { Display } from '../components/Display';
import { HighlightButton } from '../components/HighlightButton';
import useBreakpoint from '../hooks/useBreakpoint';
import stylesheet from '../styles';
import { CardItem } from './CardItem';

function Header() {
  const [headerSelection, setHeaderSelection] = React.useState("Backend")
  const { breakpoint } = useBreakpoint()

  return <div style={stylesheet.ColumnFlex}>

    {/* TITLE */}
    <div style={stylesheet.FlexItemGrow}>
      <Display style={{
        textAlign: "center",
        marginTop: breakpoint === "mobile" ? "2rem" : "9rem",
        marginBottom: breakpoint === "mobile" ? "1rem" : "3rem",
      }}>
        Raflie Zainuddin
      </Display>
      <div style={stylesheet.RowFlex}>
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
      <div style={{
        ...(breakpoint === "mobile" ? stylesheet.ColumnFlex : stylesheet.RowFlex),
        maxWidth: breakpoint === "mobile" ? "100%" : breakpoint === "tablet" ? 900 : 1100,
        margin: "3rem auto 1rem",
      }}>
        <CardItem
          center={breakpoint === "tablet"}
          style={{
            flexBasis: breakpoint === "mobile" ? "unset" : breakpoint === "tablet" ? 280 : 310,
          }}
          title="Project Title"
          pills={["javascript"]}
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, assumenda quisquam? Ex, rem quia maiores delectus sequi quas praesentium ipsa voluptatibus minima sed velit molestias cumque dolorum similique accusamus voluptas."
        />
        <CardItem
          center={breakpoint === "tablet"}
          style={{
            flexBasis: breakpoint === "mobile" ? "unset" : breakpoint === "tablet" ? 280 : 310,
          }}
          title="Project Title"
          pills={["javascript"]}
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, assumenda quisquam? Ex, rem quia maiores delectus sequi quas praesentium ipsa voluptatibus minima sed velit molestias cumque dolorum similique accusamus voluptas."
        />
        <CardItem
          center={breakpoint === "tablet"}
          style={{
            flexBasis: breakpoint === "mobile" ? "unset" : breakpoint === "tablet" ? 280 : 310,
          }}
          title="Project Title"
          pills={["javascript"]}
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, assumenda quisquam? Ex, rem quia maiores delectus sequi quas praesentium ipsa voluptatibus minima sed velit molestias cumque dolorum similique accusamus voluptas."
        />
      </div>
    </div>
  </div>
}

export default observer(Header)