import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Form, Button, Table, Modal } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { apiBaseUrl } from "../config/apiConfig";
import { useAlert } from "react-alert";


function SendMailScreen() {
  const [employees, setEmployee] = useState([]);
  const [selectedEmployee, setSelectedEmployee] =  useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [pageCount, setPageCount] = useState(0);
  const [show, setShow] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const alert = useAlert();


  useEffect(() => {
    setLoading(true);
    Axios.get(apiBaseUrl + "/api/v1/all-employee")
      .then((response) => {
        console.log(response.data);
        console.log(response.data.data);
        setEmployee(response.data.data);
        setPageCount(response.data.totalPage);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handlePageClick = (e) => {
    const selectedPage = parseInt(e.selected) + 1;
    console.log(selectedPage);
    // currentPage(selectedPage + 1);
    Axios.get(apiBaseUrl + "/api/v1/all-employee?page=" + selectedPage)
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

  const handleMessage = e => {
    //console.log(e.target.value);
    setMessage(e.target.value);
    if (e.target.value === '') {
        setMessageError(true);
    } else {
        setMessageError(false);
    }
};

const handleSubject = e => {
  //console.log(e.target.value);
  setSubject(e.target.value);
  if (e.target.value === '') {
    setSubjectError(true);
  } else {
    setSubjectError(false);
  }
};

  const handleCheckBox = (e) => {
    console.log(e.target.value);
    console.log(e.target.checked);
    let dummySelectedEmployees = [...selectedEmployee];
    if(e.target.checked) {
      dummySelectedEmployees.push(e.target.value);
    } else {
      dummySelectedEmployees = dummySelectedEmployees.filter(value => value !== e.target.value);
    }
    console.log('dummySelectedEmployees', dummySelectedEmployees);
    setSelectedEmployee(dummySelectedEmployees);
  };

  const handleSendEmail = () => {
    if (subject === '') {
      setSubjectError(true);
      return false;
  } else {
    setSubjectError(false);
  }
  if (message === '') {
    setMessageError(true);
    return false;
} else {
    setMessageError(false);
}
    console.log(selectedEmployee);
    console.log(message);
    console.log(subject);
    setSubmitLoading(true);
    const formData = new FormData();
    formData.append("employees", selectedEmployee ? selectedEmployee : "");
    formData.append("message", message ? message : "");
    formData.append("subject", subject ? subject : "")
      
    Axios.post(apiBaseUrl + "/api/v1/send-bulk-message", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log(response);
        if(response && response.data && response.data.msg) {
          alert.success(response.data.msg)
        }
          setShow(false);
          setSubmitLoading(false);
          
      })

      .catch((error) => {
        setSubmitLoading(false);
        if(error && error.response && error.response.data && error.response.data.msg) {
          alert.error(error.response.data.msg)
      }
        console.log(error);
      });
  };

  return (
    <div className="card card-body mt-auto">
      <br></br>
      <div className="table-option">
        <Button
          type="primary"
          onClick={handleShow}
          disabled={selectedEmployee.length> 0 ? false: true}
        >
          Send Bulk Message
        </Button>
      </div>

      {loading ? (
        <h1>Loading........</h1>
      ) : error ? (
        <h1>Error</h1>
      ) : (
        <div className="col-lg-6 mx-auto">
          <Table className="gx-table-responsive text-top">
            <thead>
              <tr>
                <th scope="col">Select</th>
                <th scope="col"> Name</th>

                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee, index) => (
                  <tr key={index}>
                    <th >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={employee.id}
                        onChange={(e) => handleCheckBox(e)}
                      />
                    </th>

                    <td>{employee.first_name + " " + employee.first_name}</td>
                    <td>{employee.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>No data found</td>
                </tr>
              )}
            </tbody>
          </Table>

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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="email" placeholder="Write Subject..." 
              value={subject}
              onChange={(e) => handleSubject(e)}/>
               {subjectError && (
                                <div className="error-message" style={{color: "red"}}>
                                   Subject Requried
                                </div>
                            )}
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Message Box</Form.Label>
              <Form.Control as="textarea" rows={3} 
              placeholder="Write something..." 
              value={message}
              onChange={(e) => handleMessage(e)}/>
              {messageError && (
                                <div className="error-message"style={{color: "red"}}>
                                    Email Body Requried
                                </div>
                            )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSendEmail()} disabled={submitLoading}>
            Send Message
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SendMailScreen;



