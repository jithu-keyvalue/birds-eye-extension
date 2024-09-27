import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';
import './App.css';
import Login from './pages/Login';
import SummarySettings from './pages/SummarySettings';
import Layout from './pages/Layout';


function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      hello World
    </div>
  );
}

export default App;
