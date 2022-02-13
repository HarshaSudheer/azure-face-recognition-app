import React, { useState } from "react";
const ImageUrl = () => {
 const [image, setImage] = useState("");
 const [outputImage, setOutputImage] = useState(false);
 const handleSubmit = () => {
  setOutputImage(true);
 }
 const handleBack = () => {
  setOutputImage(false);
  setImage("");
 }
 return (
  <div>
   {(!outputImage) ?
   <div>
    <input type="text" placeholder="paste image url here" value={image} onChange={event => setImage(event.target.value)} />
    <button type="button" onClick={handleSubmit}>SUBMIT</button>
   </div>
   :
   <div>
    <img src={image} alt="output" /><br/>
    <button type="button" onClick={handleBack}>BACK</button>
   </div>
   }
  </div>
 );
}
export default ImageUrl;