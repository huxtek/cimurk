import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { getLangFromPath } from "../LanguageLayout/LanguageLayout";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, signIn, signOut } = useAuth();

  const currentLang = getLangFromPath(pathname);
  const isFarsi = currentLang === "fa";
  const targetLabel = isFarsi ? "En" : "فا";

  const lp = (path: string) =>
    isFarsi ? `/fa${path === "/" ? "" : path}` : path;

  function switchLanguage() {
    const rest = isFarsi
      ? pathname.replace(/^\/fa/, "") || "/"
      : pathname;
    navigate(isFarsi ? rest : `/fa${pathname === "/" ? "" : pathname}`);
  }

  return (
    <nav className={styles.navbar}>
      <Link to={lp("/")} className={styles.brand}>
        {t("Navbar_Brand")}
      </Link>
      <div className={styles.links}>
        <Link to={lp("/")} className={pathname === lp("/") ? "active" : ""}>
          {t("Navbar_Home")}
        </Link>
        <Link to={lp("/projects")} className={pathname.startsWith(lp("/projects")) ? "active" : ""}>
          {t("Navbar_Projects")}
        </Link>
        <Link to={lp("/submit")} className={pathname === lp("/submit") ? "active" : ""}>
          {t("Navbar_Submit")}
        </Link>
        <button className={styles.langSwitch} onClick={switchLanguage}>
          {targetLabel}
        </button>
        {user ? (
          <button className={styles.user} onClick={signOut}>
            <img src={user.avatar} alt={user.name} className={styles.avatar} />
            <span>{user.name}</span>
          </button>
        ) : (
          <button className={styles.signIn} onClick={signIn}>
            {t("Navbar_SignIn")}
          </button>
        )}
      </div>
    </nav>
  );
}
