import axios from "axios";

const PYTHON_API_URL = "http://localhost:8000/analyze"; 
// If deployed, replace with your server URL

export const analyzePlagiarism = async (files) => {
    try {
        const body = {
            files: files,
            noise_threshold: 0.2,
            min_section_chars: 0
        };

        const response = await axios.post(PYTHON_API_URL, body, {
            headers: { "Content-Type": "application/json" }
        });

        return response.data;

    } catch (error) {
        console.error("Error calling Python API:", error.response?.data || error);
        throw new Error("Python API failed");
    }
};
