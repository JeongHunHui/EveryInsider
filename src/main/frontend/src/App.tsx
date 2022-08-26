import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="contentWrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/:type" element={<MainPage />} />
            <Route path="/:type/:page" element={<MainPage />} />
            <Route path="/writePage" element={<WritePage />} />
            <Route path="/postPage/:id" element={<PostPage />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
