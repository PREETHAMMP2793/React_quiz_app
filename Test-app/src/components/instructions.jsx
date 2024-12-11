/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/instructions.css'
import Navbar from "./Navbar";


function Instructions() {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate(); // useNavigate instead of useHistory

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleStartQuiz = () => {
    if (isChecked) {
      navigate("/test"); // Redirect to the test page
    }
  };

  return (
    <div className="instructions-container ins-bg nunito-nun">
      <Navbar/>
    <div className=" text-black">
      <h2>Instructions for the Quiz</h2>
      <div>
        <h3>Do's:</h3>
        <ul>
          <li>Answer all questions to the best of your ability.</li>
          <li>Make sure to manage your time wisely during the quiz.</li>
          <li>Click on 'Submit' when you're ready to finish the quiz.</li>
          <li>Make sure you see the timer</li>
        </ul>
      </div>
      <div>
        <h3>Don'ts:</h3>
        <ul>
          <li>Do not attempt to cheat or seek help from external sources.</li>
          <li>Do not leave the page during the quiz without submitting it.</li>
          <li>Do not refresh the page once you start the quiz.</li>
          <li>Do not use any forbidden materials or devices during the quiz.</li>
          <li>Do not switch tabs</li>
        </ul>
      </div>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="instructionsCheck"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label className="form-check-label" htmlFor="instructionsCheck">
          I have read and understood the instructions
        </label>
        <h2> All The Best</h2>
      </div>
      <button
        className="btn btn-primary mt-3"
        onClick={handleStartQuiz}
        disabled={!isChecked}
      >
        Start Quiz
      </button>
    </div>
    </div>
  );
}

export default Instructions;
