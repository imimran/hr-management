
import React, {useState, useCallback, useRef} from 'react'
import { FileDrop } from 'react-file-drop';
import Dropzone from 'react-dropzone'
import { useAlert } from 'react-alert';
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { apiBaseUrl } from "../config/apiConfig";


function CSVUploderScreen() {

  const alert = useAlert();
  let history = useHistory();

  const styles = { border: '1px solid black', width: 600, color: 'black', padding: 20 };

  const fileInputRef = useRef(null);

  const handleFileDrop = (files, event) => {
      console.log('onDrop!', files);
  }

  const handleFileInputChange = (event) => {
      const { files } = event.target;
      console.log('handleFileInputChange!', files);
  }

  const onTargetClick = () => {
      fileInputRef.current.click()
  }


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
          alert.success(response.data.msg)
        }
        history.push("/employee");
        
      })
      .catch((error) => {
        console.log(error);
        if(error && error.response && error.response.data && error.response.data.msg) {
          alert.error(error.response.data.msg)
      }
        
      });


  }, []);

  // const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    // <div  className="card card-body p-5 m-5 col-lg-6 mx-auto" {...getRootProps()}>
    <div>
    <h1>React File Drop demo</h1>
    <div style={styles} className="file-drop-area">
        <FileDrop
            onDrop={(files, event) => handleFileDrop(files, event)}
            onTargetClick={onTargetClick}
        >
            Drop some files here!
        </FileDrop>
        <input
            onChange={handleFileInputChange}
            ref={fileInputRef}
            type="file"
            className="hidden"
        />
    </div>
</div>

    // </div>
  )
}

export default CSVUploderScreen;
