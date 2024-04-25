import React, { useState, useEffect } from "react";
import { FaEllipsisV, FaAngleDown, FaRocket, FaCheckCircle, FaBan } from "react-icons/fa";
import { useParams } from "react-router";
import { useNavigate, Link } from "react-router-dom";
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
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz>({
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
    const deleteQuiz = async (quiz:any) => {
        try {
            await client.deleteQuiz(quiz.id);
            setQuizzes(quizzes.filter((q) => q.id !== quiz.id));
        } catch (err) {
            console.log(err);
        }
    }
    const updateQuiz = async (quiz:any) => {
        setSelectedQuiz(quiz);
        quiz.published = !quiz.published;
        await client.updateQuiz(quiz);
        setQuizzes(quizzes.map((q) => q.id === quiz.id ? q = quiz : q));
    }
    const dateToString = (d:Date) => {
        const date = new Date(d);
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;
    }
    const contextMenuButton = (quiz:any) => {
        if (quiz.id === selectedQuiz.id) {
            setSelectedQuiz({
                id: "", title: "New Quiz", description: "", availableDate: new Date(), untilDate: new Date(),
                dueDate: new Date(), points: 0, course: "", published: false, type: "Graded Quiz",
                assignmentGroup: "Quizzes", shuffleAnswers: true, timeLimit: 20,
                multipleAttempts: false, showCorrectAnswers: "", accessCode: "",
                oneQAtTime: true, webcam: false, lockQAfterAnswering: false, questions: []
            });
        } else setSelectedQuiz(quiz);
    };
    return (
        <div>
            <div className="buttons">
                <button className="btn btn-danger" onClick={createQuiz}>+ Quiz</button>
                <button className="btn btn-secondary"><FaEllipsisV/></button>
            </div><hr/>
            {quizzes.length === 0 && <div>Click '+ Quiz' button to create a new quiz.</div>}
            <ul className="list-group quizzes">
                <li className="list-group-item">
                &nbsp; <FaAngleDown/> Quizzes
                    <ul className="list-group">
                    {quizzes
                        .filter((quiz:any) => quiz.course === courseId)
                        .map((quiz:any, index) => (
                            <li key={index} className="list-group-item">
                                <div className="d-flex" id="quiz-list">
                                    <div className="w-75">
                                        {quiz.published ? <span className="text-success"><FaRocket/></span> : <FaRocket/>} &nbsp;
                                        <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz.id}`}>{quiz.title}</Link>
                                        <div className="dates">
                                            <span>
                                                {new Date(quiz.untilDate) < new Date() && <b>Closed</b>}
                                                {new Date(quiz.availableDate) <= new Date() && new Date(quiz.untilDate) >= new Date() && <b>Available</b>}
                                                {new Date(quiz.availableDate) > new Date() && `Not available until ${dateToString(quiz.availableDate)}`}
                                            </span>
                                            <span><b>Due</b> {dateToString(quiz.dueDate)}</span>
                                            <span>{quiz.points} pts</span>
                                            <span>{quiz.questions && `${quiz.questions.length} Questions`}</span>
                                        </div>
                                    </div>
                                    <span className="float-end">
                                        <span onClick={() => updateQuiz(quiz)}>
                                            {quiz.published ? <span className="text-success"><FaCheckCircle/></span> : <FaBan/>}
                                        </span>
                                        <span onClick={() => contextMenuButton(quiz)}><FaEllipsisV className="ms-2" /></span>
                                    </span>
                                </div>
                                {selectedQuiz?.id === quiz.id && (
                                <div className="flex-end">
                                    <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz.id}`}>
                                        <button className="btn btn-secondary">Edit</button>
                                        </Link>
                                    <button className="btn btn-danger" onClick={() => deleteQuiz(quiz)}>Delete</button>
                                    <button className="btn btn-warning" onClick={() => updateQuiz(quiz)}>{quiz.published ? "Unpublish" : "Publish"}</button>
                                </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </div>
    )
}
export default QuizList;