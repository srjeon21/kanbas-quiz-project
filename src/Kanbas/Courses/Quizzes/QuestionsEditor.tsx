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
        const newQ = {
            points: 0,
            type: "MCQ",
            question: "",
            options: [],
            correctAnswer: ""
        };
        const updatedQuestions = [...quiz.questions, newQ];
        setQuiz({...quiz, questions: updatedQuestions });
    }
    const updateQuestion = async () => {
        if (quiz.id) {
            await client.updateQuiz(quiz);
            setQuiz({...quiz});
        }
    }
    const updateQuiz = async () => {
        if (quiz.id) {
            await client.updateQuiz(quiz);
            setQuiz({...quiz});
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz.id}`);
        }
    }
    const publishAndUpdate = async () => {
        quiz.published = true;
        await client.updateQuiz(quiz);
        setQuiz({...quiz});
        navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
    }
    const toList = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
    }
    const [numOptionsMCQ, setNumOptionsMCQ] = useState(4);
    const [numOptionsBlank, setNumOptionsBlank] = useState(3);

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
                    <h1>Points {sumOfPoints()} &nbsp;</h1>
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
                                            <p>Enter your question and multiple answers, the first one will the be correct answer.</p>
                                            <p><b>Question:</b></p>
                                            <textarea className="form-control" value={question.question} placeholder="Question"
                                            onChange={(e) => {
                                                const updatedQuestions = quiz.questions.map((q, idx) => {
                                                    if (idx === index) { return { ...q, question: e.target.value }; }
                                                    return q; }); setQuiz({ ...quiz, questions: updatedQuestions });
                                            }}></textarea>
                                            <p><b>Choices:</b></p>
                                            <label htmlFor="numOptionsMCQ">Number of answer options: </label>
                                            <input id="numOptionsMCQ" type="number" min="2" value={numOptionsMCQ} className="form-control w-25"
                                                onChange={(e) => setNumOptionsMCQ(parseInt(e.target.value))}
                                            />
                                            <div className="form-check">
                                            {Array.from({ length: numOptionsMCQ }).map((_, optionIndex) => (
                                                <span className="mcq" key={optionIndex}>
                                                    {optionIndex === 0 ? <p className="text text-success"><br/>Note: The answer in this box (Option 1) will be the correct answer.</p> : ""}
                                                    <label htmlFor={`option${optionIndex}`}>Option {optionIndex + 1}: </label>
                                                    <input
                                                        id={`option${optionIndex}`} type="text"
                                                        value={question.options ? question.options[optionIndex] : ""}
                                                        className="form-control w-75"
                                                        onChange={(e) => {
                                                            const updatedQuestions = quiz.questions.map((q, idx) => {
                                                                if (idx === index) {
                                                                    const updatedOptions = [...q.options];
                                                                    updatedOptions[optionIndex] = e.target.value;
                                                                    return { ...q, options: updatedOptions };
                                                                }
                                                                return q;
                                                            });
                                                            setQuiz({ ...quiz, questions: updatedQuestions });
                                                        }}
                                                    />
                                                </span>
                                            ))}
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
                                            <label htmlFor="numOptionsBlank">Number of blanks: </label>
                                            <input id="numOptionsBlank" type="number" min="2" value={numOptionsBlank} className="form-control w-25"
                                                onChange={(e) => setNumOptionsBlank(parseInt(e.target.value))}
                                            />
                                            <div className="form-check">
                                            {Array.from({ length: numOptionsBlank }).map((_, optionIndex) => (
                                                <span className="blank" key={optionIndex}>
                                                    <label htmlFor={`option${optionIndex}`}>Correct answer {optionIndex + 1}: </label>
                                                    <input
                                                        id={`option${optionIndex}`} type="text"
                                                        value={question.options ? question.options[optionIndex] : ""}
                                                        className="form-control w-75"
                                                        onChange={(e) => {
                                                            const updatedQuestions = quiz.questions.map((q, idx) => {
                                                                if (idx === index) {
                                                                    const updatedOptions = [...q.options];
                                                                    updatedOptions[optionIndex] = e.target.value;
                                                                    return { ...q, options: updatedOptions };
                                                                }
                                                                return q;
                                                            });
                                                            setQuiz({ ...quiz, questions: updatedQuestions });
                                                        }}
                                                    />
                                                </span>
                                            ))}
                                        </div>
                                        </div>
                                    )}
                                    <div className="buttons">
                                        <button className="btn btn-secondary">Cancel</button>
                                        <button className="btn btn-danger" onClick={updateQuestion}>Update Question</button>
                                    </div>
                                </div>
                        </li>
                    ))}
                </div>
                <div className="buttons">
                    <button className="btn btn-secondary" onClick={toList}>Cancel</button>
                    <button className="btn btn-secondary" onClick={publishAndUpdate}>Save & Publish</button>
                    <button className="btn btn-secondary" onClick={updateQuiz}>Save</button>
                </div>
            </div>
            )}
        </div>
    )
} export default QuizQuestionsEditor;