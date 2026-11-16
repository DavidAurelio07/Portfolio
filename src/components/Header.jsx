import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiMenu, FiX } from "react-icons/fi";
import LanguageSwitcher from "./LanguageSwitcher/LanguageSwitcher.jsx";
import "./Header.css";

function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: t("header.home"), end: true },
    { to: "/dados", label: t("header.data") },
    { to: "/resume", label: t("header.resume") },
    { to: "/projetos", label: t("header.projects") },
    { to: "/contate", label: t("header.contact") },
  ];

  // Fecha o menu ao trocar de página
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Fecha com Esc e trava o scroll do fundo enquanto o menu está aberto
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink to="/" className="site-header__brand" end>
          David Aurélio
        </NavLink>

        <button
          type="button"
          className="site-header__toggle"
          aria-label={open ? t("header.closeMenu") : t("header.openMenu")}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>

        <nav
          id="site-nav"
          className={`site-nav ${open ? "is-open" : ""}`}
          aria-label={t("header.navLabel")}
        >
          <ul className="site-nav__list">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `site-nav__link ${isActive ? "is-active" : ""}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="site-nav__lang">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>

      {/* Fundo escuro clicável atrás do menu no mobile */}
      {open && (
        <button
          type="button"
          className="site-header__backdrop"
          aria-hidden="true"
          tabIndex={-1}
          onClick={() => setOpen(false)}
        />
      )}
    </header>
  );
}

export default Header;
