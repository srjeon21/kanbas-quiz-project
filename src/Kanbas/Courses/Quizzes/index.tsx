import QuizList from "./List";
import QuizDetails from "./Details";
import QuizDetailsEditor from "./DetailsEditor";
import QuizQuestionsEditor from "./QuestionsEditor";
import { Routes, Route, Navigate } from "react-router-dom";

function Quizzes() {
  return (
    <div className="container-fluid">
      <Routes>
        <Route path="/" element={<QuizList/>}/>
        <Route path="/:qid" element={<QuizDetails/>}/>
        <Route path="/:qid/edit" element={<Navigate to="./details"/>}/>
        <Route path="/:qid/edit/details" element={<QuizDetailsEditor/>}/>
        <Route path="/:qid/edit/questions" element={<QuizQuestionsEditor/>}/>
      </Routes>
    </div>
  );
}
export default Quizzes;