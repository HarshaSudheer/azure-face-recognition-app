import React, { useState, useEffect } from "react";
import { faceApiForUpload } from "../services/FaceApi";
const ImageUpload = () => {
 const [data, setData] = useState([])
 const [file, setFile] = useState({});
 const [outputImage, setOutputImage] = useState(false);
 const faceRectangleStyle = (item) => {
  return ({
   position: 'absolute',
   top: `${item.faceRectangle.top}px`,
   left: `${item.faceRectangle.left}px`,
   width: `${item.faceRectangle.width}px`,
   height: `${item.faceRectangle.height}px`,
   border: '2px solid #BA0B93',
   textAlign: 'center',
   color: 'white',
   fontSize: '20px',
   fontWeight: 'bold'
  });
 }
 useEffect(() => {
  console.log(data);
 }, [data])
 const handleUpload = (event) => {
  setFile(event.target.files[0]);
 }
 const handleSubmit = async () => {
  try {
   const response = await faceApiForUpload.post(
    `/face/v1.0/detect`,
    file
   );
   setData(response.data);
   setOutputImage(true);
  }
  catch (err) {
   console.log(err.response.data);
   window.alert("An error occurred");
  }
 }
 const handleBack = () => {
  setOutputImage(false);
  setFile({});
 }
 return (
  <div>
   {(!outputImage) ?
    <div>
     <div>
      <input type="file" id="file" name="file" accept=".jpg,.jpeg,.png" onChange={handleUpload} />
      <label htmlFor="file">Select file</label>
     </div>
     <button type="button" onClick={handleSubmit}>SUBMIT</button>
    </div>
   :
    <div style={{ position: 'relative' }}>
     <img src={URL.createObjectURL(file)} alt="output from azure" />
     {data && data.map(item => {
       return (
        <div key={item.faceId} style={faceRectangleStyle(item)}>{data.indexOf(item) + 1}</div>
       )
     })}
     {data.length > 0 ?
      <div>
       {data.map(item => {
        return (
         <div key={item.faceId}>
          <p>{data.indexOf(item) + 1}</p>
          <p>Gender: {item.faceAttributes.gender}</p>
          <p>Age: {item.faceAttributes.age}</p>
          <p>Glasses: {item.faceAttributes.glasses}</p>
         </div>
        )
       })}
      </div> : <p>No face detected</p>
     }
     <button type="button" onClick={handleBack}>BACK</button>
    </div>
   }
  </div>
 );
}
export default ImageUpload;