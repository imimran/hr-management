import React, { useEffect, useState } from "react";
import Axios from "axios";
import { apiBaseUrl } from "../config/apiConfig";
import ReactPaginate from "react-paginate";

function EmployeeListScreen() {
  const [employees, setEmployee] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [pageCount, setPageCount] = useState(0);
  

  useEffect(() => {
    setLoading(true)
      Axios.get(apiBaseUrl + "/api/v1/all-employee")
        .then((response) => {
          console.log(response.data);
          console.log(response.data.data);
          setEmployee(response.data.data);
          setPageCount(response.data.totalPage);
        setLoading(false)

        })
        .catch((err) => {
         setError(true)
          console.log(err);
          setLoading(false)
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

      <div className="container card card-body p-5 m-5 col-lg-6 mx-auto ">
      <h5>Employee List:</h5>
      <br/>
     
      {loading ? (
        <h3>Loading........</h3>
      ) : error ? (
        <h5>Server Error ! Try Again</h5>
      ) : (
        <div className="mx-auto">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
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

          {employees.length > 0 ? (

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
              breakClass={"page-item"}
              breakLinkClassName={"page-link"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
             
            />
          </div>
          ): null
}
          
        </div>
      )}
      </div>
      
   
  );
}

export default EmployeeListScreen;
