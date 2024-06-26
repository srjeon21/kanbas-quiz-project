import React, { useState, useEffect } from "react";
import { FaEllipsisV, FaCheckCircle, FaBan, FaPencilAlt } from "react-icons/fa";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import { Quiz } from "./client";
import "./index.css";

function QuizDetails() {
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
            console.log(quizDetail);
            console.log(quiz);
        } catch (error: any) {
            console.log(error);
            navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
        }
    };
    useEffect(() => {
        fetchQuizDetails();
    }, []);
    const dateToString = (d:Date) => {
        const date = new Date(d);
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;
    }
    const updateQuiz = async () => {
        quiz.published = !quiz.published;
        await client.updateQuiz(quiz);
        setQuiz({...quiz, published: quiz.published });
    }
    const toEditor = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${qid}/edit`);
    }
    const toPreview = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${qid}/preview`);
    }
    const sumOfPoints = () => {
        const totalPoints = quiz.questions.reduce((acc, question) => {
            return acc + parseInt(question.points);
        }, 0);
        quiz.points = totalPoints;
        return totalPoints;
    };
    return (
        <div>
            {quiz && (
            <div>
                <div className="buttons">
                    <button onClick={updateQuiz} className={quiz.published ? "btn btn-success" : "btn btn-danger"}>{quiz.published ? <FaCheckCircle/>: <FaBan/>}{quiz.published ? " Published" : " Unpublished"}</button>
                    <button className="btn btn-secondary" onClick={toPreview}>Preview</button>
                    <button className="btn btn-secondary" onClick={toEditor}><FaPencilAlt/> Edit</button>
                    <button className="btn btn-secondary"><FaEllipsisV/></button>
                </div><hr/>
                <h2>{quiz.title}</h2>
                <div className="container">
                    <table id="main" className="table table-borderless">
                        <tbody>
                            <tr>
                                <td className="w-50">Quiz Type</td>
                                <td className="w-50">{quiz.type}</td>
                            </tr>
                            <tr>
                                <td className="w-50">Points</td>
                                <td className="w-50">{sumOfPoints()}</td>
                            </tr>
                            <tr>
                                <td className="w-50">Assignment Group</td>
                                <td className="w-50">{quiz.assignmentGroup}</td>
                            </tr>
                            <tr>
                                <td className="w-50">Shuffle Answers</td>
                                <td className="w-50">{quiz.shuffleAnswers ? "Yes" : "No"}</td>
                            </tr>
                            <tr>
                                <td className="w-50">Time Limit</td>
                                <td className="w-50">{quiz.timeLimit} Minutes</td>
                            </tr>
                            <tr>
                                <td className="w-50">Multiple Attempts</td>
                                <td className="w-50">{quiz.multipleAttempts ? "Yes" : "No"}</td>
                            </tr>
                            <tr>
                                <td className="w-50">Show Correct Answers</td>
                                <td className="w-50">{quiz.showCorrectAnswers ? `${quiz.showCorrectAnswers}` : ""}</td>
                            </tr>
                            <tr>
                                <td className="w-50">Access Code</td>
                                <td className="w-50">{quiz.accessCode}</td>
                            </tr>
                            <tr>
                                <td className="w-50">One Question at a Time</td>
                                <td className="w-50">{quiz.oneQAtTime ? "Yes" : "No"}</td>
                            </tr>
                            <tr>
                                <td className="w-50">Webcam Required</td>
                                <td className="w-50">{quiz.webcam ? "Yes" : "No"}</td>
                            </tr>
                            <tr>
                                <td className="w-50">Lock Questions After Answering</td>
                                <td className="w-50">{quiz.lockQAfterAnswering ? "Yes" : "No"}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table id="date" className="table">
                        <thead>
                            <th className="w-25">Due</th>
                            <th className="w-50">Available from</th>
                            <th className="w-25">Until</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{dateToString(quiz.dueDate)}</td>
                                <td>{dateToString(quiz.availableDate)}</td>
                                <td>{dateToString(quiz.untilDate)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>)}
        </div>
    )
} export default QuizDetails;