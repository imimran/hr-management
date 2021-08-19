import React, { useEffect, useState } from 'react'
import FormContainer from "../components/FormContainer";
import { Form, Button, Card } from "react-bootstrap";
import Axios from "axios";
import { apiBaseUrl } from "../config/apiConfig";

function AddEmployeeScreen() {
    const [file, setFile] = useState("");
    
   
  const handleEmployeeSubmit = (e) => {
    e.preventDefault();
  
    const userData = new FormData();
   
    userData.append('file', file ? file : "");

    

    Axios.post(apiBaseUrl +  "/api/v1/add-employee", userData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            
        }
    })
        .then((response) => {
            console.log(response)
            // if(response && response.data && response.data.msg) {
            //     alert.success(response.data.msg)
            // }
        })
        .catch(error => {
            console.log(error)
            // if(error && error.response && error.response.data && error.response.data.msg) {
            //     // alert.error(error.response.data.msg)
            // }
        });
}

    return (
     
      
     
                    
        <Form  onSubmit={handleEmployeeSubmit}>
          <Form.Group controlId="message">
            <Form.Label> First Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
               value={file}
              onChange={(e) => setFile(e.target.value)}
                    ></Form.Control>
            
          </Form.Group>
  
         
  
        
        <br/>
          <Button type="submit" variant="primary">
           Upload
          </Button>
        </Form>
       
   
       
    
    )
}

export default AddEmployeeScreen
