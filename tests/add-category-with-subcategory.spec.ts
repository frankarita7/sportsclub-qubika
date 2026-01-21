import { test } from '@playwright/test';
import { Login } from '../src/pages/Login';
import { Dashboard } from '../src/pages/Dashboards';
import { Categories } from '../src/pages/Categories';

test.describe('Categories - subcategory flow', () => {
  test('User can create a subcategory by selecting a parent category', async ({ page }) => {
    const login = new Login(page);
    const dashboard = new Dashboard(page);
    const categories = new Categories(page);

    const username = process.env.QA_USERNAME!;
    const password = process.env.QA_PASSWORD!;

    await login.goto();
    await login.login(username, password);

    await dashboard.assertDashboardLoaded();

    await categories.goto();
    await categories.assertPageLoaded();

    const subName = 'SubCategory by Franklin';
    const parentName = 'C4Kl4p'; // use a real existing parent category name

    await categories.addSubCategory(subName, parentName);
    await categories.assertSuccessToast();
  });
});
