import React, { useState, useEffect } from "react";
import { faceApiForUrl } from "../services/FaceApi";
const ImageUrl = () => {
    const [data, setData] = useState([])
    const [image, setImage] = useState("");
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
                <div style={{ position: 'relative' }}>
                    <img src={image} alt="output" /><br />
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
export default ImageUrl;