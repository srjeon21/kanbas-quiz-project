import React, { useState, useEffect } from "react";
import { FaExclamationCircle, FaCheckCircle, FaBan, FaPencilAlt } from "react-icons/fa";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import { Quiz } from "./client";
import "./index.css";

function Preview() {
    const { courseId } = useParams();
    const { qid } = useParams();
    const [quiz, setQuiz] = useState<Quiz>({
        id: "", title: "New Quiz", description: "", availableDate: new Date(), untilDate: new Date(),
        dueDate: new Date(), points: 0, course: "", published: false, type: "Graded Quiz",
        assignmentGroup: "Quizzes", shuffleAnswers: true, timeLimit: 20,
        multipleAttempts: false, showCorrectAnswers: "", accessCode: "",
        oneQAtTime: true, webcam: false, lockQAfterAnswering: false, questions: []
    });
    const fetchQuizDetails = async () =>{
        try {
            const quizDetail = await client.findQuizById(qid as string);
            setQuiz(quizDetail);
            console.log(quizDetail);
        } catch (error: any) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchQuizDetails();
    }, []);
    const dateToString = (d:Date) => {
        const date = new Date(d);
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;
    }
    return (
        <div>
            {quiz && (
            <div>
                <h2>{quiz.title}</h2>
                <p className="text text-danger"><FaExclamationCircle/>This is a preview of the published version of the quiz.</p>
                <p>Started: {dateToString(new Date())}</p>
                <h2>Quiz Instructions</h2>
                <hr/>
                <div className="container">
                    {quiz.questions &&
                    quiz.questions?.map((question: {title: string, points: number, question: string, type: string, options: Array<string>}) => (
                        <li className="list-group-item question-box">
                            <div className="qu-header d-flex">
                                <h1>{question.title}</h1>
                                <h1>{question.points} pts</h1>
                            </div><br/>
                            <p className="box-content">{question.question}</p>
                            {question.type === "MCQ" && (
                                <div className="form-check box-content">
                                    {question.options?.map((option:string, index) => (
                                        <div key={index}>
                                            <input className="form-check-input" name={question.title} type="radio" />
                                            <label className="form-check-label">{option}</label>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {question.type === "true/false" && (
                                <div>
                                    <div className="form-check box-content">
                                        <input className="form-check-input" name={question.title} type="radio" />
                                        <label className="form-check-label">True</label>
                                    </div>
                                    <div className="form-check box-content">
                                        <input className="form-check-input" name={question.title} type="radio" />
                                        <label className="form-check-label">False</label>
                                    </div>
                                </div>
                            )}
                            {question.type === "blank" && (
                                <div className="form-group">
                                    {question.options.map((option:string, index) => (
                                        <div key={index}>
                                            <input type="text" className="form-control w-50" /><br/>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <br/>
                        </li>
                    ))}
                    <div className="buttons">
                        <p>Quiz saved at {dateToString(new Date())}</p>
                        <button className="btn btn-secondary">Submit Quiz</button>
                    </div><br/>
                    <div className="qu-header">
                        <FaPencilAlt/>Keep Editing This Quiz
                    </div>
                </div>
            </div>)}
        </div>
    )
} export default Preview;