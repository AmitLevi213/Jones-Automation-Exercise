# Jones Automation — Playwright Exercise

Automates the contact form at **https://test.netlify.app/**.

## What it does
1. Opens the site in a visible (headed) Chrome window.
2. Types values into **Name, Email, Phone, Company, Website**.
3. **Bonus:** changes **Number of Employees** from `1-10` to `51-500`.
4. Takes a **screenshot** (`before-submit.png`) *before* clicking submit.
5. Clicks **"Request a call back"**.
6. Logs to the console when the **thank you page** is reached.

## Project structure
```
jones-automation/
├── package.json
├── README.md
└── src/
    ├── config.js   # all settings & test data (change values here)
    ├── form.js     # one function per step (fill, screenshot, select, submit, verify)
    └── index.js    # entry point — runs the steps in order
```

## Setup
You need Node.js installed: https://nodejs.org/en/download/

From inside the `jones-automation` folder, run:

```bash
# 1. Install dependencies
npm install

# 2. Install the browser Playwright controls
npx playwright install chromium

# 3. Run the automation (a Chrome window will open and you can watch it)
npm start
```

## Configuration
Open `src/config.js` to change:
- The form values (name, email, phone, etc.)
- `headless: false` → set to `true` to run without a visible window
- `slowMo` → how slow each step runs (in milliseconds) so it's easy to watch
- `employeesOption` → the dropdown value for the bonus step