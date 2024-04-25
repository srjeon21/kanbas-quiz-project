import {Link, useLocation } from "react-router-dom";

function Nav() {
    const { pathname } = useLocation();
    return (
        <nav className="nav nav-tabs mt-2">
            <Link className={`nav-link ${pathname.includes("details") ? "active" : ""}`}
                to="./details">Details</Link>
            <Link className={`nav-link ${pathname.includes("questions") ? "active" : ""}`}
                to="./questions">Questions</Link>
        </nav>
    );
} export default Nav;