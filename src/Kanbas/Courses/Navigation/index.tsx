import { Link, useLocation } from "react-router-dom";
import "./index.css"; // feel free to use the CSS from previous assignments
function CourseNavigation() {
  const links = ["Home", "Modules", "Piazza", "Assignments", "Quizzes", "Grades",
                "People", "Panopto Video", "Discussions", "Announcements", "Pages", "Files",
                "Rubrics", "Outcomes", "Collaborations", "Syllabus", "Settings"];
  const { pathname } = useLocation();
  const courseId = pathname.split("/")[3];
  return (
    <ul className="wd-navigation">
        {links.map((link, index) => (
        <li key={index} className={pathname.includes(link) ? "wd-active" : ""}>
          <Link to={`/Kanbas/Courses/${courseId}/${link}`}>{link}</Link>
        </li>
      ))}
    </ul>
  );
}
export default CourseNavigation;