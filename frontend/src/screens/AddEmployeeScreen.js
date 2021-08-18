import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Axios from "axios";
import { apiBaseUrl } from "../config/apiConfig";
import { useForm } from "react-hook-form";
import { useAlert } from 'react-alert';
function AddEmployeeScreen() {
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [email, setemail] = useState("");
  const [error, setError] = useState("");
  const alert = useAlert();

  const {
    register, formState: { errors }, handleSubmit 
  } = useForm();

 
  const handleEmployeeSubmit = (first_name, last_name, email ) => {
    
    const userData = new FormData();

    userData.append("first_name", first_name ? first_name : "");
    userData.append("last_name", last_name ? last_name : "");
    userData.append("email", email ? email : "" );

    Axios.post(apiBaseUrl + "/api/v1/add-employee", userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        if(error && error.response && error.response.data && error.response.data.msg) {
          alert.error(error.response.data.msg)
      }
        console.log(error);
      });
  };

  return (
    <Form
      className="card card-body p-5 m-5 "
      onSubmit={handleSubmit(handleEmployeeSubmit)}
    >
      <Form.Group controlId="message">
        <Form.Label> First Name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter First Name"
          defaultValue={first_name}
          onChange={(e) => setfirst_name(e.target.value)}
          className={errors.first_Name && "is-invalid"}
          {...register("first_Name", {
            required: true,
            minLength: 3,
            maxLength: 20,
          })}
        />
          {errors.first_Name && (
            <span className="text-danger">
              {errors.first_Name.type === "required" && "Please give first_Name"}
              {errors.first_Name.type === "minLength" &&
                "Please give first_Name minimum of 5 characters"}
              {errors.first_Name.type === "maxLength" &&
                "Please give first_Name maximum of 50 characters"}
            </span>
          )}
       
      </Form.Group>

      <Form.Group controlId="message">
        <Form.Label> Last Name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Last Name"
          defaultValue={last_name}
          onChange={(e) => setlast_name(e.target.value)}
          className={errors.last_name && "is-invalid"}
          {...register("last_name", {
            required: true,
            minLength: 3,
            maxLength: 20,
          })}
        />
        {
                    errors.last_name && 
          <span className="text-danger">
                        
            
                        { errors.last_name.type === 'required' && 'Please give last_name' }
                        { errors.last_name.type === 'minLength' && 'Please give last_name minimum of 3 characters' }
                        { errors.last_name.type === 'maxLength' && 'Please give last_name maximum of 50 characters' }
                    </span>
                }
      </Form.Group>

      <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    defaultValue={email}
                    onChange={(e) => setemail(e.target.value)}
                    className={ errors.email && 'is-invalid' }
                    {...register("email", {
                      required: "required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Enter a valid e-mail address",
                      },
                    })}
                />
                {
                    errors.email && 
          <span className="text-danger">     
                        { errors.email.type === 'required' && 'Please give email address' }
                        { errors.email.type === 'pattern' && 'Please give a valid email address' }
                    </span>
                }
            </Form.Group>

      <br />
      <Button type="submit" variant="primary">
        Create Employee
      </Button>
    </Form>
  );
}

export default AddEmployeeScreen;
