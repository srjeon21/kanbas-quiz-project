import React from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle, FaFileSignature } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { assignments } from "../../Database";
import "./index.css";

function Assignments() {
  const { courseId } = useParams();
  const assignmentList = assignments.filter(
    (assignment) => assignment.course === courseId);
  return (
    <>
    <div>
      <div className="head d-flex">
        <input type="text" placeholder="Search for Assignment"></input>
        <div>
            <button className="btn btn-secondary">+ Group</button>
            <button className="btn btn-danger">+ Assignment</button>
            <button className="btn btn-secondary"><FaEllipsisV/> </button>
        </div>
      </div><hr/>
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div>
            <FaEllipsisV className="me-2" /> ASSIGNMENTS
            <span className="float-end">
              <FaCheckCircle className="text-success" />
              <FaPlusCircle className="ms-2" /><FaEllipsisV className="ms-2" />
            </span>
          </div>
          <ul className="list-group">
            {assignmentList.map((assignment) => (
              <li className="single-as list-group-item">
                <div>
                    <FaEllipsisV className="me-2" />
                    <FaFileSignature className="text-success me-2"/>
                    <div>
                        <Link
                    to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}>{assignment.title}</Link>
                    <p><span className="text-danger">Multiple Module</span> | Due Tomorrow | 100 pts</p>
                    </div>
                </div>
                <div>
                  <FaCheckCircle className="text-success" /><FaEllipsisV className="ms-2" />
                </div>
              </li>))}
          </ul>
        </li>
      </ul>
    </div>
    </>
);}
export default Assignments;

