// Basic operations
function sum(a,b){return parseFloat(a)+parseFloat(b);}

function subtract(a,b){return parseFloat(a)-parseFloat(b);}

function multiply(a,b){return parseFloat(a)*parseFloat(b);}

function divide(a,b){return parseFloat(a)/parseFloat(b);}
// -----------------
function calculate(expression){
    Object.keys(priorityOperationList).forEach(function(key) {
        while (Array.from(expression).includes(key)) {
            expression = calculatePriority(key, expression, priorityOperationList[key]);
        }
    });
    let result = parseFloat(expression[0]);
    if (Number.isNaN(result)) {
        result = 0;
    }
    for (let i = 0; i < expression.length; i++) {
        if (expression[i] in nonPriorityOperationList){
            result = nonPriorityOperationList[expression[i]](result,expression[i+1]);
        }
    }
    return result;
}

function calculateParentheses(expression) {
    let nLeft = expression.filter(x => x === "(").length;
    if(nLeft != expression.filter(x => x === ")").length) {
        setError("Uso incorreto dos parênteses.");
        clearList(expression);
        return expression;
    }
    if(nLeft == 0){
        return expression;
    }
    for (let index = 0; index < nLeft; index++) {
        let leftIndex = expression.indexOf('(');
        let rightIndex = expression.indexOf(')');
        let result = calculate(expression.slice(leftIndex+1,rightIndex));
        let tempExpression = [];
        for (let i = 0; i < expression.length; i++){
            if(i < leftIndex+1 || i > rightIndex){
                tempExpression.push(expression[i]);
            } 
        }
        tempExpression[leftIndex] = result;
        expression = tempExpression;
    }
    return expression;

}

function calculatePriority(delimiter, expression, operation){
    var temp = 0;
    pos = expression.indexOf(delimiter);
    if(delimiter == "/" && parseInt(expression[pos+1]) == 0){
        setError('Não é possível dividir por 0.');
        return 0;
    }
    temp += operation(parseFloat(expression.splice(pos-1,1)),parseFloat(expression.splice(pos,1)));
    expression[pos-1] = temp
    return expression;
}

var screenValue;
var elementList = [];
var log = "";
const priorityOperationList = {"x": multiply, "/":divide};
const nonPriorityOperationList = {"+": sum, "-":subtract};
var erro = false;

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

function getScreenTxt() {
    return document.getElementById("result").textContent;
}
function setError(err) {
    document.getElementById("err").textContent = err;
    // setScreen("");
    erro = true;
}

function clearList(list){
    for (let n = list.length; n >= 0; n--) {
        list.pop();
    }
}

function addLog(text){
    log += text;
}

function setLog(){
    var p = document.createElement("p");
    p.textContent = log;
    document.getElementById("backlog").appendChild(p);
    log = "";
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
    return lst;
}


function main() {
    setError("");
    erro = false;   
    addLog(getScreenTxt());
    toList(parseFloat(screenValue));
    elementList = calculateParentheses(elementList);
    let result = parseFloat(calculate(elementList));
    if(isNaN(result)){
        setError("Erro de sintaxe.");
    }
    clearList(elementList);
    if(erro){
        addLog(" = ERROR");
        erro = false;
        result = "";
    } else {
        addLog(" = "+result);
        toList(result);
    }
    
    setScreen(result);
    screenValue = undefined;
    setLog();
}


function load(){
    elementsBtn = document.getElementsByClassName("elementButton");
    Array.from(elementsBtn).forEach(btn => btn.addEventListener("click",addElement, false));
    
    operatorsBtn = document.getElementsByClassName("operatorButton");
    Array.from(operatorsBtn).forEach(btn => btn.addEventListener("click",addOperator, false));

    document.getElementById("calculate").addEventListener("click",main, false);
    document.getElementById("clear").addEventListener("click",clearAll, false);
}

document.addEventListener("DOMContentLoaded", load, false);