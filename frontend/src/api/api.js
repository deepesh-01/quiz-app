import axios from 'axios';

const loginUrl = `http://localhost:8000/api/auth/login`;
const registerUrl = `http://localhost:8000/api/auth/register`;

//verify user
const verifyUrl = `http://localhost:8000/api/user/verifyuser`

const getAllQuizUrl = `http://localhost:8000/api/quiz`;
const updateQuizUrl = `http://localhost:8000/api/quiz/updatequiz`;
// const getQuizUrl = `http://localhost:8000/api/quiz/${id}`;
const newQuizUrl = `http://localhost:8000/api/quiz/newquiz`;
const deleteQuizUrl = `http://localhost:8000/api/quiz/deletequiz`;

// const submitQuizUrl = `http://localhost:8000/api/quiz/submitquiz`;
const submitQuizUrl = `http://localhost:8000/api/score/submitquiz` ;

// const getQuestionUrl = `http://localhost:8000/api/question/${questionId}`;
const updateQuestionUrl = `http://localhost:8000/api/question/update`
const newQuestionUrl = `http://localhost:8000/api/question/new`;
const deleteQuestionUrl = `http://localhost:8000/api/question/delete`;

// User API endpints
export const login = (input) => axios.post(loginUrl,input);

export const register = (input) => axios.post(registerUrl,input);

// User Verify EndPoint
export const verifyUser = (token) => axios.get(verifyUrl,{headers:{'authorization' : `Bearer ${token}`}});

// Quiz API endpoints
export const getAllQuiz = () => axios.get(getAllQuizUrl);

export const getQuiz = (id) => axios.get(`http://localhost:8000/api/quiz/${id}`);

export const newQuiz = (data) => axios.post(newQuizUrl,data.nQuiz,{headers:{'authorization' : `Bearer ${data.token}`}});

export const updateQuiz = (data) => axios.put(updateQuizUrl,data.changes,{ headers:{'authorization' : `Bearer ${data.token}` }});

export const deleteQuize = (data) => axios.delete(deleteQuizUrl,{data : {id : data.id},headers:{'authorization' : `Bearer ${data.token}`}});

// Question API endpoints
export const getQuestion = (id) => axios.get(`http://localhost:8000/api/question/${id}`);

export const updateQuestion = (data) => axios.put(updateQuestionUrl,data.changes,{headers:{'authorization' : `Bearer ${data.token}`}});

export const newQuestion = (data) => axios.post(newQuestionUrl,data.changes,{headers:{'authorization' : `Bearer ${data.token}`}});

export const deleteQuestion = (data) => axios.delete(deleteQuestionUrl,{data : {id : data.id},headers:{'authorization' : `Bearer ${data.token}`}});

// Scores API endpoints
export const submitQuiz = (data,token) => axios.post(submitQuizUrl,data,{headers:{'authorization' : `Bearer ${token}`}});