// Single source of truth for the default scorer engine. Both per-process
// (useAnalysis) and project (useProject / SolutionApp) modes read from here so
// the UI selector and the dispatched request agree. The server normalises any
// other value back to "hybrid" so the two modes can never drift apart on
// scorer choice for the same evidence.
export const DEFAULT_ENGINE = "hybrid";
