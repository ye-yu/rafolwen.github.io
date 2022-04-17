import { observer } from "mobx-react";
import { ThemeMode } from "../components/ThemeMode";
import stylesheet from "../styles";
import { useStores } from '../stores';

function Toolbar() {
  const { appState } = useStores()
  return <div style={{...stylesheet.RowFlex, justifyContent: "right", paddingRight: "3rem", paddingTop: "1rem"}}>
    <ThemeMode
      defaultState={appState.theme}
      onChange={state => appState.setTheme(state)}
    />
  </div>
}

export default observer(Toolbar)