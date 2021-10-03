import axios from 'axios';

const loginUrl = `http://localhost:8000/api/auth/login`;
const registerUrl = `http://localhost:8000/api/auth/register`;

const getAllQuizUrl = `http://localhost:8000/api/quiz`;
const updateQuizUrl = `http://localhost:8000/api/quiz/updatequiz`;
// const getQuizUrl = `http://localhost:8000/api/quiz/${id}`;

// const getQuestionUrl = `http://localhost:8000/api/question/${questionId}`;
const updateQuestionUrl = `http://localhost:8000/api/question/update`
const newQuestionUrl = `http://localhost:8000/api/question/new`;
const deleteQuestionUrl = `http://localhost:8000/api/question/delete`;

// User API endpints
export const login = (input) => axios.post(loginUrl,input);

export const register = (input) => axios.post(registerUrl,input);

// Quiz API endpoints
export const getAllQuiz = () => axios.get(getAllQuizUrl);

export const getQuiz = (id) => axios.get(`http://localhost:8000/api/quiz/${id}`);

export const updateQuiz = (data) => axios.put(updateQuizUrl,data.changes,{ headers:{'authorization' : `Bearer ${data.token}` }});
    
// Question API endpoints
export const getQuestion = (id) => axios.get(`http://localhost:8000/api/question/${id}`);

export const updateQuestion = (data) => axios.put(updateQuestionUrl,data.changes,{headers:{'authorization' : `Bearer ${data.token}`}});

export const newQuestion = (data) => axios.post(newQuestionUrl,data.changes,{headers:{'authorization' : `Bearer ${data.token}`}});

export const deleteQuestion = (data) => {console.log(data);
    return    axios.delete(deleteQuestionUrl,{data : {id : data.id},headers:{'authorization' : `Bearer ${data.token}`}});
}
    