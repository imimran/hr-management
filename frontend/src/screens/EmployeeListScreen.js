import React, { useEffect, useState } from "react";
import Axios from 'axios';

function EmployeeListScreen() {
  const [employees, setEmployee] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {

      Axios.get('/api/v1/all-employee')
        .then((response) => {    
                console.log(response.data.data);
                setEmployee(response.data.data);
            
        })
        .catch((err) => {
            console.log(err);
        });
  }, []);

  return (
    <div >
      <h1>Employee</h1>
      <p>{employees.length}</p>
      {loading ? (<h1>Loading........</h1>) : error ? (<h1>Error</h1> ) : (
        employees.map((employee, index) => {
          return (
            <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                  <td>{ employee.first_name}</td>
                  <td>{ employee.last_name }</td>
                  <td>{ employee.email }</td>
              </tr>
             
            </tbody>
          </table>
          );
        })
      )}
    </div>
  );
}

export default EmployeeListScreen;
