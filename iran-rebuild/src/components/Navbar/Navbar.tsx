import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const { pathname } = useLocation();
  const { user, signIn, signOut } = useAuth();

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.brand}>
        Cimurk
      </Link>
      <div className={styles.links}>
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
          <button className={styles.user} onClick={signOut}>
            <img src={user.avatar} alt={user.name} className={styles.avatar} />
            <span>{user.name}</span>
          </button>
        ) : (
          <button className={styles.signIn} onClick={signIn}>
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
