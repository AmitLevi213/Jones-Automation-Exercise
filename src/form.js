
async function findInput(page, name) {
  const byLabel = page.getByLabel(name, { exact: false });
  if (await byLabel.count()) return byLabel.first();

  const byPlaceholder = page.getByPlaceholder(name, { exact: false });
  if (await byPlaceholder.count()) return byPlaceholder.first();

  return page.locator(`input[name="${name}" i]`).first();
}

export async function fillFormFields(page, data) {
  await (await findInput(page, 'Name')).fill(data.name);
  await (await findInput(page, 'Email')).fill(data.email);
  await (await findInput(page, 'Phone')).fill(data.phone);
  await (await findInput(page, 'Company')).fill(data.company);
  await (await findInput(page, 'Website')).fill(data.website);
  console.log('Filled in Name, Email, Phone, Company and Website.');
}

export async function takeScreenshot(page, path) {
  await page.screenshot({ path, fullPage: true });
  console.log(`Screenshot saved to "${path}".`);
}

export async function selectEmployees(page, optionLabel) {
  let dropdown = page.getByLabel('Number of Employees', { exact: false });
  if (!(await dropdown.count())) dropdown = page.locator('select').first();

  await dropdown.selectOption({ label: optionLabel });
  console.log(`Changed Number of Employees to "${optionLabel}".`);
}

export async function submitForm(page) {
  let button = page.getByRole('button', { name: /request a call back/i });
  if (!(await button.count())) {
    button = page.locator('input[type="submit"], button[type="submit"]').first();
  }
  await button.click();
  console.log('Clicked "Request a call back".');
}

export async function verifyThankYouPage(page) {
  const startUrl = page.url();
  await page.waitForLoadState('networkidle');

  const thankYouText = page.getByText(/thank|thanks/i);
  const urlChanged = page.url() !== startUrl;

  if (urlChanged || (await thankYouText.count())) {
    console.log('Reached the thank you page. Form submitted successfully!');
  } else {
    console.log('Submitted, but could not confirm the thank you page. Check the screenshot/site manually.');
  }
}