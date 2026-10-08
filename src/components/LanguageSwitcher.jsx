import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div>
      <button onClick={() => changeLanguage("pt")}>🇧🇷 PT</button>

      <button onClick={() => changeLanguage("en")}>🇺🇸 EN</button>
    </div>
  );
}

export default LanguageSwitcher;
