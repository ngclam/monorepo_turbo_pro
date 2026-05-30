import { nowVi } from "@remix/commons";
import type { AlertLevel, GameId, LogLevel, Metrics } from "@remix/services-api";

export const gameName = (game: GameId | "all"): string =>
  ({ memory: "Memory", quiz: "Quiz", snake: "Snake", all: "Tất cả" })[game];

export const metricClass = (value: number): "danger" | "warning" | "ok" =>
  value > 80 ? "danger" : value >= 60 ? "warning" : "ok";

export const nextMetrics = (
  metrics: Metrics,
  random: (min: number, max: number) => number,
): Metrics => ({
  ...metrics,
  cpu: random(20, 92),
  ram: random(35, 88),
  disk: random(45, 86),
  networkIn: random(60, 320),
  networkOut: random(40, 260),
});

export const alertLabel = (level: AlertLevel | "all"): string => level;

export const logLevelLabel = (level: LogLevel | "all"): string => level;

export const timestamp = (): string => nowVi();
