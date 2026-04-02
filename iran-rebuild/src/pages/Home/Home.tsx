import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProjects } from "../../context/ProjectContext";
import { usePartners } from "../../context/PartnerContext";
import { useLocalizedPath } from "../../hooks/useLocalizedPath";
import { CATEGORIES } from "../../types";
import styles from "./Home.module.scss";

export default function Home() {
  const { projects } = useProjects();
  const { partners } = usePartners();
  const { t } = useTranslation();
  const lp = useLocalizedPath();

  const top3 = useMemo(
    () => [...projects].sort((a, b) => b.votes - a.votes).slice(0, 3),
    [projects]
  );

  const totalVotes = projects.reduce((sum, p) => sum + p.votes, 0);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img src="/photos/azadi_sq.png" alt="" aria-hidden="true" />
        </div>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.label}>{t("Home_Label")}</p>
          <h1>
            {t("Home_Title")} <span className={styles.accent}>{t("Home_TitleAccent")}</span>
          </h1>
          <p className={styles.sub}>{t("Home_Subtitle")}</p>
          <div className={styles.actions}>
            <Link to={lp("/projects")} className="btn btn-primary">
              {t("Home_ExploreProjects")}
            </Link>
            <Link to={lp("/submit")} className="btn btn-outline">
              {t("Home_SubmitIdea")}
            </Link>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>{projects.length}</span>
              <span className={styles.statLabel}>{t("Home_StatProjects")}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>{totalVotes}</span>
              <span className={styles.statLabel}>{t("Home_StatVotes")}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>{CATEGORIES.length}</span>
              <span className={styles.statLabel}>{t("Home_StatCategories")}</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.topProjects}>
        <h2>{t("Home_TopProjects")}</h2>
        <p className={styles.sectionSub}>{t("Home_TopProjectsSub")}</p>
        <div className={styles.grid}>
          {top3.map((p, i) => (
            <Link to={lp(`/projects/${p.id}`)} key={p.id} className={styles.topCard}>
              <span className={styles.rank}>#{i + 1}</span>
              <div className={styles.topCardMeta}>
                <span className="tag-category">{p.category}</span>
              </div>
              <h3 className={styles.topCardTitle}>{p.title}</h3>
              <p className={styles.topCardDesc}>{p.description}</p>
              <div className={styles.topCardFooter}>
                <span className={styles.topCardVotes}>▲ {p.votes}</span>
                <span className={styles.topCardStage}>{p.stage}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.seeAll}>
          <Link to={lp("/projects")} className="btn btn-outline">
            {t("Home_ViewAll")}
          </Link>
        </div>
      </section>

      <section className={styles.partnersSection}>
        <h2>{t("Home_TopPartners")}</h2>
        <p className={styles.sectionSub}>{t("Home_TopPartnersSub")}</p>
        <div className={styles.marqueeWrap}>
          <div className={styles.marquee}>
            {[...partners, ...partners].map((partner, i) => (
              <div key={`${partner.id}-${i}`} className={styles.partnerChip}>
                <img src={partner.logo} alt={partner.name} className={styles.partnerLogo} />
                <span className={styles.partnerName}>{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.seeAll}>
          <Link to={lp("/partners")} className="btn btn-outline">
            {t("Home_ViewAllPartners")}
          </Link>
        </div>
      </section>
    </>
  );
}
