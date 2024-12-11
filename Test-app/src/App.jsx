import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import TestPage from './components/TestPage';
import ResultPage from './components/ResultPage';
import AdminPage from './components/AdminPage';
import LoginPage from './components/LoginPage';
import questions from './data/questions.json';
import Instructions from './components/instructions';

// import logo from './assets/logo-removebg-preview.png'
import './App.css'


const App = () => {
  const [candidates, setCandidates] = useState([]);
  const [score, setScore] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [answers, setAnswers] = useState({});

  // eslint-disable-next-line no-unused-vars
  const handleRegister = (formData) => {
    // Handle registration logic
  };

  const handleSubmitTest = (finalScore, finalAnswers) => {
    setScore(finalScore);
    setAnswers(finalAnswers); // Store the user's answers
    setCandidates([...candidates, { name: "John Doe", score: finalScore }]); // Sample candidate
  };

  return (
    <div >
      <Router>
        <Routes>
        <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationForm onRegister={handleRegister} />} />
          <Route path="/test" element={<TestPage questions={questions} onSubmit={handleSubmitTest} />} />
          <Route path="/result" element={<ResultPage score={score} questions={questions} answers={answers} userDetails={{name:'abc',email:'abc@gmail.com'}} candidates={candidates}/>} />
          <Route path="/admin" element={<AdminPage candidates={candidates} />} />
          <Route path='/instructions' element={<Instructions/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
