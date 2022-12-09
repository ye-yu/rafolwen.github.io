import BGIMG from "./assets/bg.jpg";
import "./App.css";
import Header from "./layouts/Header";
import Toolbar from "./layouts/Toolbar";
import { observer } from "mobx-react";
import { useStores } from "./stores";
import BlogPosts from "./layouts/BlogPosts";
import {
  FontSize,
  FontWeight,
  PrimaryText,
  SecondaryText,
} from "./components/atoms/Texts";
import stylesheet from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "./components/atoms/Icons";

function App() {
  const {
    appState: { theme },
  } = useStores();

  return (
    <div style={stylesheet.ColumnFlex}>
      <FontAwesomeIcon color="black" size="2x" icon={IconName.user} />
    </div>
  );
}

export default observer(App);
