import { Platform } from "react-native";

export const SERIF = "Georgia";

export const SAFE_TOP    = Platform.OS === "ios" ? 54 : Platform.OS === "web" ? 16 : 30;
export const SAFE_BOTTOM = Platform.OS === "ios" ? 34 : 16;

export const C = {
  // ── Backgrounds (dark game theme — Schwarz from flag) ──
  bg:        "#0D0E14",
  bg2:       "#141520",
  bg3:       "#1C1D2A",

  // ── Cards ─────────────────────────────────────────
  card:      "#181926",
  card2:     "#1F2030",

  // ── Borders ───────────────────────────────────────
  border:    "#2A2B3A",
  border2:   "#35364A",

  // ── Text ──────────────────────────────────────────
  white:     "#FFFFFF",
  text:      "#F0F0F5",
  textSec:   "#A0A0B8",
  muted:     "#5A5A70",
  muted2:    "#3E3E52",

  // ── German flag colours (subtly woven in) ─────────
  flagBlack: "#0D0E14",      // IS the background
  flagRed:   "#DD0000",
  flagGold:  "#FFCC00",

  // ── Gold (PRIMARY accent — from German flag) ──────
  gold:      "#FFCC00",
  goldLight: "#FFD633",
  goldLine:  "rgba(255,204,0,0.25)",
  goldDim:   "rgba(255,204,0,0.10)",

  // ── Red (streak, urgency — from German flag) ──────
  red:       "#DD0000",
  redLine:   "rgba(221,0,0,0.25)",
  redDim:    "rgba(221,0,0,0.10)",

  // ── Green (correct/success) ───────────────────────
  green:     "#34D399",
  greenLight:"#4ADE80",
  greenLine: "rgba(52,211,153,0.25)",
  greenDim:  "rgba(52,211,153,0.10)",

  // ── Blue ──────────────────────────────────────────
  blue:      "#60A5FA",
  blueLine:  "rgba(96,165,250,0.25)",
  blueDim:   "rgba(96,165,250,0.10)",

  // ── Purple ────────────────────────────────────────
  purple:    "#A78BFA",
  purpleLine:"rgba(167,139,250,0.25)",
  purpleDim: "rgba(167,139,250,0.10)",

  // ── Dark (legacy compat) ──────────────────────────
  dark:      "#0D0E14",
  black:     "#080810",
};
