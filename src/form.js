
async function findInput(page, key, humanName) {
  const candidates = [
    page.locator(`input#${key}, input[name="${key}" i]`),
    page.getByLabel(new RegExp(`^${humanName}`, 'i')),
    page.getByPlaceholder(new RegExp(humanName, 'i')),
  ];

  for (const locator of candidates) {
    if (await locator.count()) return locator.first();
  }
  throw new Error(`Could not find the "${humanName}" field on the page.`);
}

export async function fillFormFields(page, data) {
  const fields = [
    ['name', 'Name', data.name],
    ['email', 'Email', data.email],
    ['phone', 'Phone', data.phone],
    ['company', 'Company', data.company],
    ['website', 'Website', data.website],
  ];

  for (const [key, humanName, value] of fields) {
    const input = await findInput(page, key, humanName);
    await input.fill(value);
  }
  console.log('Filled in Name, Email, Phone, Company and Website.');
}


export async function selectEmployees(page, optionValue) {
  let dropdown = page.getByLabel(/Number of Employees/i);
  if (!(await dropdown.count())) dropdown = page.locator('select').first();
  if (!(await dropdown.count())) {
    throw new Error('Could not find the "Number of Employees" dropdown.');
  }

  try {
    await dropdown.selectOption({ value: optionValue });
  } catch {
    await dropdown.selectOption({ label: new RegExp(`\\s*${optionValue}\\s*`) });
  }
  console.log(`Changed Number of Employees to "${optionValue}".`);
}

export async function takeScreenshot(page, path) {
  await page.screenshot({ path, fullPage: true });
  console.log(`Screenshot saved to "${path}".`);
}

export async function submitForm(page) {
  let button = page.getByRole('button', { name: /request a call back/i });
  if (!(await button.count())) {
    button = page.locator('input[type="submit"], button[type="submit"]').first();
  }
  if (!(await button.count())) {
    throw new Error('Could not find the "Request a call back" button.');
  }
  await button.click();
  console.log('Clicked "Request a call back".');
}


export async function verifyThankYouPage(page) {
  const thankYou = page.getByText(/thank you|thanks/i);

  try {
    await thankYou.first().waitFor({ state: 'visible', timeout: 10_000 });
    console.log('Reached the thank you page. Form submitted successfully!');
    return true;
  } catch {
    console.warn(
      'Submitted, but the thank-you page was not confirmed. ' +
        'Check the screenshot and the live site manually.'
    );
    return false;
  }
}