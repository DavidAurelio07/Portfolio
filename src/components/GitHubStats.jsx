import { useEffect, useState } from "react";
import { FaGithub, FaStar } from "react-icons/fa";
import "./GitHubStats.css";

const USERNAME = "DavidAurelio07";
const MAX_REPOS = 6;
const API = "https://api.github.com";

function checkResponse(response) {
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

function buildStats(profile, allRepos) {
  const repos = allRepos.filter((repo) => !repo.fork);

  const stars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

  const languageCount = {};
  repos.forEach((repo) => {
    if (repo.language) {
      languageCount[repo.language] = (languageCount[repo.language] ?? 0) + 1;
    }
  });
  const languages = Object.entries(languageCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name]) => name);

  const recent = [...repos]
    .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
    .slice(0, MAX_REPOS);

  return { profile, stars, languages, recent, repoCount: repos.length };
}

function GitHubStats() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();
    const options = { signal: controller.signal };

    Promise.all([
      fetch(`${API}/users/${USERNAME}`, options).then(checkResponse),
      fetch(`${API}/users/${USERNAME}/repos?per_page=100`, options).then(
        checkResponse,
      ),
    ])
      .then(([profile, repos]) => {
        setData(buildStats(profile, repos));
        setStatus("ok");
      })
      .catch((error) => {
        if (error.name !== "AbortError") setStatus("error");
      });

    return () => controller.abort();
  }, []);

  return (
    <section className="gh" id="github">
      {status === "loading" && <p className="gh__msg">Carregando...</p>}
      {status === "error" && (
        <p className="gh__msg">
          Não foi possível carregar os dados do GitHub agora.
        </p>
      )}

      {status === "ok" && (
        <>
          <header className="gh__profile">
            <img
              className="gh__avatar"
              src={data.profile.avatar_url}
              alt={`Foto de ${data.profile.login}`}
            />
            <div className="gh__info">
              <h2 className="gh__name">
                {data.profile.name || data.profile.login}
              </h2>
              <a
                className="gh__user"
                href={data.profile.html_url}
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub /> @{data.profile.login}
              </a>
              {data.profile.bio && (
                <p className="gh__bio">{data.profile.bio}</p>
              )}
            </div>
          </header>

          <ul className="gh__stats">
            <li>
              <strong>{data.repoCount}</strong>
              <span>repositórios</span>
            </li>
            <li>
              <strong>{data.profile.followers}</strong>
              <span>seguidores</span>
            </li>
            <li>
              <strong>{data.stars}</strong>
              <span>estrelas</span>
            </li>
          </ul>

          {data.languages.length > 0 && (
            <ul className="gh__tags">
              {data.languages.map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
          )}
          <p>Repositórios atualizados recentemente:</p>
          <ul className="gh__repos">
            {data.recent.map((repo) => (
              <li key={repo.id}>
                <a
                  className="gh__repo"
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="gh__repo-name">{repo.name}</span>
                  <span className="gh__repo-desc">
                    {repo.description || "Sem descrição"}
                  </span>
                  <span className="gh__repo-meta">
                    {repo.language && <span>{repo.language}</span>}
                    <span>
                      <FaStar /> {repo.stargazers_count}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

export default GitHubStats;
