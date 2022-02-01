const numberButtons = document.querySelectorAll('[id*="number"]');
const operationButtons = document.querySelectorAll('[id*="operator"]');
const equalsButton = document.querySelector("#equal");
const deleteButton = document.querySelector("#delete");
const allClearButton = document.querySelector("#all-clear");
const previousOperandTextElement = document.querySelector("#previous-operand");
const currentOperandTextElement = document.querySelector("#current-operand");

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }

  formatDisplayNumber(number) {
    const stringNumber = number.toString();

    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(
      this.previousOperand
    )} ${this.operation || ``}`;
    this.currentOperandTextElement.innerText = this.formatDisplayNumber(
      this.currentOperand
    );
    this.previousOperand = `${this.previousOperand} ${this.operation || ``}`;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === ".") this.currentOperand = "0";
    if (this.currentOperand.includes(".") && number === ".") return;
    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }

  calculate() {
    let result;


    const previousOperandFloat = parseFloat(this.previousOperand);
    const currentOperandFloat = parseFloat(this.currentOperand);

    if (isNaN(previousOperandFloat) || isNaN(currentOperandFloat)) return;

    switch (this.operation) {
      case "+":
        result = previousOperandFloat + currentOperandFloat;
        break;
      case "-":
        result = previousOperandFloat - currentOperandFloat;
        break;
      case "*":
        result = previousOperandFloat * currentOperandFloat;
        break;
      case "÷":
        result = previousOperandFloat / currentOperandFloat;
        break;
      case "÷":
        result = previousOperandFloat / currentOperandFloat;
        break;
      case "%":
        result = previousOperandFloat / 100 * currentOperandFloat;
        break;
      case "^":
        result = previousOperandFloat ** currentOperandFloat;
        break;
      default:
        return;
    }
  
    
    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
  }

  chooseoperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand != "") {
      this.calculate();
    }


    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
}

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

equalsButton.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});

for (const numberButton of numberButtons) {
  numberButton.addEventListener("click", () => {
    calculator.appendNumber(numberButton.innerText);
    calculator.updateDisplay();
  });
}

for (const operationButton of operationButtons) {
  operationButton.addEventListener("click", () => {
    calculator.chooseoperation(operationButton.innerText);
    calculator.updateDisplay();
  });
}
