import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';
import './App.css';
import Login from './pages/Login';
import SummarySettings from './pages/SummarySettings';
import Layout from './pages/Layout';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Layout/> } >
            <Route index element={ <Login /> } />          
            <Route path='/summary' element={ <SummarySettings /> } />          
          </Route>
        </Routes>
      </BrowserRouter>
      <div>
        hello
      </div>
    </>
  );
}

export default App;
