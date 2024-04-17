import ModuleList from "../Modules/List";
import CourseStatus from "./CourseStatus";
import "./index.css"

function Home() {
  return (
    <>
    <div className="d-flex">
      <div className="flex-fill">
        <ModuleList />
      </div>
      <div className="col-3 d-none d-xl-block" id="course-status">
        <CourseStatus />
      </div>
    </div>
    </>
  );
}
export default Home;