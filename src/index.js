import { chromium } from 'playwright';
import { config } from './config.js';
import {
  fillFormFields,
  takeScreenshot,
  selectEmployees,
  submitForm,
  verifyThankYouPage,
} from './form.js';

async function run() {
  const browser = await chromium.launch({
    headless: config.headless,
    slowMo: config.slowMo,
  });
  const page = await browser.newPage();

  try {
    await page.goto(config.url);
    console.log(`Opened ${config.url}`);
    await fillFormFields(page, config.formData);
    await selectEmployees(page, config.employeesOption);
    await takeScreenshot(page, config.screenshotPath);
    await submitForm(page);
    await verifyThankYouPage(page);
  } catch (error) {
    console.error('Something went wrong during the automation:', error.message);
  } finally {
    await browser.close();
  }
}

run();