/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const TestPage = ({ questions, onSubmit }) => {
  const [answers, setAnswers] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  const handleAnswerChange = (e) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: e.target.value,
    }));
  };

  const handleNext = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (questionIndex > 0) {
      setQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    const score = Object.keys(answers).reduce((score, key) => {
      if (answers[key] === questions[key].answer) {
        score++;
      }
      return score;
    }, 0);
    onSubmit(score);
  };

  const currentQuestion = questions[questionIndex];

  return (
    <div className="container">
      <Navbar />
      <h2>Test Page</h2>
      <div>
        <h3>{currentQuestion.question}</h3>
        {currentQuestion.options.map((option) => (
          <div key={option}>
            <input
              type="radio"
              name={`question-${questionIndex}`}
              value={option}
              checked={answers[questionIndex] === option}
              onChange={handleAnswerChange}
            />
            {option}
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between">
        <button onClick={handlePrev} className="btn btn-secondary">Previous</button>
        <button
          onClick={questionIndex === questions.length - 1 ? handleSubmit : handleNext}
          className="btn btn-primary"
        >
          {questionIndex === questions.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>

      <div>
        <p>Question {questionIndex + 1} of {questions.length}</p>
      </div>
    </div>
  );
};

export default TestPage;
