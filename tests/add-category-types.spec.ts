import { test } from '@playwright/test';
import { Login } from '../src/pages/Login';
import { Dashboard } from '../src/pages/Dashboards';
import { Sidebar } from '../src/pages/Sidebar';
import { Categories } from '../src/pages/Categories';

test('User can create a new category type', async ({ page }) => {
  const login = new Login(page);
  const dashboard = new Dashboard(page);
  const sidebar = new Sidebar(page);
  const categories = new Categories(page);
  
  const username = process.env.QA_USERNAME!;
  const password = process.env.QA_PASSWORD!;
  
  await login.goto();
  await login.login(username,password );
  await login.assertLoggedIn();

  await dashboard.assertDashboardLoaded();

  await sidebar.goToCategories();

  await categories.assertPageLoaded();
  await categories.addCategory(`Category added by Franklin on ${Date.now()}`);
  await categories.assertSuccess();
});
