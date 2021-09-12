import axios from 'axios';

const loginUrl = `http://localhost:8000/api/auth/login`;

export const login = (input) => axios.post(loginUrl,input);