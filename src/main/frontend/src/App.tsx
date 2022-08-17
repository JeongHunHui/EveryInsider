import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import WritePage from './pages/WritePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/WritePage" element={<WritePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
