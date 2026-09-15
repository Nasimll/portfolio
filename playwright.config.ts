import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    viewport: { width: 1440, height: 900 },
    // This sandbox ships a pre-installed Chromium at a fixed path instead of
    // Playwright's usual per-version headless-shell download; point at it
    // when present so `npx playwright install` isn't needed here. Harmless
    // no-op on a machine where that path doesn't exist and a normal
    // Playwright browser install is used instead.
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
      : undefined,
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
