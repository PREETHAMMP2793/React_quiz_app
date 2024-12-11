/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/TestPage.css';

const TestPage = ({ questions, onSubmit }) => {
  const [answers, setAnswers] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(questions[0]?.category);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds
  const navigate = useNavigate();
  const [lastQuestionAlertShown, setLastQuestionAlertShown] = useState(false);

  useEffect(() => {
    // Timer countdown logic
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);

  // Handle time up
  const handleTimeUp = () => {
    alert("Time is up! Submitting your test.");
    handleSubmit();
  };

  // Convert seconds to MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (Object.keys(answers).length === questions.length - 1 && !lastQuestionAlertShown) {
      alert("This is your last question!");
      setLastQuestionAlertShown(true);
    }
  }, [answers, questions.length, lastQuestionAlertShown]);

  const handleAnswerChange = (e) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: e.target.value,
    }));
  };

  const handleNext = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
      setCurrentCategory(questions[questionIndex + 1]?.category);
    }
  };

  const handlePrev = () => {
    if (questionIndex > 0) {
      setQuestionIndex((prev) => prev - 1);
      setCurrentCategory(questions[questionIndex - 1]?.category);
    }
  };

  const handleQuestionClick = (index) => {
    setQuestionIndex(index);
    setCurrentCategory(questions[index]?.category);
  };

  const handleSubmit = () => {
    const finalAnswers = { ...answers }; // Ensure answers object is cloned
    const score = questions.reduce((score, question, index) => {
      if (finalAnswers[index] === question.answer) {
        score++;
      }
      return score;
    }, 0);
  
    onSubmit(score, finalAnswers);
    navigate('/result');
  };
  
  const currentQuestion = questions[questionIndex];

  // Group questions by category
  const categories = questions.reduce((acc, question, index) => {
    if (!acc[question.category]) acc[question.category] = [];
    acc[question.category].push({ ...question, index });
    return acc;
  }, {});

  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;

  return (
    <div className="test-container nunito-nun">
      {/* <Navbar /> */}
      <div className="row">
        {/*Left Side: Question and Options */}
        <div className="col-md-8 d-flex flex-column justify-content-between">
          <h2>{currentCategory} - Question {questionIndex + 1}</h2>
          <div className="question-box">
            <h4>{currentQuestion.question}</h4>
            <div className="options-container">
              {currentQuestion.options.map((option) => (
                <div key={option} className="option-item">
                  <input
                    type="radio"
                    id={`option-${option}`}
                    name={`question-${questionIndex}`}
                    value={option}
                    checked={answers[questionIndex] === option}
                    onChange={handleAnswerChange}
                  />
                  <label htmlFor={`option-${option}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex justify-content-between mt-4 ">
            <button
              onClick={handlePrev}
              className="btn btn-secondary"
              disabled={questionIndex === 0}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="btn btn-primary"
              disabled={questionIndex === questions.length - 1}
            >
              Next
            </button>
          </div>
        </div>

        {/* Right Side: Question Pallet */}
        <div className="col-md-4">
          <div className="question-pallet">
            <h5>Time Remaining: {formatTime(timeRemaining)}</h5>
            <div className="progress my-3">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${progress}%` }}
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {Math.round(progress)}%
              </div>
            </div>
            <div className="accordion" id="category-accordion">
              {Object.keys(categories).map((category, idx) => (
                <div key={category} className="accordion-item">
                  <h2 className="accordion-header" id={`heading-${idx}`}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse-${idx}`}
                      aria-expanded="false"
                      aria-controls={`collapse-${idx}`}
                    >
                      {category}
                    </button>
                  </h2>
                  <div
                    id={`collapse-${idx}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading-${idx}`}
                    data-bs-parent="#category-accordion"
                  >
                    <div className="accordion-body">
                      {categories[category].map((question) => (
                        <button
                          key={question.index}
                          className={`btn m-1 ${
                            answers[question.index]
                              ? 'btn-outline-success'
                              : 'btn-outline-danger'
                          } ${questionIndex === question.index ? 'active' : ''}`}
                          onClick={() => handleQuestionClick(question.index)}
                        >
                          {question.index + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="btn btn-success mt-4 w-100"
              onClick={handleSubmit}
              disabled={answeredCount < questions.length}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
