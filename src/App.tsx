import BGIMG from './assets/bg.jpg';
import './App.css';
import Header from './layouts/Header';
import Toolbar from './layouts/Toolbar';
import { observer } from 'mobx-react';
import { useStores } from './stores';

function App() {
  const { appState: { theme } } = useStores()

  return (
    <div style={{
      backgroundImage: `url(${BGIMG})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      margin: 0,
      padding: 0,
      height: "100vh",
      width: "100vw",
      display: "flex",
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{
        backgroundColor: theme === "light" ? "rgba(255,255,255,0.8)" : "rgba(20,20,20,0.8)",
        color: theme === "light" ? "black" : "#DFDFDF",
        flex: 1,
        overflowY: "auto",
        overflowX: "hidden",
        transition: "all ease 1s",
      }}>
        <Toolbar />
        <Header />
      </div>
      <div className="build-name">{
        process.env.REACT_APP_BUILD_NAME ?? "development"
      }</div>
    </div>
  );
}

export default observer(App);
