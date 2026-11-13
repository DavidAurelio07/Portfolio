import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaUser,
  FaRegCommentDots,
  FaPaperPlane,
} from "react-icons/fa";
import "./Contato.css";

const LINKEDIN = "https://www.linkedin.com/in/david-aurélio-pedrosa-348aa92b5";
const GITHUB = "https://github.com/DavidAurelio07";
const EMAIL = "davidaureliop07@gmail.com";

// Endpoint do Formspree (crie um form grátis em https://formspree.io e cole o
// endpoint na env VITE_FORMSPREE_ENDPOINT, ex.: https://formspree.io/f/xxxxxx).
// Sem ele, o formulário avisa que ainda não está configurado.
const FORM_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT ?? "";

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const Contato = () => {
  const { t } = useTranslation();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  // idle | sending | success | error
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const update = (field) => (event) => {
    setForm((old) => ({ ...old, [field]: event.target.value }));
    if (status === "error") {
      setStatus("idle");
      setFeedback("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setStatus("error");
      setFeedback(t("contact.form.errorRequired"));
      return;
    }
    if (!isValidEmail(email)) {
      setStatus("error");
      setFeedback(t("contact.form.errorEmail"));
      return;
    }
    if (!FORM_ENDPOINT) {
      setStatus("error");
      setFeedback(t("contact.form.notConfigured"));
      return;
    }

    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      setStatus("success");
      setFeedback(t("contact.form.success"));
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setFeedback(t("contact.form.error"));
    }
  };

  const sending = status === "sending";

  return (
    <section id="contato">
      <div className="contato-hero">
        <h2 className="contato-titulo">{t("contact.title")}</h2>
        <p className="contato-subtitulo">{t("contact.subtitle")}</p>
      </div>

      <div className="contato-grid">
        {/* ---------- Canais ---------- */}
        <aside className="contato-canais">
          <h3 className="contato-canais__titulo">{t("contact.channels")}</h3>

          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="contato-item"
          >
            <FaLinkedin className="contato-icone" aria-hidden="true" />
            <span>LinkedIn</span>
          </a>

          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="contato-item"
          >
            <FaGithub className="contato-icone" aria-hidden="true" />
            <span>GitHub</span>
          </a>

          <a href={`mailto:${EMAIL}`} className="contato-item">
            <FaEnvelope className="contato-icone" aria-hidden="true" />
            <span>{EMAIL}</span>
          </a>

          <p className="contato-resposta">{t("contact.responseTime")}</p>
        </aside>

        {/* ---------- Formulário ---------- */}
        <div className="contato-form-card">
          <h3 className="contato-form__titulo">{t("contact.form.title")}</h3>

          <form className="contato-form" onSubmit={handleSubmit} noValidate>
            <div className="contato-campo">
              <label htmlFor="contato-nome">
                <FaUser aria-hidden="true" />
                {t("contact.form.name")}
              </label>
              <input
                id="contato-nome"
                type="text"
                name="name"
                autoComplete="name"
                placeholder={t("contact.form.namePlaceholder")}
                value={form.name}
                onChange={update("name")}
                disabled={sending}
                required
              />
            </div>

            <div className="contato-campo">
              <label htmlFor="contato-email">
                <FaEnvelope aria-hidden="true" />
                {t("contact.form.email")}
              </label>
              <input
                id="contato-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder={t("contact.form.emailPlaceholder")}
                value={form.email}
                onChange={update("email")}
                disabled={sending}
                required
              />
            </div>

            <div className="contato-campo">
              <label htmlFor="contato-mensagem">
                <FaRegCommentDots aria-hidden="true" />
                {t("contact.form.message")}
              </label>
              <textarea
                id="contato-mensagem"
                name="message"
                rows={6}
                placeholder={t("contact.form.messagePlaceholder")}
                value={form.message}
                onChange={update("message")}
                disabled={sending}
                required
              />
            </div>

            {feedback && (
              <p
                className={`contato-feedback contato-feedback--${status}`}
                role={status === "error" ? "alert" : "status"}
              >
                {feedback}
              </p>
            )}

            <button type="submit" className="contato-enviar" disabled={sending}>
              <FaPaperPlane aria-hidden="true" />
              {sending ? t("contact.form.sending") : t("contact.form.submit")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contato;
