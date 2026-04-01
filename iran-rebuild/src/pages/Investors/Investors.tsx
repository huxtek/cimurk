import { useTranslation } from "react-i18next";
import { useInvestors } from "../../context/InvestorContext";
import { useProjects } from "../../context/ProjectContext";
import styles from "./Investors.module.scss";

export default function Investors() {
  const { t } = useTranslation();
  const { investors } = useInvestors();
  const { projects } = useProjects();

  return (
    <section className={styles.section}>
      <h2>{t("Investors_Title")}</h2>
      <p className={styles.sub}>{t("Investors_Subtitle")}</p>

      <div className={styles.grid}>
        {investors.map((inv) => {
          const investedProjects = projects.filter((p) => inv.projectIds.includes(p.id));
          return (
            <a
              key={inv.id}
              href={inv.website}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >
              <img src={inv.logo} alt={inv.name} className={styles.logo} />
              <h3 className={styles.name}>{inv.name}</h3>
              <p className={styles.desc}>{inv.description}</p>
              <div className={styles.footer}>
                <span className={styles.count}>
                  {investedProjects.length} {t("Investors_Projects")}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
