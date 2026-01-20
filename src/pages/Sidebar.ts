import { Page, Locator, expect } from '@playwright/test';

export class Sidebar {
  private categoriesLink: Locator;

  constructor(private page: Page) {
    this.categoriesLink = page.getByRole('link', {
      name: 'Tipos de Categorias',
    });
  }

  async goToCategories() {
    await expect(this.categoriesLink).toBeVisible();
    await this.categoriesLink.click();
  }
}
