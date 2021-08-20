import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Form, Button, Table, Modal } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { apiBaseUrl } from "../config/apiConfig";
import { useForm } from "react-hook-form";
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


  const {
    register, formState: { errors }, handleSubmit 
  } = useForm();

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
    // formData.append("employees", values.selectedEmployee ? values.selectedEmployee : "");
    // formData.append("message", values.message ? values.message : "");
    // formData.append("subject", values.subject ? values.subject : "")
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
          //   loading={loading}
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

                    {/* <th scope="row">{employee.id}</th> */}
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

          <div className="col-lg-6">
            <ReactPaginate
              previousLabel={"Prev"}
              nextLabel={"Next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
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
        </div>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Form onSubmit={handleSubmit(handleSendEmail)}> */}
          <Form >

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" 
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
          {/* <Button type="submit" variant="primary">
        Send Message
      </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SendMailScreen;



// import React, { useEffect, useState } from "react";
// import Axios from "axios";
// import { Form, Button, Table, Modal } from "react-bootstrap";
// import ReactPaginate from "react-paginate";
// import { apiBaseUrl } from "../config/apiConfig";
// import { useForm } from "react-hook-form";
// import { useAlert } from "react-alert";
// import { useHistory } from "react-router-dom";

// function SendMailScreen() {
//   const [employees, setEmployee] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] =  useState([]);
//   const [loading, setLoading] = useState();
//   const [error, setError] = useState();
//   const [pageCount, setPageCount] = useState(0);
//   const [show, setShow] = useState(false);
//   const [submitLoading, setSubmitLoading] = useState(false);
//   const [subject, setSubject] = useState("");
//   const [message, setMessage] = useState("");

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const alert = useAlert();


//   const {
//      formState: { errors }, handleSubmit, register
//   } = useForm();

//   useEffect(() => {
//     setLoading(true);
//     Axios.get(apiBaseUrl + "/api/v1/all-employee")
//       .then((response) => {
//         console.log(response.data);
//         console.log(response.data.data);
//         setEmployee(response.data.data);
//         setPageCount(response.data.totalPage);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(true);
//         console.log(err);
//         setLoading(false);
//       });
//   }, []);

//   const handlePageClick = (e) => {
//     const selectedPage = parseInt(e.selected) + 1;
//     console.log(selectedPage);
//     // currentPage(selectedPage + 1);
//     Axios.get(apiBaseUrl + "/api/v1/all-employee?page=" + selectedPage)
//       .then((response) => {
//         console.log(response.data);

//         console.log(response.data.data);
//         setEmployee(response.data.data);
//         setPageCount(response.data.totalPage);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   const handleCheckBox = (e) => {
//     console.log(e.target.value);
//     console.log(e.target.checked);
//     let dummySelectedEmployees = [...selectedEmployee];
//     if(e.target.checked) {
//       dummySelectedEmployees.push(e.target.value);
//     } else {
//       dummySelectedEmployees = dummySelectedEmployees.filter(value => value !== e.target.value);
//     }
//     console.log('dummySelectedEmployees', dummySelectedEmployees);
//     setSelectedEmployee(dummySelectedEmployees);
//   };

//   const handleSendEmail = (values ) => {
//     // console.log(selectedEmployee);
//     // console.log(message);
//     // console.log(subject);
//     console.log(values);
//     return false;

//     setSubmitLoading(true);
//     const formData = new FormData();
//     // formData.append("employees", values.selectedEmployee ? values.selectedEmployee : "");
//     formData.append("employees", values.selectedEmployee);
//     formData.append("subject", values.subject ? values.subject : "")
//     formData.append("message", values.message ? values.message : "");
    
//     // formData.append("employees", selectedEmployee ? selectedEmployee : "");
//     // formData.append("message", message ? message : "");
//     // formData.append("subject", subject ? subject : "")
      
//     Axios.post(apiBaseUrl + "/api/v1/send-bulk-message", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     })
//       .then((response) => {
//         console.log(response);
//         if(response && response.data && response.data.msg) {
//           alert.success(response.data.msg)
//         }
//           setShow(false);
//           setSubmitLoading(false);
          
//       })

//       .catch((error) => {
//         setSubmitLoading(false);
//         if(error && error.response && error.response.data && error.response.data.msg) {
//           alert.error(error.response.data.msg)
//       }
//         console.log(error);
//       });
//   };

//   return (
//     <div className="card card-body mt-auto">
//       <br></br>
//       <div className="table-option">
//         <Button
//           type="primary"
//           onClick={handleShow}
//           disabled={selectedEmployee.length> 0 ? false: true}
//           //   loading={loading}
//         >
//           Send Bulk Message
//         </Button>
//       </div>

//       {loading ? (
//         <h1>Loading........</h1>
//       ) : error ? (
//         <h1>Error</h1>
//       ) : (
//         <div className="col-lg-6 mx-auto">
//           <Table className="gx-table-responsive text-top">
//             <thead>
//               <tr>
//                 <th scope="col">Select</th>
//                 <th scope="col"> Name</th>

//                 <th scope="col">Email</th>
//               </tr>
//             </thead>
//             <tbody>
//               {employees.length > 0 ? (
//                 employees.map((employee, index) => (
//                   <tr key={index}>
//                     <th >
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         value={employee.id}
//                         onChange={(e) => handleCheckBox(e)}
//                       />
//                     </th>

//                     {/* <th scope="row">{employee.id}</th> */}
//                     <td>{employee.first_name + " " + employee.first_name}</td>

//                     <td>{employee.email}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={5}>No data found</td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>

//           <div className="col-lg-6">
//             <ReactPaginate
//               previousLabel={"Prev"}
//               nextLabel={"Next"}
//               breakLabel={"..."}
//               breakClassName={"break-me"}
//               pageCount={pageCount}
//               marginPagesDisplayed={2}
//               pageRangeDisplayed={5}
//               onPageChange={handlePageClick}
//               containerClassName={"pagination"}
//               subContainerClassName={"pages pagination"}
//               activeClassName={"active"}
//               breakClass={"page-item"}
//               breakLinkClassName={"page-link"}
//               pageClassName={"page-item"}
//               pageLinkClassName={"page-link"}
//               previousClassName={"page-item"}
//               previousLinkClassName={"page-link"}
//               nextClassName={"page-item"}
//               nextLinkClassName={"page-link"}
//             />
//           </div>
//         </div>
//       )}

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Modal heading</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onClick={handleSubmit(handleSendEmail)}>
//           {/* <Form > */}

//             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//               <Form.Label>Subject</Form.Label>
//               <Form.Control type="text" placeholder="name@example.com" 
//               defaultValue={subject}
//               onChange={(e) => setSubject(e.target.value)}
//               className={errors.subject && "is-invalid"}
//               {...register("subject", {
//                 required: true,
//                 minLength: 3,
//                 maxLength: 20,
             
//               })}/>
//             </Form.Group>
//             <Form.Group
//               className="mb-3"
//               controlId="exampleForm.ControlTextarea1"
//             >
//               <Form.Label>Message Box</Form.Label>
//               <Form.Control as="textarea" rows={3} 
//               defaultValue={message}
//               onChange={(e) => setMessage(e.target.value)}
//               className={errors.message && "is-invalid"}
//               {...register("message", {
//                 required: true,
//                 minLength: 3,
//                 maxLength: 20,
             
//               })}/>
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           {/* <Button variant="primary" onClick={() => handleSendEmail()} disabled={submitLoading}>
//             Send Message
//           </Button> */}
//           <Button type="submit" form="hook-form" variant="primary">
//         Send Message
//       </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// export default SendMailScreen;

