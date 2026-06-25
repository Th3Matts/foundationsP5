# Calculator

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

A browser-based calculator built with vanilla HTML, CSS, and JavaScript. Supports both mouse clicks and keyboard input, chained operations, and standard decimal arithmetic.

## Features

- Basic arithmetic: addition, subtraction, multiplication, and division
- Chained operations (applying a new operator mid-sequence recalculates on the fly)
- Decimal input with duplicate-dot prevention
- Backspace to delete the last digit
- AC (All Clear) to reset state
- Full keyboard support
- Division-by-zero guard

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `0–9` | Input digit |
| `+` `-` `*` `/` | Operators |
| `.` or `,` | Decimal point |
| `Enter` | Calculate |
| `Backspace` | Delete last digit |
| `Escape` | Clear all |

## Project Structure

```
calculator/
├── index.html
├── assets/
│   ├── style/
│   │   └── style.css
│   ├── fonts/
│   │   └── AugsburgerSchriftCAT.ttf
│   └── images/
│       ├── favicon.ico
│       └── logo-white_v2.svg
└── scripts/
    └── calculator.js
```

## Getting Started

No build step or dependencies required. Clone the repo and open `index.html` in your browser.

```bash
git clone https://github.com/Th3Matts/calculator.git
cd calculator
open index.html   # or just double-click the file
```

## Implementation Notes

State is tracked across four variables — `num1`, `num2`, `operator`, and `total`. The flow is:

1. Enter a number → stored as `num1`
2. Press an operator → stored; display shows `num1 + operator`
3. Enter a second number → stored as `num2`
4. Press `=` or `Enter` → `operate()` computes the result into `total`

Pressing an operator after a completed calculation chains the result: `total` becomes the new `num1`. Keyboard input normalises `*` → `x` and `/` → `÷` to match the button labels.

---

Made by [Th3Matts](https://github.com/Th3Matts)