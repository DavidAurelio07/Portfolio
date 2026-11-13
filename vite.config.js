import tls from "node:tls";

import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// Antivírus/proxy (Avast, Kaspersky, Zscaler...) que inspecionam HTTPS
// reassinam os certificados com uma CA raiz própria. O Windows confia nela,
// mas o Node usa seu bundle embutido e não: o fetch para o WakaTime falharia
// com UNABLE_TO_VERIFY_LEAF_SIGNATURE. Juntar as CAs do sistema às padrão
// resolve, sem precisar da flag --use-system-ca no comando. Só afeta o dev.
try {
  tls.setDefaultCACertificates([
    ...tls.getCACertificates("default"),
    ...tls.getCACertificates("system"),
  ]);
} catch {
  // Node antigo sem essa API: siga sem alterar (NODE_OPTIONS=--use-system-ca é o plano B)
}

// Serve as rotas /api/* durante o npm run dev / npm run preview.
// Em produção quem faz isso são as Vercel Functions da pasta api/.
//
// As variáveis WAKATIME_* (sem o prefixo VITE_) ficam só aqui no servidor e
// nunca vão para o bundle do navegador.
function wakatimeApi(env) {
  // Os handlers da pasta api/ são carregados só na PRIMEIRA chamada à rota, via
  // import() dentro do request (cacheado).
  //
  // O caminho é montado a partir de uma VARIÁVEL (não string literal) de
  // propósito: o Vite 8 empacota o vite.config.js com o rolldown e seguiria
  // qualquer import() literal, puxando toda a cadeia do WakaTime (incl.
  // wakaTimeConfig.js, em src/) para dentro do config — o que vigia esses
  // arquivos como dependência e reinicia o server em loop. Com o specifier
  // dinâmico, o bundler não segue: o módulo resolve só em runtime, pelo Node.
  const fromHere = (file) =>
    new URL(file, import.meta.url).href; /* evita análise estática */

  let wakatime; // Promise<handler> (cache)
  let codando; // Promise<handler|null> (cache)

  const loadWakaTime = () =>
    (wakatime ??= import(fromHere("./api/_wakatime.js")).then(
      (m) => m.handleWakaTime,
    ));

  const loadCodando = () =>
    (codando ??= import(fromHere("./api/_codando.js"))
      .then((m) => m.handleCodando)
      .catch(() => null)); // sem o arquivo, a rota responde 503 e o cartão some

  return {
    name: "wakatime-api",
    configureServer(server) {
      // Monta sem path para o req.url chegar inteiro (com ?range=...) ao handler.
      server.middlewares.use(async (req, res, next) => {
        const path = req.url.split("?")[0];

        if (path === "/api/wakatime") {
          const handler = await loadWakaTime();
          return handler(req, res, env);
        }

        if (path === "/api/codando") {
          const handler = await loadCodando();
          if (handler) return handler(req, res, env);
          res.statusCode = 503;
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.end(
            JSON.stringify({
              error: "unavailable",
              message: "Rota /api/codando não configurada.",
            })
          );
          return;
        }

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Carrega o .env.local etc. SEM filtrar por prefixo ("" = todas as chaves),
  // para ler WAKATIME_ACCESS_TOKEN e as demais que não têm VITE_.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), wakatimeApi(env)],
  };
});
