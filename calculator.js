function initCalculatorButtons() {

    let inputBoardSimple = document.getElementById("inputBoard");
    const keyValues = ["C","( )","%","/","7","8","9","x","4","5","6","-","1","2","3","+","+/-","0",".","="];

    for (let i = 0; i < 5; i++) {

        let row = document.createElement("div");
        row.className = "buttonRow";

        for (let j = 0; j < 4; j++) {

            let column = document.createElement("div");
            let buttonKey = document.createElement("button");

            column.className = "buttonColumn";

            buttonKey.className = "buttonKeys";
            buttonKey.textContent = keyValues[(i*4)+j];
            buttonKey.style.height = "50px";
            buttonKey.style.width = "50px";

            column.appendChild(buttonKey);
            row.appendChild(column);

        }

        inputBoardSimple.appendChild(row);

    }

}

function calculateExpression(expressionString) {

    let funcString = `return ${expressionString.replaceAll("x", "*")}`;

    let solveFunc = new Function(funcString);

    let result = document.getElementById("resultOutput");

    let resultCheck = solveFunc();

    if (isNaN(resultCheck)) {
    } else {
        result.value = resultCheck;
    }

}

document.addEventListener("DOMContentLoaded", function() {

    let buttons = document.getElementsByClassName("buttonKeys");
    let expression = document.getElementById("expressionInput");
    let resultClear = document.getElementById("resultOutput");
    let bracketVal = 0;
    let negNum = 0;
    
    for (let k = 0; k < buttons.length; k++) {
        buttons[k].addEventListener("click", function() {

            if (this.textContent == "=") {
                calculateExpression(expression.value);
            } else if (this.textContent == "C") {
                if (expression.value == "") {
                    resultClear.value = "";
                }
                expression.value = "";
                bracketVal = 0;
                negNum = 0;
            } else if (this.textContent == "( )") {
                if (bracketVal == 1 || negNum == 1) {
                    expression.value += ")";
                    if (negNum == 1) {
                        negNum = 0;
                    } else if (bracketVal == 1) {
                        bracketVal = 0;
                    }
                } else if (bracketVal == 0) {
                    expression.value += "(";
                    bracketVal = 1;
                }
            } else if (this.textContent == "+/-") {
                let expNegCheck = expression.value;      
                let negString = expNegCheck.split("");
                if (negNum == 0) {
                    if (negString.length == 0) {
                        expression.value += "(-";
                        negNum = 1;
                    } else {
                        for (let k = negString.length; k > 0; k-- ) {
                            if (isNaN(Number(negString[k - 1])) || k == 1) {
                                if (k == 1) {
                                    negString.splice(k - 1, 0, "(-");
                                } else {
                                    negString.splice(k, 0, "(-");
                                }
                                expression.value = negString.join("");
                                negNum = 1;
                                break;
                            }
                        }
                    }
                } else {

                }
            } else {
                expression.value += this.textContent;
            }
            


            // console.log("damn");
        });
    }

})

initCalculatorButtons();