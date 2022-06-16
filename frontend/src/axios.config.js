import axios from "axios";

axios.defaults.baseURL = process.env.API_BASE_URL || "http://localhost:8001/api/";

