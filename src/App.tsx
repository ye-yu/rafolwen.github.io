import React from 'react';
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
      minHeight: "100vh",
      minWidth: "100vw",
      display: "flex",
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{
        backgroundColor: "rgba(255,255,255,0.6)",
        flex: 1,
      }}>
        <Header />
      </div>
    </div>
  );
}

export default App;
