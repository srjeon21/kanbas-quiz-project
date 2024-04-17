import axios from "axios";
// Piazza @997
axios.defaults.withCredentials = true;
const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}api/courses`;

export interface Course {_id: string; id: string, name: string, number: string, startDate: string, endDate: string};

export const createCourse = async (course: any) => {
    const response = await axios.post(COURSES_API, course);
    return response.data;
};
export const findAllCourses = async () => {
    const response = await axios.get(COURSES_API);
    return response.data;
  };
export const findCourseById = async (cid: string) => {
    const response = await axios.get(`${COURSES_API}/${cid}`);
    return response.data;
  };
export const updateCourse = async (course: any) => {
    const response = await axios.put(`${COURSES_API}/${course.id}`, course);
    return response.data;
  };
export const deleteCourse = async (cid: any) => {
  const response = await axios.delete(`${COURSES_API}/${cid}`);
  return response.data;
};