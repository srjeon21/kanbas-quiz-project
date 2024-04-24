import React, { useState, useEffect } from "react";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import { Quiz } from "./client";

function QuizList() {
    const { courseId } = useParams();
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [quiz, setQuiz] = useState<Quiz>({
        id: "", title: "New Quiz", availableDate: new Date(), untilDate: new Date(),
        dueDate: new Date(), points: 0, course: "", published: false, type: "Graded Quiz",
        assignmentGroup: "Quizzes", shuffleAnswers: true, timeLimit: 20,
        multipleAttempts: false, showCorrectAnswers: "", accessCode: "",
        oneQAtTime: true, webcam: false, lockQAfterAnswering: false
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
    return (
        <div>
            <div className="buttons">
                <button className="btn btn-danger" onClick={createQuiz}>+ Quiz</button>
                <button className="btn btn-secondary"><FaEllipsisV/></button>
            </div><hr/>
            {quizzes.length == 0 && <div>Click '+ Quiz' button to create a new quiz.</div>}
            {quizzes.map((quiz:any, index) => (
                <li key={index}>
                    <div>{quiz.id}</div>
                    <div>{quiz.title}</div>
                </li>))}
        </div>
    )
}
export default QuizList;