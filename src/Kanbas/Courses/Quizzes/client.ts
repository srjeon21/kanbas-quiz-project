import axios from "axios";
// Piazza @997
axios.defaults.withCredentials = true;
const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}api/courses`;
const QUIZZES_API = `${API_BASE}api/quizzes`;
const QUESTIONS_API = `${API_BASE}api/questions`;

export interface Quiz {
    id: string, title: string, description: string, availableDate: Date, untilDate: Date, dueDate: Date,
    points: number, course: string, published: boolean, type: string,
    assignmentGroup: string, shuffleAnswers: boolean, timeLimit: number,
    multipleAttempts: boolean, showCorrectAnswers: string, accessCode: string,
    oneQAtTime: boolean, webcam: boolean, lockQAfterAnswering: boolean, questions: Array<any>,
};
// Quiz List
export const createQuiz = async (courseId:any, quiz:any) => {
    const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
    return response.data;
};
// Quiz List
export const findAllQuizzes = async (courseId:any) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};
// Quiz List
export const deleteQuiz = async (qid:any) => {
  console.log(qid);
  const response = await axios.delete(`${QUIZZES_API}/${qid}`);
  return response.data;
};
// Quiz Details
export const findQuizById = async (qid: string) => {
  const response = await axios.get(`${QUIZZES_API}/${qid}`);
  return response.data;
}
// Quiz Details
export const updateQuiz = async (quiz:any) => {
    const response = await axios.put(`${QUIZZES_API}/${quiz.id}`, quiz);
    return response.data;
};

export interface Question {
  id: string, quiz: string, title: String, type: string, points: number, question: String, correctAnswer: String, options: Array<string>,
}
// Questions
export const createQuestion = async (quizId:any, question:any) => {
  const response = await axios.post(`${QUIZZES_API}/${quizId}/questions`, question);
  return response.data;
}
export const findAllQuestions = async (quizId:any) => {
  const response = await axios
    .get(`${QUIZZES_API}/${quizId}/questions`);
  return response.data;
};
export const updateQuestion = async (question:any) => {
  const response = await axios.put(`${QUESTIONS_API}/${question.id}`, question);
  return response.data;
};