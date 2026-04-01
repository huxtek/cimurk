import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGS } from "../../i18n";
import type { Lang } from "../../i18n";

export function getLangFromPath(pathname: string): Lang {
  const segment = pathname.split("/")[1];
  return SUPPORTED_LANGS.includes(segment as Lang) && segment !== "en"
    ? (segment as Lang)
    : "en";
}

export default function LanguageLayout() {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const lang = getLangFromPath(pathname);

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }

    const dir = lang === "fa" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
  }, [lang, i18n]);

  return <Outlet />;
}
