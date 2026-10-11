import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher/LanguageSwitcher.jsx";
import "./Header.css";

function Header() {
  const { t } = useTranslation();

  return (
    <header>
      <nav aria-label={t("header.navLabel")}>
        <Link to="/">{t("header.home")}</Link>

        <Link to="/dados">{t("header.data")}</Link>

        <Link to="/resume">{t("header.resume")}</Link>

        <Link to="/projetos">{t("header.projects")}</Link>

        <Link to="/contate">{t("header.contact")}</Link>
      </nav>

      <LanguageSwitcher />
    </header>
  );
}

export default Header;
