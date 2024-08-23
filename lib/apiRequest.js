import axios from "axios";
// import.meta.env.REACT_APP_API_URL;

const apiRequest = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8800/api",
    withCredentials: true
})

export default apiRequest;