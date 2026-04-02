import { Platform } from "react-native";

export const SERIF = "Georgia";

export const SAFE_TOP    = Platform.OS === "ios" ? 54 : Platform.OS === "web" ? 16 : 30;
export const SAFE_BOTTOM = Platform.OS === "ios" ? 34 : 16;

export const C = {
  // ── Backgrounds (warm cream notebook) ───────────
  bg:        "#FAF8F3",
  bg2:       "#F3F0E8",
  bg3:       "#EBE7DD",

  // ── Cards ─────────────────────────────────────────
  card:      "#FFFFFF",
  card2:     "#F7F5EF",

  // ── Borders ───────────────────────────────────────
  border:    "#E5E0D5",
  border2:   "#D4CFC4",

  // ── Text ──────────────────────────────────────────
  white:     "#FFFFFF",
  text:      "#1C1C2E",
  textSec:   "#4A4A5A",
  muted:     "#8E8E9A",
  muted2:    "#AEAEB8",

  // ── German flag colours ───────────────────────────
  flagBlack: "#1A1A1A",
  flagRed:   "#CC0000",
  flagGold:  "#C9A84C",

  // ── Gold (primary accent) ─────────────────────────
  gold:      "#B8922A",
  goldLight: "#C9A84C",
  goldLine:  "rgba(184,146,42,0.25)",
  goldDim:   "rgba(184,146,42,0.08)",

  // ── Red ───────────────────────────────────────────
  red:       "#CC0000",
  redLine:   "rgba(204,0,0,0.20)",
  redDim:    "rgba(204,0,0,0.06)",

  // ── Green (correct) ──────────────────────────────
  green:     "#2E8B57",
  greenLight:"#4CAF50",
  greenLine: "rgba(46,139,87,0.25)",
  greenDim:  "rgba(46,139,87,0.08)",

  // ── Blue ──────────────────────────────────────────
  blue:      "#2563EB",
  blueLine:  "rgba(37,99,235,0.20)",
  blueDim:   "rgba(37,99,235,0.06)",

  // ── Purple ────────────────────────────────────────
  purple:    "#7C3AED",
  purpleLine:"rgba(124,58,237,0.20)",
  purpleDim: "rgba(124,58,237,0.06)",

  // ── Dark (for headers, strong text) ───────────────
  dark:      "#1C1C2E",
  black:     "#111111",
};
