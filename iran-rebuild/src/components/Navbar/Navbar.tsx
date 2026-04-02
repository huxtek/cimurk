import { useState } from "react";
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
  const [drawerOpen, setDrawerOpen] = useState(false);

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
    setDrawerOpen(false);
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  return (
    <>
      <nav className={styles.navbar}>
        <Link to={lp("/")} className={styles.brand}>
          {t("Navbar_Brand")}
        </Link>

        <div className={styles.desktopLinks}>
          <Link to={lp("/")} className={pathname === lp("/") ? "active" : ""}>
            {t("Navbar_Home")}
          </Link>
          <Link to={lp("/projects")} className={pathname.startsWith(lp("/projects")) ? "active" : ""}>
            {t("Navbar_Projects")}
          </Link>
          <Link to={lp("/submit")} className={pathname === lp("/submit") ? "active" : ""}>
            {t("Navbar_Submit")}
          </Link>
          <Link to={lp("/partners")} className={pathname.startsWith(lp("/partners")) ? "active" : ""}>
            {t("Navbar_Partners")}
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

        <button
          className={styles.hamburger}
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {drawerOpen && <div className={styles.overlay} onClick={closeDrawer} />}

      <aside className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ""}`}>
        <button className={styles.closeBtn} onClick={closeDrawer} aria-label="Close menu">
          ✕
        </button>

        <div className={styles.drawerLinks}>
          <Link to={lp("/")} onClick={closeDrawer} className={pathname === lp("/") ? "active" : ""}>
            {t("Navbar_Home")}
          </Link>
          <Link to={lp("/projects")} onClick={closeDrawer} className={pathname.startsWith(lp("/projects")) ? "active" : ""}>
            {t("Navbar_Projects")}
          </Link>
          <Link to={lp("/submit")} onClick={closeDrawer} className={pathname === lp("/submit") ? "active" : ""}>
            {t("Navbar_Submit")}
          </Link>
          <Link to={lp("/partners")} onClick={closeDrawer} className={pathname.startsWith(lp("/partners")) ? "active" : ""}>
            {t("Navbar_Partners")}
          </Link>
        </div>

        <div className={styles.drawerFooter}>
          <button className={styles.langSwitch} onClick={switchLanguage}>
            {targetLabel}
          </button>
          {user ? (
            <button className={styles.user} onClick={() => { signOut(); closeDrawer(); }}>
              <img src={user.avatar} alt={user.name} className={styles.avatar} />
              <span>{user.name}</span>
            </button>
          ) : (
            <button className={styles.signIn} onClick={() => { signIn(); closeDrawer(); }}>
              {t("Navbar_SignIn")}
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
