import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ContextProvider } from './stores';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
if (container === null) {
  console.error("No element with id = 'root' is in the page!")
} else {
  const root = createRoot(container);
  root.render(<ContextProvider><App /></ContextProvider>);  
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
