
const numbers = document.getElementById("numbers");
const calc = document.getElementById("result");
const operators = Array.from(document.querySelectorAll(".operator"), e => e.innerHTML);
const del = document.getElementById("num_del");
const brackets = bracket => document.getElementById(`num_${bracket}`);

let opArr = [];
let result = 0;
let canExecute = false;


const clear = document.getElementById("num_AC");
clear.addEventListener("click", () => {
    clearDisplay();
});



const button = num => document.getElementById(`num_${num}`);
const input = num => button(num).getAttribute("id").split("_")[1];
const numBtn = num => button(num).classList.contains("number");
const opBtn = num => button(num).classList.contains("operator");
const delBtn = num => button(num).classList.contains("del");
const bracketBtn = num => button(num).classList.contains("bracket");

const submit = function(num) {


        /* ESTABLISH OPERATION ARRAY AND TEXT ON DISPLAY */

        let length = opArr.length; 
        let toCalculate = [];
        let inBrackets = []; 

        if ((length === 0) && (canExecute)) {
            canExecute = false;
            clearDisplay();
        };

        if (numBtn(num)) {

            if ((length === 0) && (input(num) !== ".")) {
                opArr.push(input(num));
            } else if (length === 1) {
                if (opArr[length-1] === "-") {
                    mergeElement(opArr[length-1], input(num));
                } else if (input(num) === ".") {
                    if (!isNaN(Number(opArr[length-1]))) {
                        mergeElement(opArr[length-1], input(num));
                    };
                } else if (opArr[length-1][1] === ".") {
                    mergeElement(opArr[length-1], input(num));
                } else {
                    opArr.push(input(num));
                };
            } else if (length > 1) {
                if ((isNaN(Number(opArr[length-2]))) && (opArr[length-1] === "-")) {
                    mergeElement(opArr[length-1], input(num));
                } else if (input(num) === ".") {
                    if (!isNaN(Number(opArr[length-1]))) {
                        mergeElement(opArr[length-1], input(num));
                    };
                } else if (opArr[length-1][1] === ".") {
                    mergeElement(opArr[length-1], input(num));
                } else {
                    opArr.push(input(num));
                };
            };
           
            numbers.innerText = opArr.join("");

        } else if (opBtn(num)) {

            if (input(num) === "-") {
                opArr.push(input(num));
                numbers.innerText = opArr.join("");
            } else {
                if ((length > 0) && (!isNaN(Number(opArr[length-1])))) {
                    opArr.push(input(num));
                    numbers.innerText = opArr.join("");
                };
            };

        } else if (delBtn(num)) {
            opArr.pop();
            numbers.innerText = opArr.join("");

        } else if (input(num) === "=") {
            if (canExecute) {
                numbers.style.height = 30 + "px";
                calc.style.fontSize = 35 + "px";
                calc.style.height = 45 + "px";
                numbers.innerText = "";
                opArr = [];
                toCalculate = [];
            };
        };

        console.log(opArr);


        /* SEPARATE NUMBERS FROM OPERATORS IN OBJECTS */

        opArr.forEach((e) => {
            addToObject(toCalculate, e);
        });


        console.log(toCalculate);

        if ((toCalculate.length > 0) && (Object.keys(toCalculate[toCalculate.length-1]).indexOf("number") !== -1)) {
            canExecute = true;
            result = execute(toCalculate);
            if (!isNaN(result)) {
                calc.innerText = result;
            }
        };
   
};
 

    

enter("1");
enter("2");
enter("3");
enter("4");
enter("5");
enter("6");
enter("7");
enter("8");
enter("9");
enter("0");
enter(".");
enter("/");
enter("*");
enter("-");
enter("+");
enter("=");
enter("(");
enter(")");
enter("del");
clearDisplay();


function enter(num) {
    button(num).addEventListener("click", () => {submit(num)});
    document.addEventListener("keydown", (e) => {
        if (e.key === num) submit(num);
    });
};


function mergeElement(lastElement, newElement) {
    opArr.push(lastElement + newElement);
    opArr.splice(-2, 1);
};


function addToObject(object, e) {
    if (object.length === 0) {
        if (Number(e) < 0) {
            object.push({operator: "-"});
            object[object.length-1].number = e[1];
        } else {
            object.push({operator: "+"});
            object[object.length-1].number = e;
        };
    } else {
        if (isNaN(Number(e))) {
            object.push({operator: e});
        } else {
            if (Object.keys(object[object.length-1]).indexOf("number") === -1) {
                object[object.length-1].number = e;
            } else {
                object[object.length-1].number += e;
            };
        };
    };
}


function clearDisplay() {
    opArr = [];
    toCalculate = [];
    result = 0;
    numbers.innerText = "";
    calc.innerText = "";
    calc.style.fontSize = 22 + "px";
    calc.style.height = 30 + "px";
    numbers.style.height = 45 + "px"
};


function execute(array) {

    const calc = array.reduce((total, current) => {

        const operand = Number(current.number);

        if (current.operator === "+") {
            total += operand;
        } else if (current.operator === "-") {
            total -= operand;
        } else if (current.operator === "*") {
            total *= operand;
        } else if (current.operator === "/") {
            total /= operand;
        };

        return total;
    }, 0);

    console.log(calc);
    return calc;    
};




