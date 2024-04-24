import axios from "axios";
// Piazza @997
axios.defaults.withCredentials = true;
const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}api/courses`;
const QUIZZES_API = `${API_BASE}api/quizzes`;

export interface Quiz {
    _id: string, title: string; availableDate: Date; untilDate: Date; dueDate: Date; points: number, course: string
};

export const createQuiz = async (courseId:any, quiz:any) => {
    const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`,quiz);
    return response.data;
};
export const findAllQuizzes = async (courseId:any) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};
/*
export const updateQuiz = async (module:any) => {
    const response = await axios.put(`${QUIZZES_API}/${module._id}`, module);
    return response.data;
  };
export const deleteQuiz = async (mid:any) => {
  const response = await axios.delete(`${QUIZZES_API}/${mid}`);
  return response.data;
};
*/