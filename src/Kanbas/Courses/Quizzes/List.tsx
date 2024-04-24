import React, { useState, useEffect } from "react";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import * as client from "./client";
import { Quiz } from "./client";

function QuizList() {
    const { courseId } = useParams();
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [quiz, setQuiz] = useState<Quiz>({
        _id: "", title: "Quiz Title", availableDate: new Date(),
        untilDate: new Date(), dueDate: new Date(), points: 0, course: ""
    });
    const fetchQuizzes = async () => {
        const quizzes = await client.findAllQuizzes(courseId);
        setQuizzes(quizzes);
    }
    useEffect(() => {fetchQuizzes(); }, []);
    return (
        <div>
            <div className="buttons">
                <button className="btn btn-danger">+ Quiz</button>
                <button className="btn btn-secondary"><FaEllipsisV/></button>
            </div><hr/>
        </div>
    )
}
export default QuizList;