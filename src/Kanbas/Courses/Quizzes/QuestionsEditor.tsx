import React, { useState, useEffect } from "react";
import { FaEllipsisV, FaCheckCircle, FaBan } from "react-icons/fa";
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
    const [ selectedQuestion, setSelectedQuestion ] = useState({});
    const [ questions, setQuestions ] = useState<any>([]);
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
    const defaultQ = {
        type: "MCQ",
        question: "",
        options: [],
        correctAnswer: ""
    };
    const addQuestion = async () => {
        setSelectedQuestion({
            number: 0,
            type: "MCQ",
            question: "",
            options: [],
            correctAnswer: ""
        });
        questions.push(selectedQuestion);
        setQuiz({...quiz, questions: questions });
    }
    const updateQuiz = async () => {
        if (quiz.id) {
            await client.updateQuiz(quiz);
            setQuiz({...quiz}); // ...questions: 하고 어쩌고...
        }
    }
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
                        <li key={index} className="list-group-item" onClick={() => setSelectedQuestion(question)}>
                            {question.type === "MCQ" && (
                                <div className="question">
                                    <div className="d-flex justify-content-between">
                                        <span className="d-flex">
                                            <input type="text" className="form-control" placeholder="Question Title"/>
                                            <select className="form-select">
                                                <option className="mcq" selected>Multiple Choice</option>
                                                <option className="true/false">True or False</option>
                                                <option className="blank">Fill in the Blank</option>
                                            </select>
                                        </span>
                                        <span className="d-flex">pts: &nbsp;<input type="number" className="form-control w-50"/></span>
                                    </div><br/>
                                    <p>Enter your question and multiple answers, then select the one correct answer.</p>
                                    <p><b>Question:</b></p>
                                    <textarea className="form-control" placeholder="Question"></textarea>
                                    <p><b>Choices:</b></p>
                                    <div className="form-check">
                                        <span className="mcq">
                                            <label htmlFor="correct">Correct Choice: </label>
                                            <input id="correct" type="text" className="form-control w-50" />
                                        </span>
                                        <span className="mcq">
                                            <label htmlFor="incorrect1">Incorrect Choice: </label>
                                            <input id="incorrect1" type="text" className="form-control w-50" />
                                        </span>
                                        <span className="mcq">
                                            <label htmlFor="incorrect2">Incorrect Choice: </label>
                                            <input id="incorrect2" type="text" className="form-control w-50" />
                                        </span>
                                        <span className="mcq">
                                            <label htmlFor="incorrect3">Incorrect Choice: </label>
                                            <input id="incorrect3" type="text" className="form-control w-50" />
                                        </span>
                                    </div>
                                    <div className="buttons">
                                        <button className="btn btn-secondary">Cancel</button>
                                        <button className="btn btn-danger">Update Question</button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                    <div className="question">
                        <div className="d-flex justify-content-between">
                            <span className="d-flex">
                                <input type="text" className="form-control" placeholder="Question Title"/>
                                <select className="form-select">
                                    <option className="mcq">Multiple Choice</option>
                                    <option className="true/false" selected>True or False</option>
                                    <option className="blank">Fill in the Blank</option>
                                </select>
                            </span>
                            <span className="d-flex">pts: &nbsp;<input type="number" className="form-control w-50"/></span>
                        </div><br/>
                        <p>Enter your question text, then select if True or False is the correct answer.</p>
                        <p><b>Question:</b></p>
                        <textarea className="form-control" placeholder="Question"></textarea>
                        <p><b>Answer:</b></p>
                        <div className="form-check">
                            <select className="true/false form-select w-25">
                                <option selected value="True">True</option>
                                <option value="False">False</option>
                            </select>
                        </div>
                        <div className="buttons">
                            <button className="btn btn-secondary">Cancel</button>
                            <button className="btn btn-danger">Update Question</button>
                        </div>
                    </div>
                    <div className="question">
                        <div className="d-flex justify-content-between">
                            <span className="d-flex">
                                <input type="text" className="form-control" placeholder="Question Title"/>
                                <select className="form-select">
                                    <option className="mcq">Multiple Choice</option>
                                    <option className="true/false">True or False</option>
                                    <option className="blank" selected>Fill in the Blank</option>
                                </select>
                            </span>
                            <span className="d-flex">pts: &nbsp;<input type="number" className="form-control w-50"/></span>
                        </div><br/>
                        <p>Enter your question text, then define all possible correct answers for the blank.<br/>Students will see the question followed by a small text box to type their answer.</p>
                        <p><b>Question:</b></p>
                        <textarea className="form-control" placeholder="Question"></textarea>
                        <p><b>Answers:</b></p>
                            <span className="blank">
                                <label htmlFor="blank1">Correct Answer: </label>
                                <input type="text" className="form-control w-50" />
                            </span>
                            <span className="blank">
                                <label htmlFor="blank2">Correct Answer: </label>
                                <input type="text" className="form-control w-50" />
                            </span>
                            <span className="blank">
                                <label htmlFor="blank3">Correct Answer: </label>
                                <input type="text" className="form-control w-50" />
                            </span>
                        <div className="buttons">
                            <button className="btn btn-secondary">Cancel</button>
                            <button className="btn btn-danger">Update Question</button>
                        </div>
                    </div>
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