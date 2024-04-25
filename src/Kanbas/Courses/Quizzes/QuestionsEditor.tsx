import React, { useState, useEffect } from "react";
import { FaEllipsisV, FaCheckCircle, FaBan, FaSearch } from "react-icons/fa";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import { Quiz } from "./client";
import Nav from "./Nav";
import "./index.css";

function QuizQuestionsEditor() {
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
                {/*quiz
                <div className="questions container">

                </div>
            */}
            </div>)}
        </div>
    )
} export default QuizQuestionsEditor;