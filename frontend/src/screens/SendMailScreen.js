import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Form, Button, Card, Table, Modal } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { apiBaseUrl } from "../config/apiConfig";
import { useForm } from "react-hook-form";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";

function SendMailScreen() {
  const [employees, setEmployee] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [pageCount, setPageCount] = useState(0);
  const [show, setShow] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const handleSendEmail = () => {
    setSubmitLoading(true);
    const formData = new FormData();
    // formData.append("employees", selectedOrder.id);
    // formData.append("message", message);
    // formData.append("subject", subject);
      
    Axios.post(apiBaseUrl + "/api/customer/refund-request", formData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        //console.log(response);
        if (response.data.data["alert-type"] === "success") {
         
        //   alert.success(response.data.data["message"]);
          setShow(false);
          setSubmitLoading(false);
          
        } else {
          setSubmitLoading(false);
        //   alert.error(response["message"]);
        }
      })

      .catch((err) => {
        setSubmitLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="card card-body mt-auto">
      <br></br>
      <div className="table-option">
        <Button
          type="primary"
          onClick={handleShow}
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
                employees.map((employee, id) => (
                  <tr key={id}>
                    <th colspan="">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
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
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Message Box</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSendEmail()} disabled={submitLoading}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SendMailScreen;
