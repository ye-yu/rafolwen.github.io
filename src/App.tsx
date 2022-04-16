import BGIMG from './assets/bg.jpg';
import './App.css';
import Header from './layouts/Header';

function App() {
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
        backgroundColor: "rgba(255,255,255,0.8)",
        flex: 1,
        overflowY: "auto",
        overflowX: "hidden",
      }}>
        <Header />
      </div>
    </div>
  );
}

export default App;
