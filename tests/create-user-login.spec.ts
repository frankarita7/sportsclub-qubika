import { test } from '@playwright/test';
import { Login } from '../src/pages/Login';
import { Dashboard } from '../src/pages/Dashboards';

test.describe('Qubika Club - Login flow', () => {
  test('User can login with valid credentials', async ({ page }) => {
    const login = new Login(page);
    const dashboard = new Dashboard(page);

    const username = process.env.QA_USERNAME!;
    const password = process.env.QA_PASSWORD!;
    
    // Go to login page
    await login.goto();

    // Authenticate
    await login.login(username,password );

    // Assert user is logged in 
    await login.assertLoggedIn();

    // Assert landing page is dashboard
    await dashboard.assertDashboardLoaded();
  });
});
