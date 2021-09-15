import axios from 'axios';

const loginUrl = `http://localhost:8000/api/auth/login`;
const registerUrl = `http://localhost:8000/api/auth/register`;
const getAllQuizUrl = `http://localhost:8000/api/quiz`;
// const getQuizUrl = `http://localhost:8000/api/quiz/${id}`;

export const login = (input) => axios.post(loginUrl,input);
export const register = (input) => axios.post(registerUrl,input);
export const getAllQuiz = () => axios.get(getAllQuizUrl);
export const getQuiz = (id) => axios.get(`http://localhost:8000/api/quiz/${id}`);