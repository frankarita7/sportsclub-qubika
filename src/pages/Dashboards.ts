import { Page, Locator, expect } from '@playwright/test';

export class Dashboard {
  private sidebar: Locator;
  private dashboardLink: Locator;
  private contributionsLink: Locator;

  constructor(private page: Page) {
    this.sidebar = page.locator('#sidenav-main');
    this.dashboardLink = page.getByRole('link', { name: /Dashboard/i });
    this.contributionsLink = page.getByRole('link', {
      name: /Contribuciones/i,
    });
  }

  async assertDashboardLoaded() {

    await expect(this.page).toHaveURL(/#\/dashboard/, {
      timeout: 20000,
    });

    await expect(this.sidebar).toBeVisible();

    await expect(this.dashboardLink).toBeVisible();
  }

  async goToContributions() {
    await expect(this.contributionsLink).toBeVisible();
    await this.contributionsLink.click();

    await expect(this.page).toHaveURL(/#\/contributions/, {
      timeout: 20000,
    });

    await expect(
      this.page.getByRole('heading', { name: 'Contribuciones' })
    ).toBeVisible();
  }
}
