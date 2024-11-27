import React from 'react';

const ResultPage = ({ score, questions, answers }) => {
  return (
    <div className="container">
      <h2>Test Results</h2>
      <h3>Your Score: {score} / {questions.length}</h3>
      <div>
        {questions.map((question, index) => (
          <div key={index}>
            <p><strong>{question.question}</strong></p>
            <p>Your Answer: {answers[index]}</p>
            <p>Correct Answer: {question.answer}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultPage;
