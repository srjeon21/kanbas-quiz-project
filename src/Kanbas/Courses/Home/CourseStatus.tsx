import React from "react";
import { FaBan, FaCheckCircle, FaFileImport, FaCuttlefish, FaBullseye, FaChartBar, FaBullhorn, FaBell, FaCalendarAlt } from "react-icons/fa";
import "./index.css"

function CourseStatus() {
  return (
    <>
      <div className="container">
        <div className="row">
          <button className="col btn btn-secondary"><FaBan/> Unpublish</button>
          <button className="col btn btn-success"><FaCheckCircle/> Published</button>
        </div>
        <div className="row">
          <button className="btn btn-secondary"><FaFileImport/> Import Existing Content</button>
          <button className="btn btn-secondary"><FaCuttlefish/> Import From Commons</button>
          <button className="btn btn-secondary"><FaBullseye/> Choose Home Page</button>
          <button className="btn btn-secondary"><FaChartBar/> View Course Stream</button>
          <button className="btn btn-secondary"><FaBullhorn/> New Announcement</button>
          <button className="btn btn-secondary"><FaBullseye/> New Analytics</button>
          <button className="btn btn-secondary"><FaBell/> View Course Notification</button>
        </div>
        <br/>
        <div className="row">
          <p className="col"><b>Coming Up</b></p>
          <p className="col smaller text-danger"><FaCalendarAlt/>View Calendar</p>
          <hr/>
        </div>
        <div className="row">
          <p><FaCalendarAlt/><span className="text-danger"> Lecture</span></p>
          <p>CS4550.12631.202410<br/>Sep 7 at 11:45am</p>
          <br/>
          <p><FaCalendarAlt/><span className="text-danger"> Lecture</span></p>
          <p>CS4550.12631.202410<br/>Sep 11 at 11:45am</p>
          <br/>
          <p><FaCalendarAlt/><span className="text-danger"> Lecture</span></p>
          <p>CS5610 06 SP23<br/>Sep 11 at 11:45am</p>
        </div>
      </div>
    </>
  );
}
export default CourseStatus;