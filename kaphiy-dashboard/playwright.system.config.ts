import { defineConfig, devices } from "@playwright/test";

/**
 * Configuración de Playwright para PRUEBAS DEL SISTEMA (System Testing)
 * Se ejecuta contra los servidores de desarrollo ya corriendo localmente.
 * - Dashboard (Admin):  http://localhost:3003
 * - PWA (Cliente):      http://localhost:3000
 * - Backend (API):      http://localhost:3001
 */
export default defineConfig({
  testDir: "./e2e-system",
  fullyParallel: false, // Secuencial para E2E de flujos reales
  retries: 0,
  workers: 1,
  timeout: 30_000,
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "playwright-system-report" }],
    ["json", { outputFile: "playwright-system-results.json" }],
  ],
  use: {
    baseURL: "http://localhost:3003",
    trace: "on",
    screenshot: "on",
    video: "on",
    actionTimeout: 15_000,
    navigationTimeout: 20_000,
  },
  projects: [
    {
      name: "dashboard-desktop",
      testMatch: /dashboard\.system\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "pwa-mobile",
      testMatch: /pwa\.system\.spec\.ts/,
      use: {
        ...devices["iPhone 12"],
        defaultBrowserType: "chromium",
        baseURL: "http://localhost:3000",
      },
    },
  ],
  // No levanta servidor: asume que los 3 servidores ya están corriendo
  webServer: undefined,
});
