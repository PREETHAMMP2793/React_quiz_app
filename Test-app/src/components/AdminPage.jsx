
import { useGlobalState } from "../contexts/GlobalStateProvider";

const AdminPage = () => {
  const { candidates } = useGlobalState(); // Access the global state

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      {candidates.length === 0 ? (
        <p>No candidates have registered yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Candidate Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Job Applied</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => (
              <tr key={index}>
                <td>{candidate.name}</td>
                <td>{candidate.email}</td>
                <td>{candidate.contact}</td>
                <td>{candidate.jobApplied}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPage;
