import {Link, useLocation } from "react-router-dom";

function Nav() {
    const { pathname } = useLocation();
    const removeEnd = () => {
        const path = pathname.split('/');
        const last = path.pop();
        return path.join('/');
    };
    return (
        <nav className="nav nav-tabs mt-2">
            <Link className={`nav-link ${pathname.includes("details") ? "active" : ""}`}
                to={`${removeEnd()}/details`}>Details</Link>
            <Link className={`nav-link ${pathname.includes("questions") ? "active" : ""}`}
                to={`${removeEnd()}/questions`}>Questions</Link>
        </nav>
    );
} export default Nav;