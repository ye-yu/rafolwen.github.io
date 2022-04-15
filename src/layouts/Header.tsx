import { observer } from 'mobx-react';
import { Display } from '../components/Display';
import stylesheet from '../styles';

function Header() {
  return <div style={stylesheet.ColumnFlex}>

    {/* TITLE */}
    <div style={stylesheet.FlexItemGrow}>
      <Display style={{textAlign: "center", marginTop: "2rem"}}>
        Raflie Zainuddin
      </Display>
    </div>
  </div>
}

export default observer(Header)