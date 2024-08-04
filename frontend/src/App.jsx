// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentList from './StudentList';
import StudentDetails from './StudentDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/students/:id" element={<StudentDetails />} />
      </Routes>
    </div>
  );
}

export default App;
