import { useState } from 'react';
import { HashRouter, Route, Routes, } from 'react-router-dom';
import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';
import './App.css';
import Login from './pages/Login';
import SummarySettings from './pages/SummarySettings';
import Layout from './pages/Layout';


function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={ <Layout/> } >
            <Route index element={ <Login /> } />          
            <Route path='/summary' element={ <SummarySettings /> } />          
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
