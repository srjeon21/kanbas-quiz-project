import React, { useEffect, useState } from "react";
import axios from "axios";

function WorkingWithObjects() {
    const API_BASE = process.env.REACT_APP_API_BASE;
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    const ASSIGNMENT_URL = `${API_BASE}a5/assignment`;
    const fetchAssignment = async () => {
        const response = await axios.get(`${ASSIGNMENT_URL}`);
        setAssignment(response.data);
    };
    const updateTitle = async () => {
    const response = await axios
        .get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
    setAssignment(response.data);
    };
    useEffect(() => {
        fetchAssignment();
    }, []);

    return (
        <div>
            <h3>Working With Objects</h3>
            <h3>Modifying Properties</h3>
            <input className="form-control" onChange={(e) => setAssignment({
                    ...assignment, title: e.target.value })}
                value={assignment.title} type="text" />
            <button className="btn btn-primary" onClick={updateTitle} >
                Update Title to: {assignment.title}
            </button>
            <button className="btn btn-primary" onClick={fetchAssignment} >
                Fetch Assignment
            </button>
            <h4>Modifying Properties</h4>
            <a className="btn btn-primary" href={`${ASSIGNMENT_URL}/title/${assignment.title}`}>
                Update Title
            </a>
            <input className="form-control" type="text"
                onChange={(e) => setAssignment({ ...assignment,
                    title: e.target.value })}
                value={assignment.title}/>
            <h4>Retrieving Objects</h4>
            <a className="btn btn-primary" href={`${API_BASE}a5/assignment`}>
                Get Assignment
            </a>
            <h4>Retrieving Properties</h4>
            <a className="btn btn-primary" href={`${API_BASE}a5/assignment/title`}>
                Get Assignment Title
            </a>
            <a className="btn btn-primary" href={`${API_BASE}a5/module`}>
                Get Module
            </a>
            <h4>Retrieving Properties</h4>
            <a className="btn btn-primary" href={`${API_BASE}a5/module/name`}>
                Get Module Name
            </a>
        </div>
    );
}
export default WorkingWithObjects;