import axios from 'axios';

const loginUrl = `http://localhost:8000/api/auth/login`;
const registerUrl = `http://localhost:8000/api/auth/register`

export const login = (input) => axios.post(loginUrl,input);
export const register = (input) => axios.post(registerUrl,input);