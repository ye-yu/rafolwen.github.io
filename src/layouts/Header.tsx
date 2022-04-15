import { observer } from 'mobx-react';
import { Display } from '../components/Display';
import { HighlightButton } from '../components/HighlightButton';
import useBreakpoint from '../hooks/useBreakpoint';
import stylesheet from '../styles';

function Header() {
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
        <HighlightButton size={1.5} style={breakpoint === "desktop" ? {} : stylesheet.FlexItemCouple} active>
          Backend
        </HighlightButton>
        <HighlightButton size={1.5} style={breakpoint === "desktop" ? {} : stylesheet.FlexItemCouple}>
          Cloud
        </HighlightButton>
        <HighlightButton size={1.5} style={breakpoint === "desktop" ? {} : stylesheet.FlexItemCouple}>
          Data
        </HighlightButton>
        <HighlightButton size={1.5} style={breakpoint === "desktop" ? {} : stylesheet.FlexItemCouple}>
          Contact
        </HighlightButton>
      </div>
    </div>
  </div>
}

export default observer(Header)