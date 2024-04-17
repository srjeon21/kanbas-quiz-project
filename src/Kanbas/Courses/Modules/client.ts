import axios from "axios";
// Piazza @997
axios.defaults.withCredentials = true;
const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}api/courses`;
const MODULES_API = `${API_BASE}api/modules`;

export interface Module {_id: string; name: string, description: string, course: string};
export const updateModule = async (module:any) => {
    const response = await axios.
      put(`${MODULES_API}/${module._id}`, module);
    return response.data;
  };
export const deleteModule = async (mid:any) => {
  const response = await axios.delete(`${MODULES_API}/${mid}`);
  return response.data;
};
export const createModule = async (courseId:any, module:any) => {
    const response = await axios.post(
      `${COURSES_API}/${courseId}/modules`,
      module
    );
    return response.data;
};
export const findAllModules = async (courseId:any) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};