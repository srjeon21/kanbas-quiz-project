import React, { useState, useEffect } from "react";
import { FaEllipsisV, FaAngleDown, FaRocket, FaCheckCircle, FaBan } from "react-icons/fa";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import { Quiz } from "./client";
import "./index.css";

function QuizList() {
    const { courseId } = useParams();
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [quiz, setQuiz] = useState<Quiz>({
        id: "", title: "New Quiz", description: "", availableDate: new Date(), untilDate: new Date(),
        dueDate: new Date(), points: 0, course: "", published: false, type: "Graded Quiz",
        assignmentGroup: "Quizzes", shuffleAnswers: true, timeLimit: 20,
        multipleAttempts: false, showCorrectAnswers: "", accessCode: "",
        oneQAtTime: true, webcam: false, lockQAfterAnswering: false, questions: []
    });
    const navigate = useNavigate();
    const fetchQuizzes = async () => {
        const quizzes = await client.findAllQuizzes(courseId);
        setQuizzes(quizzes);
    }
    useEffect(() => {fetchQuizzes(); }, []);
    const createQuiz = async () => {
        try {
            const newQuiz = await client.createQuiz(courseId, quiz);
            setQuiz(quiz);
            setQuizzes([newQuiz, ...quizzes]);
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/${newQuiz.id}`);
        } catch (err) {
            console.log(err);
        }
    }
    const dateToString = (d:Date) => {
        const date = new Date(d);
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;
    }
    return (
        <div>
            <div className="buttons">
                <button className="btn btn-danger" onClick={createQuiz}>+ Quiz</button>
                <button className="btn btn-secondary"><FaEllipsisV/></button>
            </div><hr/>
            {quizzes.length == 0 && <div>Click '+ Quiz' button to create a new quiz.</div>}
            <ul className="list-group quizzes">
                <li className="list-group-item">
                &nbsp; <FaAngleDown/> Quizzes
                    <ul className="list-group">
                    {quizzes
                        .filter((quiz:any) => quiz.course === courseId)
                        .map((quiz:any, index) => (
                            <li key={index} className="list-group-item d-flex" id="quiz-list">
                                <div className="w-75">
                                    {quiz.published ? <span className="text-success"><FaRocket/></span> : <FaRocket/>} &nbsp; {quiz.title}
                                    <div className="dates">
                                        <span>
                                            {new Date(quiz.untilDate) < new Date() && <b>Closed</b>}
                                            {new Date(quiz.availableDate) <= new Date() && new Date(quiz.untilDate) >= new Date() && <b>Available</b>}
                                            {new Date(quiz.availableDate) > new Date() && `Not available until ${dateToString(quiz.availableDate)}`}
                                        </span>
                                        <span><b>Due</b> {dateToString(quiz.dueDate)}</span>
                                        <span>{quiz.points} pts</span>
                                        <span>{quiz.questions && `${quiz.questions.length()} Questions`}</span>
                                    </div>
                                </div>
                                <span className="float-end">
                                    {quiz.published ? <span className="text-success"><FaCheckCircle/></span> : <FaBan/>}
                                    <FaEllipsisV className="ms-2" />
                                </span>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </div>
    )
}
export default QuizList;