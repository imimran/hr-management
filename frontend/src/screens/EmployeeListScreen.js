import React, { useEffect, useState } from "react";
import Axios from "axios";
import { apiBaseUrl } from "../config/apiConfig";
import ReactPaginate from "react-paginate";

function EmployeeListScreen() {
  const [employees, setEmployee] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [pageCount, setPageCount] = useState(0);
  const [currentPage] = useState(1);

  

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    // apiBaseUrl + "/api/v1/all-employee?limit="+ dataPerPage + '&offset='+ offset
      Axios.get(apiBaseUrl + "/api/v1/all-employee")
        .then((response) => {
          console.log(response.data);

          console.log(response.data.data);
          setEmployee(response.data.data);
          setPageCount(response.data.totalPage);
        })
        .catch((err) => {
          console.log(err);
        });
    
  }, []);

  const handlePageClick = (e) => {
    const selectedPage = parseInt(e.selected) + 1;
    console.log(selectedPage);
    // currentPage(selectedPage + 1);
    Axios.get(apiBaseUrl + '/api/v1/all-employee?page=' + selectedPage)
    .then((response) => {
      console.log(response.data);

      console.log(response.data.data);
      setEmployee(response.data.data);
      setPageCount(response.data.totalPage);
      
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <>
      <div className="container">
      <h1>Employee</h1>
      <p>Total {employees.length} Employee</p>
      {loading ? (
        <h1>Loading........</h1>
      ) : error ? (
        <h1>Error</h1>
      ) : (
        <div className="col-lg-6 mx-auto">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee, id) => (
                  <tr key={id}>
                    <th scope="row">{employee.id}</th>
                    <td>{employee.first_name}</td>
                    <td>{employee.last_name}</td>
                    <td>{employee.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>No data found</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="col-lg-6">
            <ReactPaginate
              previousLabel={"Prev"}
              nextLabel={"Next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick }
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          </div>
        </div>
      )}
      </div>
      
    </>
  );
}

export default EmployeeListScreen;
