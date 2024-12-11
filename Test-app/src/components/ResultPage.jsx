// import React, { useState } from "react";
// import { Tab, Tabs, Button, Modal } from "react-bootstrap"; // Using Bootstrap for Tabs and Modal
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Icons for correct/incorrect answers
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";
// import "../styles/results.css";
// // import { useGlobalState } from "../contexts/GlobalStateProvider";

// const ResultPage = ({ score, questions, answers, userDetails }) => {
//   // const { candidates } = useGlobalState();
//   // console.log(candidates.name);
//   const [activeTab, setActiveTab] = useState("Section 1"); // Default active tab
//   const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
//   const navigate = useNavigate();

//   const answeredQuestions = questions.reduce((acc, question, index) => {
//     const category = question.category || "General"; // Default to 'General' if category is missing
//     if (!acc[category]) acc[category] = [];
//     acc[category].push(answers[index]);
//     return acc;
//   }, {}); // Track answers by category

//   const categories = [...new Set(questions.map((q) => q.category))]; // Extract unique categories

//   const calculateCategoryScore = (category) =>
//     questions
//       .filter((q) => q.category === category)
//       .reduce(
//         (sum, q, index) =>
//           answeredQuestions[category][index] === q.answer ? sum + 1 : sum,
//         0
//       );

//   const handleDone = () => {
//     setModalVisible(true);
//   };

//   const handleCloseModal = () => {
//     setModalVisible(false);
//     navigate("/"); // Redirect to home page
//   };

//   return (
//     <div className="mt-4 res-bg nunito-nun">
//       <Navbar />
//       {/* Header Section */}
//       <div className="text-center mb-4">
//         {/* <h4>Welcome, {candidates.name}</h4> */}
        
//         {/* <p>Email: {candidates.email}</p> */}
//         <h4>Total Score: {score} / {questions.length}</h4>
//       </div>

//       {/* Tabs Section */}
//       <Tabs activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)} className="mb-3">
//         {categories.map((category, idx) => (
//           <Tab eventKey={category} title={category} key={idx}>
//             <div>
//               {questions
//                 .filter((q) => q.category === category)
//                 .map((question, index) => {
//                   const userAnswer = answeredQuestions[category][index];
//                   const isCorrect = userAnswer === question.answer;

//                   return (
//                     <div key={index} className="mb-3">
//                       <p>
//                         <strong>Q{index + 1}: {question.question}</strong>
//                       </p>
//                       <p>
//                         <strong>Your Answer:</strong> {userAnswer ? userAnswer : "Not Answered"}{" "}
//                         {userAnswer ? (
//                           isCorrect ? (
//                             <FaCheckCircle className="text-success" />
//                           ) : (
//                             <FaTimesCircle className="text-danger" />
//                           )
//                         ) : null}
//                       </p>
//                       <p>
//                         <strong>Correct Answer:</strong> {question.answer}
//                       </p>
//                       <hr />
//                     </div>
//                   );
//                 })}
//               {/* Category Score */}
//               <h5>
//                 Score for {category}: {calculateCategoryScore(category)} /{" "}
//                 {questions.filter((q) => q.category === category).length}
//               </h5>
//             </div>
//           </Tab>
//         ))}
//       </Tabs>

//       {/* Done Button */}
//       <div className="text-center mt-4">
//         <Button variant="primary" onClick={handleDone}>
//           Done
//         </Button>
//       </div>

//       {/* Confirmation Modal */}
//       <Modal show={modalVisible} onHide={handleCloseModal} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Thank You!</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Thank you for attending the quiz!</p>
//           <p>We will contact you through your registered email for further updates.</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="primary" onClick={handleCloseModal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default ResultPage;

import React, { useState } from "react";
import { Tab, Tabs, Button, Modal, Table, Tooltip, OverlayTrigger } from "react-bootstrap"; // Added Tooltip and OverlayTrigger
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Icons for correct/incorrect answers
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/results.css";

const ResultPage = ({ score, questions, answers, userDetails }) => {
  const [activeTab, setActiveTab] = useState("Section 1"); // Default active tab
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [selectedCategory, setSelectedCategory] = useState(null); // State for selected category
  const navigate = useNavigate();

  const answeredQuestions = questions.reduce((acc, question, index) => {
    const category = question.category || "General"; // Default to 'General' if category is missing
    if (!acc[category]) acc[category] = [];
    acc[category].push(answers[index]);
    return acc;
  }, {}); // Track answers by category

  const categories = [...new Set(questions.map((q) => q.category))]; // Extract unique categories

  const calculateCategoryScore = (category) =>
    questions
      .filter((q) => q.category === category)
      .reduce(
        (sum, q, index) =>
          answeredQuestions[category][index] === q.answer ? sum + 1 : sum,
        0
      );

  const handleDone = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    navigate("/"); // Redirect to home page
  };

  const totalQuestions = questions.length;

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Click for detailed result
    </Tooltip>
  );

  return (
    <div className="mt-4 res-bg nunito-nun">
      <Navbar />
      {/* Header Section */}
      <div className="text-center mb-4">
        <h4>Welcome, {userDetails.name}</h4>
        <p>Email: {userDetails.email}</p>
        <h4>Total Score: {score} / {totalQuestions}</h4>
      </div>

      {/* Category Scores Table */}
      <div className="mt-4">
        <h4 className="text-center mb-3">Marks by Category</h4>
        <Table striped bordered hover responsive>
          <thead className="table-head">
            <tr >
              <th>Category</th>
              <th>Score</th>
              <th>Total Questions</th>
            </tr>
          </thead>
          <tbody className="table-row" >
            {categories.map((category, idx) => (
              
                <tr onClick={() => setSelectedCategory(category)} style={{ cursor: "pointer" }}>
                  <OverlayTrigger
                key={idx}
                placement="top"
                overlay={renderTooltip}
              >
                  <td>{category} </td>
                  </OverlayTrigger>
                  <td>{calculateCategoryScore(category)}</td>
                  <td>{questions.filter((q) => q.category === category).length}</td>
                </tr>
              
            ))}
            {/* Total Marks Row */}
            <tr>
              <td><strong>Total</strong></td>
              <td><strong>{score}</strong></td>
              <td><strong>{totalQuestions}</strong></td>
            </tr>
          </tbody>
        </Table>
      </div>

      {/* Detailed Results for Selected Category */}
      {selectedCategory && (
        <div className="mt-4">
          <h5>Details for {selectedCategory}</h5>
          {questions
            .filter((q) => q.category === selectedCategory)
            .map((question, index) => {
              const userAnswer = answeredQuestions[selectedCategory][index];
              const isCorrect = userAnswer === question.answer;

              return (
                <div key={index} className="mb-3">
                  <p>
                    <strong>Q{index + 1}: {question.question}</strong>
                  </p>
                  <p>
                    <strong>Your Answer:</strong> {userAnswer ? userAnswer : "Not Answered"}{" "}
                    {userAnswer ? (
                      isCorrect ? (
                        <FaCheckCircle className="text-success" />
                      ) : (
                        <FaTimesCircle className="text-danger" />
                      )
                    ) : null}
                  </p>
                  <p>
                    <strong>Correct Answer:</strong> {question.answer}
                  </p>
                  <hr />
                </div>
              );
            })}
        </div>
      )}

      {/* Done Button */}
      <div className="text-center mt-4">
        <Button variant="primary" onClick={handleDone}>
          Done
        </Button>
      </div>

      {/* Confirmation Modal */}
      <Modal show={modalVisible} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thank You!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Thank you for attending the quiz!</p>
          <p>We will contact you through your registered email for further updates.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ResultPage;
