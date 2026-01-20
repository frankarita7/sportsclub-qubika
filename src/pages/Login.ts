import { Page, Locator, expect } from '@playwright/test';

export class Login {
  private emailInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;

  constructor(private page: Page) {
    this.emailInput = page.locator('input[formcontrolname="email"]');
    this.passwordInput = page.locator('input[formcontrolname="password"]');
    this.loginButton = page.getByRole('button', { name: 'Autenticar' });
  }

  async goto() {
    await this.page.goto(
      'https://club-administration.qa.qubika.com/#/auth/login'
    );
  }

  async login(username: string, password: string) {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();

    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);

    await expect(this.loginButton).toBeEnabled();
    await this.loginButton.click();
  }

  async assertLoggedIn() {
    await expect(
      this.page.locator('#sidenav-main')
    ).toBeVisible({ timeout: 15000 });


    await expect(this.page).toHaveURL(/#\/dashboard/, {
      timeout: 20000,
    });

    await expect(
      this.page.getByRole('link', { name: /Dashboard/i })
    ).toBeVisible();
  }
}
