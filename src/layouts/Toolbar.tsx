import { ThemeMode } from "../components/ThemeMode";
import stylesheet from "../styles";

export function Toolbar() {
  return <div style={{...stylesheet.RowFlex, justifyContent: "right", paddingRight: "3rem", paddingTop: "1rem"}}>
    <ThemeMode
      defaultState="light"
      onChange={state => console.log("New state:", state)}
    />
  </div>
}
