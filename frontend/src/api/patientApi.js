import axios from "axios";

const API_URL = "https://hospital-management-system-lvu6.onrender.com";

export const getPatients = async () => {
    const response = await axios.get(`${API_URL}/patients`);
    return response.data;
};


export const addPatient = async (patientData) => {
    const response = await axios.post(
        `${API_URL}/patients`,
        patientData
    );

    return response.data;
};


export const deletePatient = async (id) => {

    const response = await axios.delete(
        `${API_URL}/patients/${id}`
    );

    return response.data;
};