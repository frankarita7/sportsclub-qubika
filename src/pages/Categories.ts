import { Page, Locator, expect } from '@playwright/test';

export class Categories {
  private addButton: Locator;
  private modal: Locator;
  private nameInput: Locator;
  private acceptButton: Locator;
  private toast: Locator;

  constructor(private page: Page) {
    this.addButton = page.getByRole('button', { name: 'Adicionar' });
    this.modal = page.locator('mat-dialog-container');
    this.nameInput = this.modal.locator('input[formcontrolname="name"]');
    this.acceptButton = this.modal.getByRole('button', { name: 'Aceptar' });

    this.toast = page.locator('#toast-container .toast-message');
  }

  async assertPageLoaded() {
    await expect(this.page).toHaveURL(/#\/category-type/, {
      timeout: 20000,
    });

    await expect(
      this.page.getByRole('heading', { name: /categor/i })
    ).toBeVisible();
  }

  async addCategory(name: string) {
    await expect(this.addButton).toBeVisible();
    await this.addButton.click();

    await expect(this.modal).toBeVisible();
    await this.nameInput.fill(name);

    await expect(this.acceptButton).toBeEnabled();
    await this.acceptButton.click();
  }

  async assertSuccess() {
    await expect(this.toast).toBeVisible({ timeout: 5000 });
    await expect(this.toast).toContainText(
      'Tipo de categoría adicionada satisfactoriamente'
    );
  }
}
