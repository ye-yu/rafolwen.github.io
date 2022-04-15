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
        <HighlightButton size={1.5} active>
          Hello
        </HighlightButton>
        <HighlightButton size={1.5}>
          Hello
        </HighlightButton>
        <HighlightButton size={1.5}>
          Hello
        </HighlightButton>
        <HighlightButton size={1.5}>
          Hello
        </HighlightButton>
      </div>
    </div>
  </div>
}

export default observer(Header)