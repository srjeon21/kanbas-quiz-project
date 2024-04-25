import axios from "axios";
// Piazza @997
axios.defaults.withCredentials = true;
const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}api/courses`;
const QUIZZES_API = `${API_BASE}api/quizzes`;

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
  /*
export const deleteQuiz = async (mid:any) => {
  const response = await axios.delete(`${QUIZZES_API}/${mid}`);
  return response.data;
};
*/