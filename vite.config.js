import tls from "node:tls";

import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

import { handleWakaTime } from "./api/_wakatime.js";

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
  // "Codando agora" (/api/codando) é opcional: só existe se houver api/_codando.js.
  let handleCodando = null;

  return {
    name: "wakatime-api",
    async configResolved() {
      try {
        ({ handleCodando } = await import("./api/_codando.js"));
      } catch {
        handleCodando = null; // sem o arquivo, a rota responde 503 e o cartão some
      }
    },
    configureServer(server) {
      // Monta sem path para o req.url chegar inteiro (com ?range=...) ao handler.
      server.middlewares.use((req, res, next) => {
        const path = req.url.split("?")[0];

        if (path === "/api/wakatime") {
          return handleWakaTime(req, res, env);
        }

        if (path === "/api/codando") {
          if (handleCodando) return handleCodando(req, res, env);
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
