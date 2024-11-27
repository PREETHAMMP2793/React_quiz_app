import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import TestPage from './components/TestPage';
import ResultPage from './components/ResultPage';
import AdminPage from './components/AdminPage';
import LoginPage from './components/LoginPage';

import questions from './data/questions.json';

const App = () => {
  const [candidates, setCandidates] = useState([]);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleRegister = (formData) => {
    // Handle registration logic
  };

  const handleSubmitTest = (score) => {
    setScore(score);
    setCandidates([...candidates, { name: "John Doe", score }]); // Sample candidate
  };

  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationForm onRegister={handleRegister} />} />
        <Route path="/test" element={<TestPage questions={questions} onSubmit={handleSubmitTest} />} />
        <Route path="/result" element={<ResultPage score={score} questions={questions} answers={answers} />} />
        <Route path="/admin" element={<AdminPage candidates={candidates} />} />
      </Routes>
    </Router>
  );
};

export default App;
