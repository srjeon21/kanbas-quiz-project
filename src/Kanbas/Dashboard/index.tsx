import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as client from "../Courses/client";
import { Course } from "../Courses/client";

function Dashboard() {
  const [error, setError] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [course, setCourse] = useState<Course>({
    _id: "", id: "", name: "New Course", number: "New Number", startDate: "2024-01-01", endDate: "2024-05-01"
  });
  const createCourse = async () => {
    try {
      const newCourse = await client.createCourse(course);
      if (!newCourse.id) { newCourse.id = newCourse._id };
      setCourses([newCourse, ...courses]);
    } catch (err:any) {
      console.log(err);
      setError(err.response ? err.response.data.message : "Error while making a new course (check if Number is unique).");
    }
  }
  const updateCourse = async () => {
    if (course.id) {
      await client.updateCourse(course);
      setCourses(courses.map((c) => c.id === course.id ? c = course : c))
    }
  }
  const deleteCourse = async (course: Course) => {
    try {
      await client.deleteCourse(course.id);
      setCourses(courses.filter((c) => c.id !== course.id));
    } catch (err:any) {
      console.log(err);
      setError(err.response ? err.response.data.message : "error while deleting a course.");
    }
  }
  const fetchCourses = async () => {
    const courses = await client.findAllCourses();
    setCourses(courses);
  }
  useEffect(() => { fetchCourses(); }, []);
  return (
    <div className="p-4">
      <h2>Dashboard</h2><hr />
      <h5>Course</h5>
      <input value={course.name} className="form-control"
             onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
      <input value={course.number} className="form-control"
             onChange={(e) => setCourse({ ...course, number: e.target.value }) } />
      <input value={course.startDate.substring(0,10)} className="form-control" type="date"
             onChange={(e) => setCourse({ ...course, startDate: e.target.value }) }/>
      <input value={course.endDate.substring(0,10)} className="form-control" type="date"
             onChange={(e) => setCourse({ ...course, endDate: e.target.value }) } />
      <button className="btn btn-success" onClick={createCourse} >
        Add
      </button>
      <button className="btn btn-warning" onClick={updateCourse} >
        Update
      </button>
      {error && <div>{error}</div>}
      <h2>Published Courses ({courses.length})</h2><hr />
      <div className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div key={course.id} className="col" style={{ width: 300 }}>
              <div className="card">
                <img src={`images/environment.jpg`} className="card-img-top"
                     style={{ height: 150 }}/>
                <div className="card-body">
                  <Link className="card-title" to={`/Kanbas/Courses/${course.id}`}
                    style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                    <button className="btn btn-warning" onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                      }}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={(event) => {
                        event.preventDefault();
                        deleteCourse(course);
                      }}>
                      Delete
                    </button><br/>
                    {course.name}
                  </Link>
                  <p className="card-text">{course.number}</p>
                  <Link to={`/Kanbas/Courses/${course.id}`} className="btn btn-primary">
                    Go </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;