import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getAllCustomer = async()=>{
    const response = await axios.get(`${API}/customers`);
    return response.data;
}
export const getAllEmployee = async()=>{
    const response = await axios.get(`${API}/employees`);
    return response.data;
}
export const getAllProduct = async()=>{
    const response = await axios.get(`${API}/products`);
    return response.data;
}
export const getAllOrder = async()=>{
    const response = await axios.get(`${API}/orders`);
    return response.data;
}