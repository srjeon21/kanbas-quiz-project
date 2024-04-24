import { useParams, Navigate, Route, Routes, useLocation } from "react-router";
import { HiMiniBars3, HiChevronRight } from "react-icons/hi2";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import "./index.css"
import Home from "./Home";
import { useState, useEffect } from "react";
import Assignments from "./Assignments";
import * as client from "./client";
import { Course } from "./client";
import Quizzes from "./Quizzes";

function Courses() {
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course>({
    _id: "", id: "", name: "New Course", number: "New Number", startDate: "2024-01-01", endDate: "2024-05-01"
  });
  const findCourseById = async () => {
    const course = await client.findCourseById(courseId as string);
    setCourse(course);
  };
  useEffect(() => {
    findCourseById();
  }, []);
  const { pathname } = useLocation();
  const currentPath = pathname.split("/")[4];

  return (
    <div>
        <div className="header">
            <h1 className="text-danger"><HiMiniBars3 /></h1>
            <h1 className="text-danger"> {course?.number} {course?.name} </h1>
            <h1><HiChevronRight/></h1>
            <h1>{currentPath}</h1>
        </div>
        <hr/>
        <div className="d-flex">
            <CourseNavigation />
            <div className="flex-fill">
                <Routes>
                    <Route path="/" element={<Navigate to="Home"/>} />
                    <Route path="Home" element={<Home/>} />
                    <Route path="Modules" element={<Modules/>} />
                    <Route path="Piazza" element={<h1>Piazza</h1>} />
                    <Route path="Assignments" element={<Assignments/>} />
                    <Route path="Assignments/:assignmentId" element={<h1>Assignment Editor</h1>} />
                    <Route path="Quizzes" element={<Quizzes/>} />
                    <Route path="Grades" element={<h1>Grades</h1>} />
                    <Route path="People" element={<h1>People</h1>} />
                    <Route path="Panopto Video" element={<h1>Panopto Video</h1>} />
                    <Route path="Discussions" element={<h1>Discussions</h1>} />
                    <Route path="Announcements" element={<h1>Announcements</h1>} />
                    <Route path="Pages" element={<h1>Pages</h1>} />
                    <Route path="Files" element={<h1>Files</h1>} />
                    <Route path="Rubrics" element={<h1>Rubrics</h1>} />
                    <Route path="Outcomes" element={<h1>Outcomes</h1>} />
                    <Route path="Collaborations" element={<h1>Collaborations</h1>} />
                    <Route path="Syllabus" element={<h1>Syllabus</h1>} />
                    <Route path="Settings" element={<h1>Settings</h1>} />
                </Routes>
            </div>
        </div>
    </div>
  );
}
export default Courses;