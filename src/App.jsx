import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Main from "./pages/MainPage.jsx";
import Health from './pages/HealthPage.jsx';
import Food from './pages/FoodPage.jsx';
import Education from './pages/EducationPage.jsx';
import Security from './pages/SecurityPage.jsx';
import Tourism from './pages/TourismPage.jsx';
import Header from '/src/modules/Header.jsx';
import Sidebar from './modules/Sidebar.jsx';
import Footer from './modules/Footer.jsx';
import './App.css';

function App() {

  return (
    <>
      <BrowserRouter>
        <PageLayout />
      </BrowserRouter>
    </>
  )
}

function PageLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = {
      '/': 'main',
      '/main': 'main',
      '/health': 'health',
      '/food': 'food',
      '/education': 'education',
      '/security': 'security',
      '/tourism': 'tourism'
    }[pathname] || 'main';

    document.body.dataset.page = page;

    return () => {
      delete document.body.dataset.page;
    };
  }, [pathname]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/health" element={<Health />} />
        <Route path="/food" element={<Food />} />
        <Route path="/education" element={<Education/>}/>
        <Route path="/tourism" element={<Tourism/>}/>
        <Route path="/security" element={<Security/>}/>
      </Routes>
      <Footer />
      <Sidebar />
    </>
  );
}

export default App
