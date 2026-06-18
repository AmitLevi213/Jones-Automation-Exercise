export const config = {
  url: 'https://test.netlify.app/',
  headless: process.env.HEADED ? true : false,
  slowMo: process.env.HEADED ? 400 : 0,
  actionTimeout: 10_000,
  screenshotPath: 'before-submit.png',
  formData: {
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '0501234567',
    company: 'Acme Corp',
    website: 'https://acme-corp.example.com',
  },
  employeesOption: '51-500',
};