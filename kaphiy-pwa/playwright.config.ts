import { defineConfig, devices } from "@playwright/test";

/**
 * Configuración de Playwright para PRUEBAS DEL SISTEMA de la PWA Kaphiy.
 * Se ejecuta contra el servidor de desarrollo ya corriendo en localhost:3000.
 * - PWA (Cliente):  http://localhost:3000
 * - Backend (API):  http://localhost:3001
 */
export default defineConfig({
  testDir: "./e2e-system",
  fullyParallel: false,
  retries: 0,
  workers: 1,
  timeout: 30_000,
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "playwright-system-report" }],
    ["json", { outputFile: "playwright-system-results.json" }],
  ],
  use: {
    baseURL: "http://localhost:3000",
    trace: "on",
    screenshot: "on",
    video: "on",
    actionTimeout: 15_000,
    navigationTimeout: 20_000,
  },
  projects: [
    {
      name: "pwa-mobile",
      use: {
        // Emulación de móvil usando Chromium (no requiere WebKit)
        ...devices["iPhone 12"],
        defaultBrowserType: "chromium",
      },
    },
    {
      name: "pwa-desktop",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  // No levanta servidor: asume que la PWA ya está corriendo en :3000
  webServer: undefined,
});
