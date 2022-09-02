import axios from 'axios';

const loginUrl = `http://localhost:8000/api/auth/login`;
const registerUrl = `http://localhost:8000/api/auth/register`;

//get user score
const userScoreUrl = `http://localhost:8000/api/score/userscores`

//user urls
const verifyUrl = `http://localhost:8000/api/user/verifyuser`
const updateUserUrl = `http://localhost:8000/api/user/update`

//quiz urls
const getAllQuizUrl = `http://localhost:8000/api/quiz`;
const updateQuizUrl = `http://localhost:8000/api/quiz/updatequiz`;
const newQuizUrl = `http://localhost:8000/api/quiz/newquiz`;
const deleteQuizUrl = `http://localhost:8000/api/quiz/deletequiz`;

//submit quiz
const submitQuizUrl = `http://localhost:8000/api/score/submitquiz` ;

//question urls
const updateQuestionUrl = `http://localhost:8000/api/question/update`
const newQuestionUrl = `http://localhost:8000/api/question/new`;
const deleteQuestionUrl = `http://localhost:8000/api/question/delete`;

// User API endpints
export const login = (input) => axios.post(loginUrl,input);

export const register = (input) => axios.post(registerUrl,input);

// User Verify EndPoint
export const verifyUser = (token) => axios.get(verifyUrl,{headers:{'Authorization' : `Bearer ${token}`}});

export const updateUser = (data,token) => axios.put(updateUserUrl,data,{headers:{'authorization' : `Bearer ${token}`}});

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

export const getUserScores = (token) => axios.post(userScoreUrl,null,{headers:{'authorization' : `Bearer ${token}`}});
