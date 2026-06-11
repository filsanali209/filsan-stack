const { test, expect } = require('@playwright/test');

test.describe('Bakehouse website tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('can navigate to customer list', async ({ page }) => {
        const firstLink = page.getByText('Customer List');

        await firstLink.click();

        await expect(page.locator('h2')).toHaveText('Customer List');

    });

    test('can add new customer', async ({ page }) => {
        const newCust= page.getByText('New Customer');

        await newCust.click();

        let randomNum = Math.floor(Math.random() * 1000);

        await page.getByLabel('Full Name').fill(`Test Customer ${randomNum}`);
        await page.getByLabel('Email').fill('example@examplee.com');
        await page.locator('button[type="submit"]').click();

        await expect(page.locator('css=form div')).toHaveText('Customer created ✔️');

    });

    test('can add new order', async ({ page }) => {
        const newOrder = page.getByText('New Order');

        await newOrder.click();


        await page.getByLabel('Customer').selectOption("me");
        await page.locator('._itemRow_1y2yw_40 select').selectOption('Blueberry Muffin')
        await page.locator('._itemRow_1y2yw_40 input').fill('5')
        await page.locator('button[type="submit"]').click();

        page.on('dialog', async dialog => {

            await expect(dialog.message()).toHaveText('Order created')

            await dialog.accept()
        });

    });



});
