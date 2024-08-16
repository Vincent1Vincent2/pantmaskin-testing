# Unit and Integration Testing Project

## Overview

**Recycling Machine Testing** is a React application made for unit and integration testing using Vitest.

## Table of Contents

- [Project Structure](#project-structure)
- [Installation](#installation)
  - [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Tests](#tests)
  - [Unit Tests](#unit-tests)
    - [App.tsx](#app)
    - [Can + Bottle.tsx](#can-bottle)
    - [Phone.tsx](#phone)
    - [Receipt.tsx](#receipt)
    - [Screen.tsx](#screen)
    - [Recycling Machine.tsx](#recycling-machine)
  - [Integration Tests](#integration-tests)

## Project Structure

```
/project-root
  ├── /data                  # Data
  ├── /src                   # Source code
  │   ├── /assets            # Images and sounds
  │   ├── /components        # Components with tests
  ├── .gitignore             # Git ignore file
  ├── README.md              # This file
  ├── package.json           # Project metadata and dependencies
  ├── tsconfig.json          # TypeScript configuration (if applicable)
  └── vitest.config.ts       # Vitest configuration file
```

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Vincent1Vincent2/pantmaskin-testing
   cd pantmaskin-testing
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

### Configuration

- **Vitest Configuration**: Update `vitest.config.ts` to adjust testing settings, such as test environment and coverage thresholds.
- **React Configuration**: Modify `src/test-setup.ts` to include global test setup, such as adding testing library utilities or mock services.

## Running Tests

To run tests:

```bash
npm run test
#OR
npx vitest --coverage
```

## Unit Tests

### App<a id='app'></a>

#### - **Should render the heading and RecyclingMachine**

---

### Can + Bottle<a id='can-bottle'></a>

#### - **Should be visible and handle clicks**

---

### Phone<a id='phone'></a>

#### - **Should render**

#### - **Should be possible to call for help if machine is not working**

---

### Receipt<a id='receipt'></a>

#### - **Should render with correct values**

#### - **Should call closeReceipt function**

---

### Screen<a id='screen'></a>

#### - **Should display 'Press screen to start' when not active**

#### - **Should call activate function when clicked while not active**

#### - **Should display counted cans/bottles and value when active**

### Recycling Machine<a id='recycling-machine'></a>

#### - **should be visible**

## Integration Tests

### RecyclingMachine + Screen

#### - **should activate the machine when handleActivation is called**

### RecyclingMachine.tsx + Screen.tsx + Can/Bottle.tsx

#### - **should not be possible to start without pressing the screen**

#### - **should increment the corresponding type, either can or bottle**

#### - **should increment the value when a can or bottle has been pressed**

#### - **should display error message when limit of machine is reached**

#### - **should not be possible to click and recycle cans/bottles when error message is displayed**

RecyclingMachine.tsx + Screen.tsx + Can/Bottle.tsx + Phone.tsx

- **should be possible to call for help when error message is displayed**

- **should not reset the machine after calling for help more than once**

- **should not display an error on the machine after calling for help once**

- **should not be possible to call if machine is working**

RecyclingMachine.tsx + Screen.tsx + Can/Bottle.tsx + Receipt.tsx

- **should be possible to print a receipt and display correct values**

- **should be possible to print a receipt and close it**

- **should be possible to print a receipt with either one can or bottle**

- **should not be possible to print a receipt without starting or starting but with no cans/bottles**

RecyclingMachine.tsx + Screen.tsx + Can/Bottle.tsx + Phone.tsx + Receipt.tsx

- **should be possible to print a receipt and call for help then print a receipt**

---
