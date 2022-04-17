import React from 'react';
import { observer } from "mobx-react";
import { ThemeMode } from "../components/ThemeMode";
import stylesheet from "../styles";
import { useStores } from '../stores';

function Toolbar() {
  const { appState } = useStores()
  React.useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      appState.setTheme("dark")
    } else {
      appState.setTheme("light")
    }
  })
  return <div style={{...stylesheet.RowFlex, justifyContent: "right", paddingRight: "3rem", paddingTop: "1rem"}}>
    <ThemeMode
      defaultState={appState.theme ?? "light"}
      onChange={state => console.log("New state:", state)}
    />
  </div>
}

export default observer(Toolbar)