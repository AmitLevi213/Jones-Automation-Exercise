import { chromium } from 'playwright';
import { config } from './config.js';
import {
  fillFormFields,
  selectEmployees,
  takeScreenshot,
  submitForm,
  verifyThankYouPage,
} from './form.js';

async function run() {
  const browser = await chromium.launch({
    headless: config.headless,
    slowMo: config.slowMo,
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(config.actionTimeout);

  let success = false;
  try {
    await page.goto(config.url);
    console.log(`Opened ${config.url}`);
    await fillFormFields(page, config.formData);
    await selectEmployees(page, config.employeesOption);
    await takeScreenshot(page, config.screenshotPath);
    await submitForm(page);
    success = await verifyThankYouPage(page);
  } catch (error) {
    console.error('Something went wrong during the automation:', error.message);
  } finally {
    await browser.close();
  }
  process.exit(success ? 0 : 1);
}

run();