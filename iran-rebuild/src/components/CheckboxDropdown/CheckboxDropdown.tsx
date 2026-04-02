import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./CheckboxDropdown.module.scss";

interface Props {
  label: string;
  options: readonly string[];
  selected: Set<string>;
  onChange: (next: Set<string>) => void;
  translateOption?: (opt: string) => string;
}

export default function CheckboxDropdown({ label, options, selected, onChange, translateOption }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const allSelected = selected.size === options.length;

  function toggle(item: string) {
    const next = new Set(selected);
    if (next.has(item)) {
      next.delete(item);
    } else {
      next.add(item);
    }
    onChange(next);
  }

  function toggleAll() {
    onChange(allSelected ? new Set() : new Set<string>(Array.from(options)));
  }

  const buttonLabel = allSelected
    ? `${label} — ${t("Filter_All")}`
    : `${label} (${selected.size})`;

  return (
    <div className={styles.dropdown} ref={ref}>
      <button
        className={`btn btn-outline ${styles.toggle}`}
        onClick={() => setOpen((o) => !o)}
      >
        {buttonLabel}
        <span className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}>▾</span>
      </button>

      {open && (
        <div className={styles.menu}>
          <label className={styles.option}>
            <input type="checkbox" checked={allSelected} onChange={toggleAll} />
            <span>{t("Filter_All")}</span>
          </label>
          {options.map((opt) => (
            <label key={opt} className={styles.option}>
              <input
                type="checkbox"
                checked={selected.has(opt)}
                onChange={() => toggle(opt)}
              />
              <span>{translateOption ? translateOption(opt) : opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
