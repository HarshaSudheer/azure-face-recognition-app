import React, { useState } from "react";
import { faceApiForUrl } from "../services/FaceApi";
const ImageUrl = () => {
    const [data, setData] = useState([])
    const [image, setImage] = useState("");
    const [outputImage, setOutputImage] = useState(false);
    const handleSubmit = async () => {
        try {
            const response = await faceApiForUrl.post(
                `/face/v1.0/detect`,
                {
                    url: image
                }
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
                    <img src={image} alt="output" /><br />
                    <button type="button" onClick={handleBack}>BACK</button>
                </div>
            }
        </div>
    );
}
export default ImageUrl;