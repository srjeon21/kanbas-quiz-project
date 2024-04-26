import React, { useState, useEffect } from "react";
import { FaEllipsisV, FaCheckCircle, FaBan } from "react-icons/fa";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import { Quiz,Question } from "./client";
import Nav from "./Nav";
import "./index.css";

function QuizQuestionsEditor() {
    const { courseId } = useParams();
    const { qid } = useParams();
    //const { originalQuestions } = useState<Question[]>([]);
    const [quiz, setQuiz] = useState<Quiz>({
        id: "", title: "New Quiz", description: "", availableDate: new Date(), untilDate: new Date(),
        dueDate: new Date(), points: 0, course: "", published: false, type: "Graded Quiz",
        assignmentGroup: "Quizzes", shuffleAnswers: true, timeLimit: 20,
        multipleAttempts: false, showCorrectAnswers: "", accessCode: "",
        oneQAtTime: true, webcam: false, lockQAfterAnswering: false, questions: []
    });
    const [ quest, setQuest ] = useState<Question>({
        id: "", quiz: "", title: "New Question", type: "MCQ", points: 0,
        question: "", options: [], correctAnswer: ""
    });
   // const [ questions, setQuestions ] = useState<Question[]>([]);
    const [ questions, setQuestions ] = useState<any[]>([]);
    const navigate = useNavigate();
    const fetchQuizDetails = async () =>{
        try {
            const quizDetail = await client.findQuizById(qid as string);
            setQuiz(quizDetail);
            console.log(quizDetail);
        } catch (error: any) {
            console.log(error);
            navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
        }
    };
    const fetchQuestions = async () => {
        try {
            //const questions = await client.findAllQuestions(qid as string);
            const questions = quiz.questions;
            setQuestions(questions);
            console.log(questions);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchQuizDetails();
        fetchQuestions();
    }, []);
    const addQuestion = () => {
        console.log(questions);
        questions.push({
            points: 0,
            type: "MCQ",
            question: "",
            options: [],
            correctAnswer: ""
        });
        setQuiz({...quiz, questions: questions });
    }
    const updateType = (question:any, value:string) => {
        setQuest({...question, type: value});
        quiz.questions.push(quest);
        setQuiz(quiz);
    }/*
    const updateQuiz = async () => {
        if (quiz.id) {
            await client.updateQuiz(quiz);
            setQuiz({...quiz}); // ...questions: 하고 어쩌고...
        }
    }
    const fieldChange = (question:any, e:any) => {
        setQuest({...question, title: e.target.value });
    }*/
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
                <div className="questions container">
                    <button className="btn btn-secondary" onClick={addQuestion}>+ New Question</button>
                    {quiz.questions &&
                    quiz.questions.map((question:any, index) => (
                        <li key={index} className="list-group-item">
                            <div className="question">
                                <div className="d-flex justify-content-between">
                                    <span className="d-flex">
                                        <input type="text" className="form-control" value={question.title} placeholder="Question Title"
                                        onChange={(e) => {
                                            const updatedQuestions = quiz.questions.map((q, idx) => {
                                                if (idx === index) { return { ...q, title: e.target.value }; }
                                                return q; }); setQuiz({ ...quiz, questions: updatedQuestions });
                                        }}/>
                                        <select className="form-select" value={question.type} id="quizType"
                                        onChange={(e) => {
                                            const updatedQuestions = quiz.questions.map((q, idx) => {
                                                if (idx === index) { return { ...q, type: e.target.value }; }
                                                return q; }); setQuiz({ ...quiz, questions: updatedQuestions });
                                        }}>
                                            <option value="MCQ" className="MCQ" selected>Multiple Choice</option>
                                            <option value="true/false" className="true/false">True or False</option>
                                            <option value="blank" className="blank" >Fill in the Blank</option>
                                        </select>
                                    </span>
                                    <span className="d-flex">pts: &nbsp;<input type="number" value={question.points} className="form-control w-50"
                                    onChange={(e) => {
                                        const updatedQuestions = quiz.questions.map((q, idx) => {
                                            if (idx === index) { return { ...q, points: e.target.value }; }
                                            return q; }); setQuiz({ ...quiz, questions: updatedQuestions });
                                    }}/></span>
                                    </div><br/>
                                    {question.type === "MCQ" && (
                                        <div id="mcq">
                                            <p>Enter your question and multiple answers, then select the one correct answer.</p>
                                            <p><b>Question:</b></p>
                                            <textarea className="form-control" value={question.question} placeholder="Question"
                                            onChange={(e) => {
                                                const updatedQuestions = quiz.questions.map((q, idx) => {
                                                    if (idx === index) { return { ...q, question: e.target.value }; }
                                                    return q; }); setQuiz({ ...quiz, questions: updatedQuestions });
                                            }}></textarea>
                                            <p><b>Choices:</b></p>
                                            <div className="form-check">
                                                <span className="mcq">
                                                    <label htmlFor="correct">Correct Choice: </label>
                                                    <input id="correct" type="text" value={question.correctAnswer} className="form-control w-75"
                                                    onChange={(e) => {
                                                        const updatedQuestions = quiz.questions.map((q, idx) => {
                                                            if (idx === index) { return { ...q, correctAnswer: e.target.value }; }
                                                            return q; }); setQuiz({ ...quiz, questions: updatedQuestions });
                                                    }} />
                                                </span>
                                                <span className="mcq">
                                                    <label htmlFor="incorrect1">Incorrect Choice: </label>
                                                    <input id="incorrect1" type="text" value={question.options ? question.options[1] : ""} className="form-control w-75"
                                                    onChange={(e) => {
                                                        const updatedQuestions = quiz.questions.map((q, idx) => {
                                                            if (idx === index) { return { ...q, options: e.target.value }; }
                                                            return q; }); setQuiz({ ...quiz, questions: updatedQuestions });
                                                    }} />
                                                </span>
                                                <span className="mcq">
                                                    <label htmlFor="incorrect2">Incorrect Choice: </label>
                                                    <input id="incorrect2" type="text" value={question.options ? question.options[2] : ""} className="form-control w-75" />
                                                </span>
                                                <span className="mcq">
                                                    <label htmlFor="incorrect3">Incorrect Choice: </label>
                                                    <input id="incorrect3" type="text" value={question.options ? question.options[3] : ""} className="form-control w-75" />
                                                </span>

                                        </div>
                                        </div>
                                    )}
                                    {question.type === "true/false" && (
                                        <div id="true/false">
                                            <p>Enter your question text, then select if True or False is the correct answer.</p>
                                            <p><b>Question:</b></p>
                                            <textarea className="form-control" value={question.question} placeholder="Question"
                                            onChange={(e) => {
                                                const updatedQuestions = quiz.questions.map((q, idx) => {
                                                    if (idx === index) { return { ...q, question: e.target.value }; }
                                                    return q; }); setQuiz({ ...quiz, questions: updatedQuestions });
                                            }}></textarea>
                                            <p><b>Answer:</b></p>
                                            <div className="form-check">
                                                <select className="true/false form-select w-25" value={question.correctAnswer}
                                                onChange={(e) => {
                                                    const updatedQuestions = quiz.questions.map((q, idx) => {
                                                        if (idx === index) { return { ...q, correctAnswer: e.target.value }; }
                                                        return q; }); setQuiz({ ...quiz, questions: updatedQuestions });
                                                }}>
                                                    <option value="True" selected>True</option>
                                                    <option value="False">False</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                    {question.type === "blank" && (
                                        <div id="blank">
                                            <p>Enter your question text, then define all possible correct answers for the blank.<br/>Students will see the question followed by a small text box to type their answer.</p>
                                            <p><b>Question:</b></p>
                                            <textarea className="form-control" placeholder="Question" value={question.question}
                                            onChange={(e) => {
                                                const updatedQuestions = quiz.questions.map((q, idx) => {
                                                    if (idx === index) { return { ...q, question: e.target.value }; }
                                                    return q; }); setQuiz({ ...quiz, questions: updatedQuestions });
                                            }}></textarea>
                                            <p><b>Answers:</b></p>
                                            <span className="blank">
                                                <label htmlFor="blank1">Correct Answer: </label>
                                                <input type="text" className="form-control w-50" value={question.options ? question.options[0] : ""} />
                                            </span>
                                            <span className="blank">
                                                <label htmlFor="blank2">Correct Answer: </label>
                                                <input type="text" className="form-control w-50" value={question.options ? question.options[1] : ""} />
                                            </span>
                                            <span className="blank">
                                                <label htmlFor="blank3">Correct Answer: </label>
                                                <input type="text" className="form-control w-50" value={question.options ? question.options[2] : ""} />
                                            </span>
                                        </div>
                                    )}
                                    <div className="buttons">
                                        <button className="btn btn-secondary">Cancel</button>
                                        <button className="btn btn-danger">Update Question</button>
                                    </div>
                                </div>
                        </li>
                    ))}
                </div>
                <div className="buttons">
                    <button className="btn btn-secondary">Cancel</button>
                    <button className="btn btn-secondary">Save & Publish</button>
                    <button className="btn btn-secondary">Save</button>
                </div>
            </div>
            )}
        </div>
    )
} export default QuizQuestionsEditor;