import QuizList from "./List";
import QuizDetails from "./Details";
import { Routes, Route } from "react-router-dom";
//import "./index.css";

function Quizzes() {
  return (
    <div className="container-fluid">
      <Routes>
        <Route path="/" element={<QuizList/>}/>
        <Route path="/:qid" element={<QuizDetails/>}/>
      </Routes>
    </div>
  );
}
export default Quizzes;