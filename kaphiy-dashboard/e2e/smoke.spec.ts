import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// ── Login page ──────────────────────────────────────────────

test.describe("Login page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("renders brand name and PIN input", async ({ page }) => {
    await expect(page.getByText(/PRALIN/)).toBeVisible();
    await expect(page.getByRole("textbox", { name: /PIN/i })).toBeVisible();
  });

  test("submit button is disabled when PIN is empty", async ({ page }) => {
    await expect(page.getByRole("button", { name: /ingresar/i })).toBeDisabled();
  });

  test("submit button enables after entering PIN", async ({ page }) => {
    await page.getByRole("textbox", { name: /PIN/i }).fill("1234");
    await expect(page.getByRole("button", { name: /ingresar/i })).toBeEnabled();
  });

  test("toggle shows and hides PIN text", async ({ page }) => {
    const input = page.getByRole("textbox", { name: /PIN/i });
    await input.fill("1234");
    await expect(input).toHaveAttribute("type", "password");
    await page.getByRole("button", { name: /mostrar PIN/i }).click();
    await expect(input).toHaveAttribute("type", "text");
    await page.getByRole("button", { name: /ocultar PIN/i }).click();
    await expect(input).toHaveAttribute("type", "password");
  });

  test("has no critical a11y violations — WCAG 2.1 AA", async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    const critical = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );
    expect(critical, JSON.stringify(critical, null, 2)).toHaveLength(0);
  });
});

// ── Root redirect ───────────────────────────────────────────

test("root / redirects to /orders or /login", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/(orders|login)/);
});

// ── Orders page (unauthenticated) ───────────────────────────

test.describe("Orders page — unauthenticated", () => {
  test("redirects to /login when not authenticated", async ({ page }) => {
    // Clear any persisted auth state
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
    await page.goto("/orders");
    await expect(page).toHaveURL(/\/login/);
  });
});
