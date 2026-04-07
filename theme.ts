import { Platform } from "react-native";

export const SERIF = "Georgia";

export const SAFE_TOP    = Platform.OS === "ios" ? 54 : Platform.OS === "web" ? 16 : 30;
export const SAFE_BOTTOM = Platform.OS === "ios" ? 34 : 16;

export const C = {
  // ── Backgrounds (clean, warm white — like a travel journal) ──
  bg:        "#FAFAFA",
  bg2:       "#F2F2F7",
  bg3:       "#E8E8ED",

  // ── Cards ─────────────────────────────────────────
  card:      "#FFFFFF",
  card2:     "#F5F5FA",

  // ── Borders ───────────────────────────────────────
  border:    "#E2E2EA",
  border2:   "#D0D0DA",

  // ── Text ──────────────────────────────────────────
  white:     "#FFFFFF",
  text:      "#1A1A2E",
  textSec:   "#4A4A60",
  muted:     "#8A8AA0",
  muted2:    "#B0B0C0",

  // ── German flag colours (accent system) ───────────
  flagBlack: "#1A1A2E",
  flagRed:   "#E53935",
  flagGold:  "#FFB300",

  // ── Gold (warm, premium — primary accent) ─────────
  gold:      "#FFB300",
  goldLight: "#FFC940",
  goldLine:  "rgba(255,179,0,0.30)",
  goldDim:   "rgba(255,179,0,0.08)",

  // ── Red (warm red — streak, urgency) ──────────────
  red:       "#E53935",
  redLine:   "rgba(229,57,53,0.25)",
  redDim:    "rgba(229,57,53,0.08)",

  // ── Green (fresh — success) ───────────────────────
  green:     "#43A047",
  greenLight:"#66BB6A",
  greenLine: "rgba(67,160,71,0.25)",
  greenDim:  "rgba(67,160,71,0.08)",

  // ── Blue ──────────────────────────────────────────
  blue:      "#1E88E5",
  blueLine:  "rgba(30,136,229,0.25)",
  blueDim:   "rgba(30,136,229,0.08)",

  // ── Purple ────────────────────────────────────────
  purple:    "#7E57C2",
  purpleLine:"rgba(126,87,194,0.25)",
  purpleDim: "rgba(126,87,194,0.08)",

  // ── Dark ──────────────────────────────────────────
  dark:      "#1A1A2E",
  black:     "#111118",
};
