import React, { useEffect, useState } from "react";
import axios from "axios";

function EmployeeListScreen() {
  const [employees, setEmployee] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      setLoading(true);
      const data = (await axios.get("/api/v1/all-employee")).data;
      console.log(data);
      setEmployee(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  }, []);
  return (
    <div>
      <h1>Employee</h1>
      <p>{employees && employees.length}</p>
      {loading ? (<h1>Loading........</h1>) : error ? (<h1>Error</h1> ) : (
        employees.map((employee, index) => {
          return <h1 key="index">{employee.first_name}</h1>;
        })
      )}
    </div>
  );
}

export default EmployeeListScreen;
