const calculatorScreen = document.querySelector(".calculator-screen")

let prevNumber = " "
let calculationOperator = " "
let currentNumber = "0"

const formattedNumber = (number) => {
    if(number == "-"){
		return "0";
	}
    const n = Number(number);
    const value = n.toLocaleString("en");
    return value
};

const updateScreen = (number) => {
    calculatorScreen.value = formattedNumber(number);
};

const numbers = document.querySelectorAll(".number");
const inputNumber = (number) => {
    if (currentNumber === "0") {
        currentNumber = number
    } else {
        currentNumber += number
    }
};

numbers.forEach((number) => {
    number.addEventListener("click", (event) => {
        inputNumber(event.target.value);
        updateScreen(currentNumber);
    })
});

//operators
const operators = document.querySelectorAll(".operator");

const inputOperator = (operator) => {
    if (calculationOperator === " ") {
        prevNumber = currentNumber
    }
    calculationOperator = operator
    currentNumber = " "
};

operators.forEach((operator) => {
    operator.addEventListener("click", (event) => {
        inputOperator(event.target.value)
    })
});

//calculate
const calculate = () => {
    let result = "0"
    switch(calculationOperator) {
        case "+":
            result = parseFloat(prevNumber) + parseFloat(currentNumber)
            break
        case "-":
            result = prevNumber - currentNumber
            break
        case "*":
            result = prevNumber * currentNumber
            break
        case "/":
            result = prevNumber / currentNumber
            break
        default:
            result = currentNumber
    };
    currentNumber = result
    calculationOperator = " "
};

//delete button
const del = document.querySelector(".delete");

del.addEventListener("click", () => {
    const output = currentNumber.toString();
    if (output) {
        currentNumber = output.substr(0, output.length - 1);
        updateScreen(currentNumber);
    };
});

//equalSign
const equalSign = document.querySelector(".equal-sign")

equalSign.addEventListener("click", () => {
    calculate()
    updateScreen(currentNumber)
});

//all clear
const clearBtn = document.querySelector(".all-clear");
const clearAll = () => {
    prevNumber = " "
    calculationOperator = " "
    currentNumber = "0"
};

clearBtn.addEventListener("click", () => {
    clearAll()
    updateScreen(currentNumber)
});

//decimal
inputDecimal = (dot) => {
    if(currentNumber.includes(".")) {
        return
    }
    currentNumber += dot
}

const decimal = document.querySelector(".decimal");

decimal.addEventListener("click", (event) => {
    inputDecimal(event.target.value)
    updateScreen(currentNumber)
});


//keyboard function
document.addEventListener("keydown", function(event) {
    numbers.forEach((number) => {
      // console.log(number);
      if (event.key == number.value) {
        number.click();
      }
    })
  
    operators.forEach((operator) => {
      if (event.key == operator.value) {
        operator.click();
      }
    });
  
    if (event.key == ".") {
      decimal.click();
    }
  
    if (event.key == "Enter") {
      equalSign.click();
    }
  
    if (event.key == "p") {
      powerButton.click();
    }
  
    if (event.key == "Delete" || event.key == "Escape") {
      clearBtn.click();
    }
  
  });

//animation
var container = document.getElementById('container');
var inner = document.getElementById('calculator');
        
var onMouseEnterHandler = function(event) {
  update(event);
};
var onMouseLeaveHandler = function() {
  inner.style = "";
};
var onMouseMoveHandler = function(event) {
  if (isTimeToUpdate()) {
    update(event);
  }
};

container.onmouseenter = onMouseEnterHandler;
container.onmouseleave = onMouseLeaveHandler;
container.onmousemove = onMouseMoveHandler;

var counter = 0;
var updateRate = 10;
var isTimeToUpdate = function() {
  return counter++ % updateRate === 0;
};

// Init
var container = document.getElementById('container');
var inner = document.getElementById('calculator');
// Mouse 
var mouse = {
  _x: 0,
  _y: 0,
  x: 0,
  y: 0,
  updatePosition: function(event) {
    var e = event || window.event;
    this.x = e.clientX - this._x;
    this.y = (e.clientY - this._y) * -1;
  },
  setOrigin: function(e) {
    this._x = e.offsetLeft + Math.floor(e.offsetWidth/2);
    this._y = e.offsetTop + Math.floor(e.offsetHeight/2);
  },
  show: function() { return '(' + this.x + ', ' + this.y + ')'; }
}
// Track the mouse position relative to the center of the container.
mouse.setOrigin(container);

var update = function(event) {
    mouse.updatePosition(event);
    updateTransformStyle(
      (mouse.y / inner.offsetHeight/5).toFixed(2),
      (mouse.x / inner.offsetWidth/5).toFixed(2)
    );
  };
  
  var updateTransformStyle = function(x, y) {
    var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
    inner.style.transform = style;
    inner.style.webkitTransform = style;
    inner.style.mozTransform = style;
    inner.style.msTransform = style;
    inner.style.oTransform = style;
  };
  