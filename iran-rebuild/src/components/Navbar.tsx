import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { pathname } = useLocation();
  const { user, signIn, signOut } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Cimurk
      </Link>
      <div className="navbar-links">
        <Link to="/" className={pathname === "/" ? "active" : ""}>
          Home
        </Link>
        <Link to="/projects" className={pathname.startsWith("/projects") ? "active" : ""}>
          Projects
        </Link>
        <Link to="/submit" className={pathname === "/submit" ? "active" : ""}>
          + Submit
        </Link>
        {user ? (
          <button className="nav-user" onClick={signOut}>
            <img src={user.avatar} alt={user.name} className="nav-avatar" />
            <span>{user.name}</span>
          </button>
        ) : (
          <button className="nav-signin" onClick={signIn}>
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
