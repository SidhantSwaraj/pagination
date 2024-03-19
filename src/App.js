import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch(
      `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
    )
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err));
  }, []);

  const nextPage = () => {
    if (page >= Math.ceil(data.length / itemsPerPage))
      setPage(Math.ceil(data.length / itemsPerPage));
    else setPage(page + 1);
  };

  const prevPage = () => {
    if (page <= 1) setPage(1);
    else setPage(page - 1);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);
  const currentPageData = data.slice(startIndex, endIndex);

  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      <table className="tables">
        <thead className="table-header">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {currentPageData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <div className="scroll">
        <button className="scroll-button" onClick={prevPage}>
          Previous
        </button>
        <div className="page">{page}</div>
        <button className="scroll-button" onClick={nextPage}>
          Next
        </button>
      </div>
    </div>
  );
}
