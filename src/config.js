// src/config.js
// All the settings and test data live here, so they are easy to change
// without touching the automation logic.

export const config = {
  // The site we are automating
  url: 'https://test.netlify.app/',

  // Run with a visible browser window (headed). Set to true for no window.
  headless: false,

  // Slow each action down a little so it is easy to watch (milliseconds).
  slowMo: 400,

  // Where the screenshot is saved.
  screenshotPath: 'before-submit.png',

  // The values we type into the form fields.
  formData: {
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '0501234567',
    company: 'Acme Corp',
    website: 'https://acme-corp.example.com',
  },

  // Bonus: the employee range to select instead of the default "1-10".
  employeesOption: '51-500',
};