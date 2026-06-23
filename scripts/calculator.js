// Calculator — handles both click and keyboard input
// State: num1, num2, operator, total
// Flow: number → operator → number → calculate
let num1;
let num2;
let operator;
let total = 0;

const display = document.querySelector(".display");
const numberButton = document.querySelectorAll(".number");
const operatorButton = document.querySelectorAll(".operator");
const calculate = document.querySelector(".calculate");
const clear = document.querySelector(".clear");
const backspace = document.querySelector(".backspace");
const decimal = document.querySelector(".decimal");

const clearData = () => {
  num1 = undefined;
  num2 = undefined;
  total = 0;
  operator = undefined;

  display.textContent = 0;
};

const handleBackspace = () => {
  // if operator is not set, mutate num1, otherwise mutate num2.
  if (operator === undefined) {
  if (num1 === undefined) return;
  // mutate num1 or num2 to remove the last digit of the number, if the slice
  //result is "", change the number to default which is 0.
  num1 = num1.slice(0, -1) || undefined;
  display.textContent = num1 ?? 0;
  } else {
    if (num2 === undefined) return;
    num2 = num2.slice(0, -1) || undefined;
    // update the display, show num2 if it is set otherwise show num1 and operator
    display.textContent = num2 !== undefined ? num1 + operator + num2 : num1 + operator;
  }
}

const handleDecimal = () => {
  if (operator === undefined) {
    if (num1 === undefined || num1.includes(".")) return;
    num1 += ".";
    display.textContent = num1 ?? 0;
  } else {
    if (num2 === undefined || num2.includes(".")) return;
    num2 += ".";
    display.textContent = num1 + operator + num2;
  }
}

const handleNumber = digit => {
  if (total !== 0) {
      num1 = total;
      total = 0;
      num2 = undefined;
    }
    
  if (operator === undefined) {
    if (num1 === undefined) {
      num1 = digit;
    } else {
      num1 += digit;
    }
    display.textContent = num1;
    } else {
      if (num2 === undefined) {
        num2 = digit;
      } else {
        num2 += digit;
      }
      display.textContent = num1 + operator + num2;
    }
}

const handleOperator = (newOperator) => {
  if (num1 === undefined) return;

   // receives '*' and '/' from input and convert to 'x' and '÷' respectively
  const normalized = {'*': 'x', '/' : '÷'}
  newOperator = normalized[newOperator] ?? newOperator;

  if (num1 !== undefined && num2 !== undefined) {
    operate(operator, num1, num2);
    num1 = total;
    num2 = undefined;
  }
  operator = newOperator
  display.textContent = (total !== 0 ? total : num1) + operator;
}

const handleCalculate = () => {
  if (num1 === undefined || num2 === undefined || operator === undefined) return;
  
  operate(operator, num1, num2);
  display.textContent = total;
}

clear.addEventListener("click", () => clearData());

backspace.addEventListener("click", () => handleBackspace());

decimal.addEventListener("click", () => handleDecimal());

window.addEventListener("keydown", (event) => {
  const fKeys = ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"]
  //blocks the function keys from the display.
  if (fKeys.includes(event.key)) return;

  if (event.key === "Escape") return clearData();
  if (event.key === 'Enter') handleCalculate();
  if (event.key === 'Backspace') handleBackspace();
  if (event.key === '.' || event.key === ',') handleDecimal();
  
  const alpha = /[0-9]/i;
  if (event.key.match(alpha)) handleNumber(event.key);
  
  else {
    const operators = ['+', '-', '*', '/'];
    if (!operators.includes(event.key)) return;
    handleOperator(event.key);
  }
});

numberButton.forEach((button) => {
  button.addEventListener('click', () => handleNumber(button.textContent));
});

operatorButton.forEach((button) => {
  button.addEventListener("click", () => {
    handleOperator(button.textContent);
  });
});

calculate.addEventListener("click", () => {
  handleCalculate();
});

function operate(operator, num1, num2) {
  const a = parseFloat(num1);
  const b = parseFloat(num2);
  let result;

  if (num2 === undefined && operator != undefined) return (total = a);
  if (operator === "+") result = a + b;
  if (operator === "-") result = a - b;
  if (operator === "x") result = a * b;
  if (operator === "÷") {
    if (b === 0) {
      alert(`Don't play with this`);
      num1 = undefined;
      num2 = undefined;
      operator = undefined;
      total = undefined;
      return (total = 0);
    }
    result = a / b;
  }
  return (total = parseFloat(result.toFixed(10)));
}