import { Page, Locator, expect } from '@playwright/test';

export class Categories {
  private addButton: Locator;
  private modal: Locator;
  private nameInput: Locator;
  private acceptButton: Locator;

  private subCategoryCheckbox: Locator;
  private parentCategorySelect: Locator;

  private toastContainer: Locator;

  constructor(private page: Page) {
    this.addButton = page.getByRole('button', { name: 'Adicionar' });
    this.modal = page.locator('mat-dialog-container');

    this.nameInput = this.modal.locator('input[formcontrolname="name"]');
    this.acceptButton = this.modal.getByRole('button', { name: 'Aceptar' });

    this.subCategoryCheckbox = this.modal.locator('input[formcontrolname="subCategory"]');

    // ng-select (parent category)
    this.parentCategorySelect = this.modal.locator('ng-select[formcontrolname="categoryId"]');

    this.toastContainer = page.locator('#toast-container');
  }

  async goto() {
    await this.page.goto('/#/category-type');
  }

  async assertPageLoaded() {
    await expect(this.page).toHaveURL(/#\/category-type/, { timeout: 20000 });
    await expect(this.page.getByRole('heading', { name: /categor/i })).toBeVisible();
  }

  async openAddModal() {
    await expect(this.addButton).toBeVisible();
    await this.addButton.click();
    await expect(this.modal).toBeVisible();
  }

  async addSubCategory(subCategoryName: string, parentCategoryName: string) {
  await this.openAddModal();

    // Fill subcategory name
  await this.nameInput.fill(subCategoryName);
  // Mark "Is subcategory?"
  await this.subCategoryCheckbox.scrollIntoViewIfNeeded();

  // click label is usually the safest with custom checkboxes
  await this.modal.locator('label[for="customCheckMain"]').click();
  await expect(this.subCategoryCheckbox).toBeChecked();

  // wait for parent dropdown to show up
    await expect(this.parentCategorySelect).toBeVisible({ timeout: 10000 });
   
    await this.parentCategorySelect.locator('.ng-select-container').click();
    const option = this.page
      .locator('.ng-dropdown-panel .ng-option .ng-option-label')
      .filter({ hasText: parentCategoryName })
      .first();

    await expect(option).toBeVisible({ timeout: 10000 });
    await option.click();

    await expect(this.acceptButton).toBeEnabled({ timeout: 10000 });
    await this.acceptButton.click();
  }

  async addCategory(name: string) {
    await expect(this.addButton).toBeVisible();
    await this.addButton.click();

    await expect(this.modal).toBeVisible();
    await this.nameInput.fill(name);

    await expect(this.acceptButton).toBeEnabled();
    await this.acceptButton.click();
  }

  async assertSuccessToast() {
    await expect(this.toastContainer).toBeVisible({ timeout: 5000 });
    await expect(this.toastContainer).toContainText(
      'Tipo de categoría adicionada satisfactoriamente'
    );
  }
 
}
