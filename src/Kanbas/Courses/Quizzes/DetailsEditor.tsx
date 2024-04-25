import React, { useState, useEffect } from "react";
import { FaEllipsisV, FaCheckCircle, FaBan, FaPencilAlt } from "react-icons/fa";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import { Quiz } from "./client";
import Nav from "./Nav";
import "./index.css";

function QuizDetailsEditor() {
    const { courseId } = useParams();
    const { qid } = useParams();
    const [quiz, setQuiz] = useState<Quiz>({
        id: "", title: "New Quiz", description: "", availableDate: new Date(), untilDate: new Date(),
        dueDate: new Date(), points: 0, course: "", published: false, type: "Graded Quiz",
        assignmentGroup: "Quizzes", shuffleAnswers: true, timeLimit: 20,
        multipleAttempts: false, showCorrectAnswers: "", accessCode: "",
        oneQAtTime: true, webcam: false, lockQAfterAnswering: false, questions: []
    });
    const navigate = useNavigate();
    const fetchQuizDetails = async () =>{
        try {
            const quizDetail = await client.findQuizById(qid as string);
            setQuiz(quizDetail);
        } catch (error: any) {
            console.log(error);
            navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
        }
    };
    useEffect(() => {
        fetchQuizDetails();
    }, []);
    const selectChange = (e:any) => {
        const selectedType = e.target.value;
        setQuiz({...quiz, type: selectedType });
    };
    return (
        <div>
            {quiz && (
            <div>
                <div className="buttons">
                    <h1>Points {quiz.points} &nbsp;</h1>
                    <h1>&nbsp;{quiz.published ? <FaCheckCircle/> : <FaBan/>}{quiz.published ? " Published" : " Not Published"}&nbsp;</h1>
                    <button className="btn btn-secondary"><FaEllipsisV/></button>
                </div><hr/>
                <Nav/>
                <div className="container">
                    <div className="form-group">
                        <input className="form-control w-50" type="text" value={quiz.title} placeholder="Quiz title" />
                    </div>
                    <div className="form-group">
                        <p>Quiz Instructions:</p>
                        <textarea className="form-control" value={quiz.description} placeholder="Quiz description"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Grade Type</label>
                        <select id="type" className="form-select w-50" value={quiz.type} onChange={selectChange}>
                            <option value="Graded Quiz" selected>Graded Quiz</option>
                            <option value="Practice Quiz">Practice Quiz</option>
                            <option value="Graded Survey">Graded Survey</option>
                            <option value="Ungraded Survey">Ungraded Survey</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="points">Points</label>
                        <input type="number" className="form-control w-25" value={quiz.points} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="group">Assignment Group</label>
                        <select id="group" className="form-select w-50" value={quiz.assignmentGroup} onChange={selectChange}>
                            <option value="Quizzes" selected>Quizzes</option>
                            <option value="Exams">Exams</option>
                            <option value="Assignments">Assignments</option>
                            <option value="Project">Project</option>
                        </select>
                    </div><br/>
                    <p>Options</p>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="shuffle" />
                        <label className="form-check-label" htmlFor="shuffle">Shuffle Answers</label>
                    </div>
                    <div className="form-check d-flex">
                        <input type="checkbox" className="form-check-input" id="limit" />
                        <label className="form-check-label" htmlFor="limit">Time Limit</label>
                        <input type="number" className="form-control w-25" value={quiz.timeLimit} />Minutes
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="multiple" />
                        <label className="form-check-label" htmlFor="multiple">Allow Multiple Attempts</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="correct" />
                        <label className="form-check-label" htmlFor="correct">Show Correct Answers</label>
                        <input type="number" className="form-control w-25" value={quiz.showCorrectAnswers} placeholder="When" />
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="code" />
                        <label className="form-check-label" htmlFor="limit">Access Code</label>
                        <input type="text" className="form-control w-50" value={quiz.accessCode} />
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="one" />
                        <label className="form-check-label" htmlFor="one">One Question at a Time</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="webcam" />
                        <label className="form-check-label" htmlFor="webcam">Webcam Required</label>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="lock" />
                        <label className="form-check-label" htmlFor="lock">Lock Questions After Answering</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="due">Due</label>
                        <input type="date" className="form-control w-50" id="due"/>
                        <label htmlFor="available">Available from</label>
                        <input type="date" className="form-control w-50" id="available"/>
                        <label htmlFor="available">Until</label>
                        <input type="date" className="form-control w-50" id="until"/>
                    </div>
                    <hr/>
                    <div className="form-group save">
                        <button className="btn btn-secondary">Cancel</button>
                        <button className="btn btn-secondary">Save and Publish</button>
                        <button className="btn btn-danger">Save</button>
                    </div>
                </div>
            </div>)}
        </div>
    )
} export default QuizDetailsEditor;