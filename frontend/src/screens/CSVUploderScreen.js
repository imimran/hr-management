import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

function CSVUploderScreen() {

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div  className="card card-body p-5 m-5 col-lg-6 mx-auto" {...getRootProps()}>
      <input type="file" {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }


    </div>
  )
}

export default CSVUploderScreen;
