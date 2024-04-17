import { Link, useLocation } from "react-router-dom";
function Nav() {
  const {pathname } = useLocation();
 return (
   <nav className="nav nav-tabs mt-2">
     <Link className={`nav-link ${pathname.includes("Kanbas") ? "active" : ""}`}
           to="/Kanbas">Kanbas</Link>
   </nav>
 );
}
export default Nav;