# Unit and Integration Testing Project

This is a React application made for unit and integration testing using Vitest.

## Table of Contents

- [Unit Tests](#unit-tests)
  - [App.tsx](#app)
  - [Can.tsx](#can)
  - [Bottle.tsx](#bottle)
  - [Phone.tsx](#phone)
  - [Receipt.tsx](#receipt)
  - [Screen.tsx](#screen)
  - [RecyclingMachine.tsx](#recycling-machine)
- [Integration Tests](#integration-tests)

  - [RecyclingMachine.tsx + Screen.tsx](#rec-scr)

  - [RecyclingMachine.tsx + Screen.tsx + Can/Bottle.tsx](#rec-scr-cb)

  - [RecyclingMachine.tsx + Screen.tsx + Can/Bottle.tsx + Phone.tsx](#rec-scr-cb-p)
  - [RecyclingMachine.tsx + Screen.tsx + Can/Bottle.tsx + Receipt.tsx](#rec-scr-cb-r)
  - [RecyclingMachine.tsx + Screen.tsx + Can/Bottle.tsx + Phone.tsx + Receipt.tsx](#rec-scr-cb-p-r)

- [Installation](#installation)
  - [Configuration](#configuration)
- [Running Tests](#running-tests)

## Unit Tests

### App.tsx<a id='app'></a>

- **Should render the heading and RecyclingMachine**

### Can.tsx <a id='can'></a>

- **Should be visible and handle clicks**

### Bottle.tsx <a id='bottle'></a>

- **Should be visible and handle clicks**

### Phone.tsx<a id='phone'></a>

- **Should render**

- **Should be possible to call for help if machine is not working**

### Receipt.tsx<a id='receipt'></a>

- **Should render with correct values**

- **Should call closeReceipt function**

### Screen.tsx<a id='screen'></a>

- **Should display 'Press screen to start' when not active**

- **Should call activate function when clicked while not active**

- **Should display counted cans/bottles and value when active**

### RecyclingMachine.tsx<a id='recycling-machine'></a>

- **Should be visible**

## Integration Tests

### RecyclingMachine.tsx + Screen.tsx<a id='rec-scr'></a>

- **Should activate the machine when handleActivation is called**

### RecyclingMachine.tsx + Screen.tsx + Can/Bottle.tsx<a id='rec-scr-cb'></a>

- **Should not be possible to start without pressing the screen**

- **Should increment the corresponding type, either can or bottle**

- **Should increment the value when a can or bottle has been pressed**

- **Should display error message when limit of machine is reached**

- **Should not be possible to click and recycle cans/bottles when error message is displayed**

### RecyclingMachine.tsx + Screen.tsx + Can/Bottle.tsx + Phone.tsx<a id='rec-scr-cb-p'></a>

- **Should be possible to call for help when error message is displayed**

- **Should not reset the machine after calling for help more than once**

- **Should not display an error on the machine after calling for help once**

- **Should not be possible to call if machine is working**

### RecyclingMachine.tsx + Screen.tsx + Can/Bottle.tsx + Can/Bottle.tsx + Receipt.tsx<a id='rec-scr-cb-r'></a>

- **Should be possible to print a receipt and display correct values**

- **Should be possible to print a receipt and close it**

- **Should be possible to print a receipt with either one can or bottle**

- **Should not be possible to print a receipt without starting or starting but with no cans/bottles**

### RecyclingMachine.tsx + Screen.tsx + Can/Bottle.tsx + Phone.tsx + Receipt.tsx<a id='rec-scr-cb-p-r'></a>

- **Should be possible to print a receipt and call for help then print a receipt**

---

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
