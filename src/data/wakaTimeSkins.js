import { parseSkin } from "../terminal/parseSkin";

export const SKINS = ["lista"];
export const DEFAULT_SKIN = "terminal";

// Nomes aceitos (PT e EN) → estilo
const SKIN_ALIASES = {
  lista: "lista",
  list: "lista",
};

export const parseWakaTimeSkin = (args) =>
  parseSkin(args, SKIN_ALIASES, DEFAULT_SKIN);
