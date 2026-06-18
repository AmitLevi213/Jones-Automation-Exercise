// src/form.js
// Each function here does ONE step of the flow.
// Keeping them separate makes the main file easy to read and the steps reusable.

// Fill the five text fields. We locate inputs by their label text,
// which is the most readable and robust way to target form fields.
export async function fillFormFields(page, data) {
  await page.getByLabel('Name').fill(data.name);
  await page.getByLabel('Email').fill(data.email);
  await page.getByLabel('Phone').fill(data.phone);
  await page.getByLabel('Company').fill(data.company);
  await page.getByLabel('Website').fill(data.website);
  console.log('Filled in Name, Email, Phone, Company and Website.');
}

// Take a full-page screenshot BEFORE we click submit.
export async function takeScreenshot(page, path) {
  await page.screenshot({ path, fullPage: true });
  console.log(`Screenshot saved to "${path}".`);
}

// Bonus: change the "Number of Employees" dropdown from 1-10 to 51-500.
export async function selectEmployees(page, optionLabel) {
  await page.getByLabel('Number of Employees').selectOption({ label: optionLabel });
  console.log(`Changed Number of Employees to "${optionLabel}".`);
}

// Click the "Request a call back" button.
export async function submitForm(page) {
  await page.getByRole('button', { name: 'Request a call back' }).click();
  console.log('Clicked "Request a call back".');
}

// Wait until the thank-you page has loaded and confirm we reached it.
export async function verifyThankYouPage(page) {
  // After submit, the site navigates to a confirmation page.
  // We wait for the "thank you" text to appear before logging success.
  await page.waitForLoadState('networkidle');
  await page.getByText(/thank you/i).waitFor({ state: 'visible' });
  console.log('Reached the thank you page. Form submitted successfully!');
}