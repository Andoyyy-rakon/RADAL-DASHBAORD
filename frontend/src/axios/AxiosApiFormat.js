import axios from "axios";

const apiaxio = axios.create({
    baseURL:'http://localhost:3000'
});

export default apiaxio;