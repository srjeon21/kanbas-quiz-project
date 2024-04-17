import Kanbas from "./Kanbas";
import {HashRouter} from "react-router-dom"
import {Routes, Route, Navigate} from "react-router";

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/"         element={<Navigate to="/Kanbas/Dashboard"/>}/>
          <Route path="/Kanbas/*" element={<Kanbas/>}/>
        </Routes>
      </div>
    </HashRouter>
  );
}
export default App;