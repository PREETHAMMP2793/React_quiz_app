import React from 'react';

const AdminPage = ({ candidates }) => {
  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Candidate Name</th>
            <th>Score</th>
            <th>View Details</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={index}>
              <td>{candidate.name}</td>
              <td>{candidate.score}</td>
              <td><button className="btn btn-info">View Details</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
