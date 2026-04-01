import { useLocation } from "react-router-dom";
import { getLangFromPath } from "../components/LanguageLayout/LanguageLayout";

export function useLocalizedPath() {
  const { pathname } = useLocation();
  const lang = getLangFromPath(pathname);
  const isFarsi = lang === "fa";

  return (path: string) =>
    isFarsi ? `/fa${path === "/" ? "" : path}` : path;
}
