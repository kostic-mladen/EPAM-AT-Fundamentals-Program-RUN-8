# EPAM AT Fundamentals Program RUN-8

Automation testing framework for the EPAM AT Fundamentals Program final task. Tests the [Sauce Demo](https://www.saucedemo.com) web application using both Mocha and Cucumber BDD frameworks with parallel browser execution.

## Tech Stack

- **[WebdriverIO](https://webdriver.io/)** v9 — browser automation
- **Mocha** — traditional spec-style tests
- **Cucumber** — BDD feature/scenario tests
- **Allure** — test reporting
- **ESLint** — code linting
- **Prettier** — code formatting
- **Husky** — git hooks
- **dotenv** — environment configuration

## Prerequisites

- Node.js v18+
- Chrome browser
- Firefox browser
- Java (required by Allure CLI)

## Installation

```bash
git clone https://github.com/kostic-mladen/EPAM-AT-Fundamentals-Program-RUN-8.git
cd EPAM-AT-Fundamentals-Program-RUN-8
npm install
```

## Environment Setup

Copy the example file and fill in your credentials:

```bash
cp .env.example .env
```

```env
STANDARD_USER=your_username
STANDARD_PASSWORD=your_password
HEADLESS=true
BROWSER=
```

| Variable | Values | Description |
|----------|--------|-------------|
| `HEADLESS` | `true` / `false` | Run browsers headless or with GUI |
| `BROWSER` | `chrome` / `firefox` / *(empty)* | Limit to one browser; leave empty to run both |

## Project Structure

```
src/
├── configs/
│   ├── wdio.base.conf.js       # Shared config — browsers, reporters, base settings
│   ├── wdio.conf.js            # Mocha config
│   ├── wdio.cucumber.conf.js   # Cucumber config
│   ├── allure/
│   │   └── categories.json     # Allure failure categories (Product Defects, Test Defects, Ignored)
│   └── utils/
│       ├── logger.js           # Timestamp-based logger (info, warn, error)
│       └── allure-env.js       # Generates environment.properties and copies categories.json before each run
├── tests/                      # Mocha specs
│   ├── productDetails.spec.js  # UC-1
│   └── footer.spec.js          # UC-2
├── cucumber/
│   ├── features/               # Gherkin feature files
│   │   ├── productDetails.feature
│   │   └── footer.feature
│   └── steps/                  # Step definitions
│       ├── hooks.js            # Before/After — cookie cleanup per scenario
│       ├── common.steps.js     # Shared login step
│       ├── productDetails.steps.js
│       └── footer.steps.js
├── po/                         # Page Object Model
│   ├── index.js                # Central export point
│   ├── pages/
│   │   ├── base.page.js        # Shared methods (open, getUrl, waitForPageLoad)
│   │   ├── inventory.page.js
│   │   └── productDetails.page.js
│   └── components/
│       ├── login/login.component.js
│       ├── footer/footer.component.js
│       └── common/header.component.js
├── helpers/
│   └── auth.helper.js          # Shared login helper for Mocha specs
└── data/
    └── testData.js             # Users, products, social links, URL patterns
```

## Test Cases

### UC-1: Product Details Verification

Verifies that product data is consistent between the inventory list and the product details page.

**Mocha**

| # | Test |
|---|------|
| 1 | `should display correct price for "Sauce Labs Fleece Jacket" on the details page` |
| 2 | `should display correct description for "Sauce Labs Fleece Jacket" on the details page` |
| 3 | `should add "Sauce Labs Fleece Jacket" to cart from the details page` |

**Cucumber — Scenario Outline: Verify product details and add to cart**

| Step | Description |
|------|-------------|
| Given | I am logged in as standard user |
| When | I navigate to the details page for "Sauce Labs Fleece Jacket" |
| Then | the price on the details page should match the inventory page |
| And | the description on the details page should match the inventory page |
| And | I add the product to the cart from the details page |
| Then | the cart count should be 1 |

---

### UC-2: Footer Social Links

Verifies that social media links in the footer are present and redirect correctly.

**Mocha**

| # | Test |
|---|------|
| 1 | `should display Twitter link and open Twitter/X URL in a new tab` |
| 2 | `should display Facebook link and open Facebook URL in a new tab` |
| 3 | `should display LinkedIn link and open LinkedIn URL in a new tab` |

Each test verifies: link is visible → DOM href is correct → new tab opens with correct URL.

**Cucumber**

| Scenario | Steps |
|----------|-------|
| Verify Twitter link exists and redirects to Twitter's profile page | `the Twitter link should be displayed with the Twitter href` → `clicking the Twitter link should open the Twitter/X URL in a new tab` |
| Verify Facebook link exists and redirects to Facebook's profile page | `the Facebook link should be displayed with the Facebook href` → `clicking the Facebook link should open the Facebook URL in a new tab` |
| Verify LinkedIn link exists and redirects to LinkedIn's profile page | `the LinkedIn link should be displayed with the LinkedIn href` → `clicking the LinkedIn link should open the LinkedIn URL in a new tab` |

> Twitter note: accepts both `twitter.com` and `x.com` hrefs and redirects due to the platform rebrand.

## Scripts

### Running Tests

```bash
# Mocha — all specs (generates Allure report)
npm test

# Mocha — tests only, no Allure generation (used by pre-push hook)
npm run test:check

# Cucumber BDD — all features (generates Allure report)
npm run test:bdd

# Run everything (Mocha + Cucumber) with a combined Allure report
npm run test:all
```

### Allure Reports

Allure reports are auto-generated after `npm test`, `npm run test:bdd`, and `npm run test:all` — whether tests pass or fail.

```bash
# Open the generated report in a browser
npm run allure:open

# Serve report directly from raw results (no separate generate step)
npm run allure:serve

# Manually regenerate the report
npm run allure:generate
```

### Code Quality

```bash
# Lint all source files
npm run lint

# Format all source files with Prettier
npm run format

# Check formatting without modifying files
npm run format:check
```

## Parallel Execution

Tests run across **Chrome and Firefox simultaneously** (`maxInstances: 4`). With 2 spec files and 2 browsers, all 4 combinations run at the same time. Each browser runs the full test suite independently, so Allure will show results per browser.

Set `BROWSER=chrome` or `BROWSER=firefox` in `.env` to limit execution to a single browser — useful for debugging or faster local runs.

## Allure Report Features

**Environment** — automatically populated before every run with browser, headless mode, base URL, Node version, and OS. Sourced from `.env` via [allure-env.js](src/configs/utils/allure-env.js).

**Categories** — failures are automatically grouped into:
- `Product Defects` — assertion errors (the app returned wrong data)
- `Test Defects` — unexpected errors (the test itself broke)
- `Ignored Tests` — skipped scenarios

Categories appear in the report only when there are failures or skipped tests. On a green run the section is empty.

## Git Hooks

Configured via Husky:

| Hook | Runs | Blocks on |
|------|------|-----------|
| `pre-commit` | `eslint src/` + `prettier --check src/` | Linting errors or formatting issues |
| `pre-push` | `npm run test:check` | Failing Mocha tests |
