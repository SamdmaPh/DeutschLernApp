import { Platform } from "react-native";

export const SERIF = "Georgia";

export const SAFE_TOP    = Platform.OS === "ios" ? 54 : 30;
export const SAFE_BOTTOM = Platform.OS === "ios" ? 34 : 16;

export const C = {
  // ── Base backgrounds ──────────────────────────────
  bg:        "#070B18",
  bg3:       "#0F1628",
  navy:      "#070B18",
  navy2:     "#0A1020",
  navy3:     "#0F1628",

  // ── Cards ─────────────────────────────────────────
  card:      "#0D1525",
  card2:     "#0A1020",

  // ── Borders ───────────────────────────────────────
  border:    "#1E2D45",
  border2:   "#162035",

  // ── Text ──────────────────────────────────────────
  white:     "#FFFFFF",
  text:      "#E2E8F0",
  muted:     "#64748B",
  muted2:    "#4A5568",

  // ── German flag colours ───────────────────────────
  flagBlack: "#1A1A1A",
  flagRed:   "#CC0000",
  flagGold:  "#C9A84C",

  // ── Gold ──────────────────────────────────────────
  gold:      "#C9A84C",
  goldLine:  "rgba(201,168,76,0.25)",
  goldDim:   "rgba(201,168,76,0.10)",

  // ── Red ───────────────────────────────────────────
  red:       "#CC0000",
  redLine:   "rgba(204,0,0,0.30)",
  redDim:    "rgba(204,0,0,0.10)",

  // ── Green ─────────────────────────────────────────
  green:     "#22C55E",
  greenLine: "rgba(34,197,94,0.25)",
  greenDim:  "rgba(34,197,94,0.10)",

  // ── Blue ──────────────────────────────────────────
  blue:      "#3B82F6",
  blueLine:  "rgba(59,130,246,0.25)",
  blueDim:   "rgba(59,130,246,0.10)",

  // ── Purple ────────────────────────────────────────
  purple:    "#8B5CF6",
  purpleLine:"rgba(139,92,246,0.25)",
  purpleDim: "rgba(139,92,246,0.10)",

  // ── Black (for wordmark) ──────────────────────────
  black:     "#111111",
};
