import { useTranslation } from "react-i18next";
import { usePartners } from "../../context/PartnerContext";
import { useProjects } from "../../context/ProjectContext";
import styles from "./Partners.module.scss";

export default function Partners() {
  const { t } = useTranslation();
  const { partners } = usePartners();
  const { projects } = useProjects();

  return (
    <section className={styles.section}>
      <h2>{t("Partners_Title")}</h2>
      <p className={styles.sub}>{t("Partners_Subtitle")}</p>

      <div className={styles.grid}>
        {partners.map((partner) => {
          const backedProjects = projects.filter((p) => partner.projectIds.includes(p.id));
          return (
            <a
              key={partner.id}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >
              <img src={partner.logo} alt={partner.name} className={styles.logo} />
              <h3 className={styles.name}>{partner.name}</h3>
              <p className={styles.desc}>{partner.description}</p>
              <div className={styles.footer}>
                <span className={styles.count}>
                  {backedProjects.length} {t("Partners_Projects")}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
