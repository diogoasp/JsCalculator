function sum(a,b){return parseFloat(a+b);}

function subtract(a,b){return parseFloat(a-b);}

function multiply(a,b){return parseFloat(a*b);}

function divide(a,b){return parseFloat(a/b);}

function getPriority(expression, delimiter){
    var temp = 0;
    if (expression.includes(delimiter)){
        pos = expression.indexOf(delimiter);
        if(delimiter == "x"){
            temp += multiply(parseFloat(expression.splice(pos-1,1)),parseFloat(expression.splice(pos,1)));
        }
        if(delimiter == "/"){
            temp += divide(parseFloat(expression.splice(pos-1,1)),parseFloat(expression.splice(pos,1)));
        }
        expression[pos-1] = temp
    }
    return expression;
}

var screenValue;
var elementList = [];
var log = "";

function addElement(value){
    if(screenValue === undefined){
        screenValue = value;
    } else {
        screenValue += value;
    }
    updateScreen(value);
}

function addOperator(operator){
    elementList.push(parseFloat(screenValue));
    updateScreen(operator);
    elementList.push(operator);
    screenValue = undefined;
}

function updateScreen(value){
    document.getElementById("result").textContent += value;
}

function setScreen(value){
    document.getElementById("result").textContent = value;
}

function clearList(list){
    for (let n = list.length; n >= 0; n--) {
        list.pop();
    }
}

function addLog(text){
    log = text;
}

function setLog(){
    var p = document.createElement("p");
    p.textContent = log;
    document.getElementById("backlog").appendChild(p);
}

function clearAll() {
    screenValue = undefined;
    clearList(elementList);
    setScreen(undefined);
}

function calculate(){
    elementList.push(parseFloat(screenValue));
    elementList = elementList.filter(function (value) {
        return !Number.isNaN(value);
    });
    while (elementList.includes("x")) {
        elementList = getPriority(elementList,"x");
    }
    while (elementList.includes("/")) {
        elementList = getPriority(elementList,"/");
    }
    result = parseFloat(elementList[0]);
    for (let i = 0; i < elementList.length; i++) {
        if (elementList[i] == "+"){
            result = sum(result,elementList[i+1]);
        }
        if (elementList[i] == "-"){
            result = subtract(result,elementList[i+1]);
        }
        
    }
    addLog(document.getElementById("result").textContent + " = " + result);
    clearList(elementList);
    elementList.push(result);
    screenValue = undefined;
    setScreen(result);
    setLog();
}


