import React, {useState, useCallback} from 'react'
import { FileDrop } from 'react-file-drop';
import Dropzone from 'react-dropzone'
import { useAlert } from 'react-alert';
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { apiBaseUrl } from "../config/apiConfig";


function CSVUploderScreen() {

  const alert = useAlert();
  let history = useHistory();
  const onDrop = useCallback(acceptedFiles => {

    let data = new FormData();
    data.append('file', acceptedFiles[0]);
    console.log(acceptedFiles);
    

    Axios.post(apiBaseUrl + "/api/v1/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log(response);
        if(response && response.data && response.data.msg) {
          alert.success(response.data.success)
        }
        history.push("/employee");
        
      })
      .catch((error) => {
        console.log(error);
        if(error && error.response && error.response.data && error.response.data.msg) {
          alert.error(error.response.data.failed)
      }
        
      });


  }, []);

  // const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div  className="card card-body p-5 m-5 col-lg-6 mx-auto" >
      <Dropzone
            acceptedFiles={[".csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values"]}
            onDrop={(acceptedFiles) => { onDrop(acceptedFiles)}}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}  className="dropzone">
                <input {...getInputProps()} />
                <p>Dropping files here, or click to select files to upload.</p>
                <p>Only csv file will be accepted</p>
              </div>
            )}
          </Dropzone>

    </div>
  )
}

export default CSVUploderScreen;

