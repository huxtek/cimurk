import { useState, useRef, useEffect } from "react";
import styles from "./CheckboxDropdown.module.scss";

interface Props {
  label: string;
  options: readonly string[];
  selected: Set<string>;
  onChange: (next: Set<string>) => void;
}

export default function CheckboxDropdown({ label, options, selected, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
    ? `${label} — All`
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
            <span>All</span>
          </label>
          {options.map((opt) => (
            <label key={opt} className={styles.option}>
              <input
                type="checkbox"
                checked={selected.has(opt)}
                onChange={() => toggle(opt)}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
