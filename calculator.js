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
            if (parseInt(expression[pos+1]) == 0) {
                setError('Não é possível dividir por 0.');
                setScreen("");
                clearList(expression);
                return expression;
            }
            temp += divide(parseFloat(expression.splice(pos-1,1)),parseFloat(expression.splice(pos,1)));

        }
        expression[pos-1] = temp
    }
    return expression;
}

var screenValue;
var elementList = [];
var log = "";

function toList(value){
    if(!Number.isNaN(value)){
        elementList.push(value);
    }
}

function addElement(){
    value = this.value;
    if(screenValue === undefined){
        screenValue = value;
    } else {
        screenValue += value;
    }
    updateScreen(value);
}

function addOperator(){
    operator = this.value;
    toList(parseFloat(screenValue));
    updateScreen(operator);
    toList(operator);
    screenValue = undefined;
}

function updateScreen(value){
    document.getElementById("result").textContent += value;
}

function setScreen(value){
    document.getElementById("result").textContent = value;
}

function setError(err) {
    document.getElementById("err").textContent = err;
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

function removeNaN(lst) {
    lst.filter(function (value) {
        return (!Number.isNaN(value));
    });
    console.log(lst);
    return lst;
}

function calculate(){
    setError("");
    console.log(screenValue);
    toList(parseFloat(screenValue));
    while (elementList.includes("x")) {
        elementList = getPriority(elementList,"x");
    }
    while (elementList.includes("/")) {
        elementList = getPriority(elementList,"/");
    }
    result = parseFloat(elementList[0]);
    if (Number.isNaN(result)) {
        result = 0;
    }
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
    toList(result);
    screenValue = undefined;
    setScreen(result);
    setLog();
}

function load(){
    elementsBtn = document.getElementsByClassName("elementButton");
    Array.from(elementsBtn).forEach(btn => btn.addEventListener("click",addElement, false));
    
    operatorsBtn = document.getElementsByClassName("operatorButton");
    Array.from(operatorsBtn).forEach(btn => btn.addEventListener("click",addOperator, false));

    document.getElementById("calculate").addEventListener("click",calculate, false);
    document.getElementById("clear").addEventListener("click",clearAll, false);
}

document.addEventListener("DOMContentLoaded", load, false);