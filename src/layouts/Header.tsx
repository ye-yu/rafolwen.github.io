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
        marginTop: breakpoint === "desktop" ? "9rem" : "2rem",
      }}>
        Raflie Zainuddin
      </Display>
      <HighlightButton size={1.5} active>
        Hello
      </HighlightButton>
    </div>
  </div>
}

export default observer(Header)