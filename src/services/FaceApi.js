import axios from "axios";
const baseURL = "https://faceapilearning.cognitiveservices.azure.com";
const suscriptionKey = "< AZURE-SUBSCRIPTION-KEY >";
const faceAttributes = "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise";
const detectionModel = "detection_01";
export const faceApiForUrl = axios.create({
 baseURL: baseURL,
 timeout: 50000,
 headers: {
  "Ocp-Apim-Subscription-Key": suscriptionKey,
  "Content-Type": "application/json"
 },
 params: {
  returnFaceId: true,
  returnFaceLandmarks: false,
  returnFaceAttributes: faceAttributes,
  detectionModel: detectionModel
 }
});