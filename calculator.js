let display = document.getElementById('display');
let currentNumber = '';
let previousNumber = '';
let operator = '';

// Load calculator state from local storage
function loadCalculatorState() {
  const savedState = localStorage.getItem('calculatorState');
  if (savedState) {
    const state = JSON.parse(savedState);
    currentNumber = state.currentNumber;
    previousNumber = state.previousNumber;
    operator = state.operator;
    display.value = state.displayValue;
  }
}

// Save calculator state to local storage
function saveCalculatorState() {
  const state = {
    currentNumber,
    previousNumber,
    operator,
    displayValue: display.value,
  };
  localStorage.setItem('calculatorState', JSON.stringify(state));
}

function appendNumber(number) {
  currentNumber += number.toString();
  display.value = currentNumber;
  saveCalculatorState();
}

function appendOperator(op) {
  if (currentNumber !== '') {
    previousNumber = currentNumber;
    currentNumber = '';
    operator = op;
    saveCalculatorState();
  }
}

function calculate() {
  if (currentNumber !== '' && previousNumber !== '') {
    let result;
    switch (operator) {
      case '+':
        result = parseFloat(previousNumber) + parseFloat(currentNumber);
        break;
      case '-':
        result = parseFloat(previousNumber) - parseFloat(currentNumber);
        break;
      case '*':
        result = parseFloat(previousNumber) * parseFloat(currentNumber);
        break;
      case '/':
        if (currentNumber === '0') {
          result = 'Error';
        } else {
          result = parseFloat(previousNumber) / parseFloat(currentNumber);
        }
        break;
      default:
        result = '';
    }
    display.value = result.toString();
    currentNumber = result.toString();
    previousNumber = '';
    operator = '';
    saveCalculatorState();
  }
}

function clearDisplay() {
  display.value = '';
  currentNumber = '';
  previousNumber = '';
  operator = '';
  localStorage.removeItem('calculatorState');
}

loadCalculatorState();

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      appendNumber(e.key);
      break;
    case '+':
    case '-':
    case '*':
    case '/':
      appendOperator(e.key);
      break;
    case '=':
    case 'Enter':
      calculate();
      break;
    case 'c':
    case 'C':
      clearDisplay();
      break;
  }
});