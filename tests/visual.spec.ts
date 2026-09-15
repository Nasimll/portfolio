import { test } from "@playwright/test";

const sections = ["about", "skills", "experience", "projects", "contact"];

for (const theme of ["dark", "light"] as const) {
  test(`capture sections — ${theme}`, async ({ page }) => {
    await page.goto("/");
    if (theme === "light") {
      await page.getByLabel(/day mode/i).click();
      await page.waitForTimeout(500);
    }
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `screenshots/${theme}/hero.png` });

    for (const id of sections) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      await page.screenshot({ path: `screenshots/${theme}/${id}.png` });
    }
  });
}
