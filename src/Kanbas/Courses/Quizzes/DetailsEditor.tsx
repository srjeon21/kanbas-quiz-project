import React, { useState, useEffect } from "react";
import { FaEllipsisV, FaCheckCircle, FaBan } from "react-icons/fa";
import { useParams } from "react-router";
import { useNavigate, Link } from "react-router-dom";
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
    const updateQuiz = async () => {
        if (quiz.id) {
            await client.updateQuiz(quiz);
            setQuiz({...quiz});
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz.id}`);
        }
    }
    useEffect(() => {
        fetchQuizDetails();
    }, []);

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
                        <input className="form-control w-50" type="text" value={quiz.title}
                        placeholder="Quiz title" onChange={(e) => setQuiz({...quiz, title: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <p>Quiz Instructions:</p>
                        <textarea className="form-control" value={quiz.description} placeholder="Quiz description"
                        onChange={(e) => setQuiz({...quiz, description: e.target.value })}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Grade Type</label>
                        <select id="type" className="form-select w-50"
                        onChange={(e) => setQuiz({...quiz, type: e.target.value })}>
                            {quiz.type === "Graded Quiz" ? <option value="Graded Quiz" selected>Graded Quiz</option> : <option value="Graded Quiz">Graded Quiz</option>}
                            {quiz.type === "Practice Quiz" ? <option value="Practice Quiz" selected>Practice Quiz</option> : <option value="Practice Quiz">Practice Quiz</option>}
                            {quiz.type === "Graded Survey" ? <option value="Graded Survey" selected>Graded Survey</option> : <option value="Graded Survey">Graded Survey</option>}
                            {quiz.type === "Ungraded Survey" ? <option value="Ungraded Survey" selected>Ungraded Survey</option> : <option value="Ungraded Survey">Ungraded Survey</option>}
                        </select>
                    </div>
                    <div className="form-group d-flex">
                        <label htmlFor="points">Points: &nbsp; </label>
                        {quiz.points} <p>&nbsp;(= Total points of questions in this quiz)</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="group">Assignment Group</label>
                        <select id="group" className="form-select w-50"
                        onChange={(e) => setQuiz({...quiz, assignmentGroup: e.target.value })}>
                            {quiz.assignmentGroup === "Quizzes" ? <option value="Quizzes" selected>Quizzes</option> : <option value="Quizzes">Quizzes</option>}
                            {quiz.assignmentGroup === "Exams" ? <option value="Exams" selected>Exams</option> : <option value="Exams">Exams</option>}
                            {quiz.assignmentGroup === "Assignments" ? <option value="QuizzAssignmentses" selected>Assignments</option> : <option value="Assignments">Assignments</option>}
                            {quiz.assignmentGroup === "Project" ? <option value="Project" selected>Project</option> : <option value="Project">Project</option>}
                        </select>
                    </div><br/>
                    <p>Options</p>
                    <div className="form-check">
                        {quiz.shuffleAnswers && <input type="checkbox" className="form-check-input" id="shuffle" checked
                        onChange={(e) => setQuiz({...quiz, shuffleAnswers: !quiz.shuffleAnswers })} />}
                        {!quiz.shuffleAnswers && <input type="checkbox" className="form-check-input" id="shuffle"
                        onChange={(e) => setQuiz({...quiz, shuffleAnswers: !quiz.shuffleAnswers})} />}
                        <label className="form-check-label" htmlFor="shuffle">Shuffle Answers</label>
                    </div>
                    <div className="form-check d-inline-flex">
                        {quiz.timeLimit && <input type="checkbox" className="form-check-input" id="limit" checked
                        onChange={(e) => setQuiz({...quiz, timeLimit: 0 })}/>}
                        {!quiz.timeLimit && <input type="checkbox" className="form-check-input" id="limit" />}
                        <label className="form-check-label" htmlFor="limit">Time Limit</label>
                        <input type="number" className="form-control w-25" value={quiz.timeLimit} min="0" max="240"
                        onChange={(e) => setQuiz({...quiz, timeLimit: Number(e.target.value) })}/> Minutes
                    </div>
                    <div className="form-check">
                        {quiz.multipleAttempts && <input type="checkbox" className="form-check-input" id="multiple" checked
                        onChange={(e) => setQuiz({...quiz, multipleAttempts: !quiz.multipleAttempts })}/>}
                        {!quiz.multipleAttempts && <input type="checkbox" className="form-check-input" id="multiple"
                        onChange={(e) => setQuiz({...quiz, multipleAttempts: !quiz.multipleAttempts })}/>}
                        <label className="form-check-label" htmlFor="multiple">Allow Multiple Attempts</label>
                    </div>
                    <div className="form-check d-inline-flex">
                        {quiz.showCorrectAnswers && <input type="checkbox" className="form-check-input" id="correct" checked
                        onChange={(e) => setQuiz({...quiz, showCorrectAnswers: "" })} />}
                        {!quiz.showCorrectAnswers && <input type="checkbox" className="form-check-input" id="correct" />}
                        <label className="form-check-label" htmlFor="correct">Show Correct Answers</label>
                        <input type="text" className="form-control w-25" value={quiz.showCorrectAnswers} placeholder="When"
                        onChange={(e) => setQuiz({...quiz, showCorrectAnswers: e.target.value })}/>
                    </div>
                    <div className="form-check d-inline-flex">
                        <input type="checkbox" className="form-check-input" id="code" />
                        <label className="form-check-label" htmlFor="limit">Access Code</label>
                        <input type="text" className="form-control w-25" value={quiz.accessCode}
                        onChange={(e) => setQuiz({...quiz, accessCode: e.target.value })} />
                    </div>
                    <div className="form-check">
                        {quiz.oneQAtTime && <input type="checkbox" className="form-check-input" id="one" checked
                        onChange={(e) => setQuiz({...quiz, oneQAtTime: !quiz.oneQAtTime })} />}
                        {!quiz.oneQAtTime && <input type="checkbox" className="form-check-input" id="one"
                        onChange={(e) => setQuiz({...quiz, oneQAtTime: !quiz.oneQAtTime })} />}
                        <label className="form-check-label" htmlFor="one">One Question at a Time</label>
                    </div>
                    <div className="form-check">
                        {quiz.webcam && <input type="checkbox" className="form-check-input" id="webcam" checked
                        onChange={(e) => setQuiz({...quiz, webcam: !quiz.webcam })} />}
                        {!quiz.webcam && <input type="checkbox" className="form-check-input" id="webcam"
                        onChange={(e) => setQuiz({...quiz, webcam: !quiz.webcam })} />}
                        <label className="form-check-label" htmlFor="webcam">Webcam Required</label>
                    </div>
                    <div className="form-check">
                        {quiz.lockQAfterAnswering && <input type="checkbox" className="form-check-input" id="lock" checked
                        onChange={(e) => setQuiz({...quiz, lockQAfterAnswering: !quiz.lockQAfterAnswering })} />}
                        {!quiz.lockQAfterAnswering && <input type="checkbox" className="form-check-input" id="lock"
                        onChange={(e) => setQuiz({...quiz, lockQAfterAnswering: !quiz.lockQAfterAnswering })} />}
                        <label className="form-check-label" htmlFor="lock">Lock Questions After Answering</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="due">Due</label>
                        <input type="date" className="form-control w-50" id="due" value={quiz.dueDate.toString().substring(0,10)}
                        onChange={(e) => setQuiz({...quiz, dueDate: new Date(e.target.value.substring(0,10)) })}/>
                        <label htmlFor="available">Available from</label>
                        <input type="date" className="form-control w-50" id="available" value={quiz.availableDate.toString().substring(0,10)}
                        onChange={(e) => setQuiz({...quiz, availableDate: new Date(e.target.value.substring(0,10)) })}/>
                        <label htmlFor="available">Until</label>
                        <input type="date" className="form-control w-50" id="until" value={quiz.untilDate.toString().substring(0,10)}
                        onChange={(e) => setQuiz({...quiz, untilDate: new Date(e.target.value.substring(0,10)) })}/>
                    </div>
                    <hr/>
                    <div className="form-group save">
                        <Link to={`/Kanbas/Courses/${courseId}/Quizzes`}>
                            <button className="btn btn-secondary">Cancel</button>
                        </Link>
                        <Link to={`/Kanbas/Courses/${courseId}/Quizzes`}>
                            <button className="btn btn-secondary">Save and Publish</button>
                         </Link>
                        <button className="btn btn-danger" onClick={updateQuiz}>Save</button>
                    </div>
                </div>
            </div>)}
        </div>
    )
} export default QuizDetailsEditor;