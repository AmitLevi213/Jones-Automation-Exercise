// src/index.js
// This is the entry point. It opens the browser and runs each step in order.

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
  // 1. Launch a visible Chrome window.
  const browser = await chromium.launch({
    headless: config.headless,
    slowMo: config.slowMo,
  });
  const page = await browser.newPage();

  try {
    // 2. Open the site.
    await page.goto(config.url);
    console.log(`Opened ${config.url}`);

    // 3. Fill in the text fields.
    await fillFormFields(page, config.formData);

    // 4. Bonus: change the employee count (do this before the screenshot
    //    so the screenshot reflects the final filled-in form).
    await selectEmployees(page, config.employeesOption);

    // 5. Take a screenshot BEFORE clicking submit.
    await takeScreenshot(page, config.screenshotPath);

    // 6. Submit the form.
    await submitForm(page);

    // 7. Confirm we reached the thank-you page.
    await verifyThankYouPage(page);
  } catch (error) {
    console.error('Something went wrong during the automation:', error.message);
  } finally {
    // Always close the browser, even if a step failed.
    await browser.close();
  }
}

run();