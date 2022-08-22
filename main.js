// selection the buttion and inputs
let button = document.querySelectorAll("button");
let resInput = document.querySelector("#res-input");
let opeInput = document.querySelector("#ope-input");
let historyIcon = document.querySelector(".history-icon");
let historyPage = document.querySelector(".history-page");
let historyOperation = document.querySelector(".history-operation");
// identifiers or Varaibles

let valueOne = 0;
let valueTwo = 0;
let operation = "";
let option2 = false;
let allOperations = (JSON.parse(localStorage.getItem("LocOperations")) || []);

//calling history function to display the result in the history box 
showHistory();

// historyIcon catching
historyIcon.addEventListener("click", () => {
    historyPage.classList.toggle("active");
    showHistory()
    let historyElement =document.querySelectorAll(".history-element");
    historyElement.forEach( his =>{
        his.addEventListener("click",(e)=>{
            opeInput.value=e.target.parentElement.children[0].value;
            resInput.value=e.target.parentElement.children[1].value;
        })
    })
})

// Moving all item into trash.
document.querySelector(".fa-trash").addEventListener("click", ()=>{
    clearHistory();
    showHistory();
})
// catching every buttion is clicked  and other operatins
button.forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn.classList.contains("clear-all") || btn.classList.contains("clear")) {
            if (btn.classList.contains("clear")) {
                if (resInput.value > 0) {
                    clearInput(resInput)
                } else {
                    clearInput(opeInput)
                }
            } else {
                clearAll()
            }

        } else if (btn.classList.contains("operation")) {
            if (btn.value != "=") {
                option2 = true;
                valueOne = opeInput.value;
                operation = btn.value;
            } else {
                if (option2) {
                    let sum = `${valueOne} ${operation} ${valueTwo}`;
                    resInput.value = `${eval(sum)}`

                    // put the result into Local Storage.
                    let currentOperations = {
                        val1: valueOne,
                        opp: operation,
                        val2: valueTwo
                    }
                    allOperations.push(currentOperations)
                    localStorage.setItem("LocOperations", JSON.stringify(allOperations));


                    //reseting
                    valueOne = 0;
                    valueTwo = 0;
                    operation = "";
                }

            }

        } else {
            if (option2) {
                valueTwo == 0 ? valueTwo = btn.value : valueTwo += btn.value;
                opeInput.value = `${valueOne} ${operation} ${valueTwo}`
            } else {
                opeInput.value == 0 ? opeInput.value = btn.value : opeInput.value += btn.value;
                valueOne += btn.value;
            }

        }


    })
})


// functions

const clearInput = (input) => {
    let currentResult = input.value.split("");

    let last = currentResult.pop();

    if (currentResult.length > 0) {
        input.value = currentResult.join("");
    } else {
        input.value = 0;
        valueOne = 0;
        valueTwo = 0;
        operation = "";
        option2 = false;
    }
}

const clearAll = function() {
    opeInput.value = 0;
    resInput.value = 0;
    valueOne = 0;
    valueTwo = 0;
    operation = "";
    option2 = false;
}


function showHistory() {
    let ops = "";
    if (allOperations.length > 0) {
        allOperations.forEach( op =>{

            let current =`${(op.val1)}${(op.opp)}${(op.val2)}`

            ops+= `<div class="history-element">
            <input type="text" class="calc-his" value="${op.val1} ${op.opp} ${op.val2} =" disabled>
            <input type="text" class="calc-his" value="${eval(current)}" disabled>
            </div><hr>`;
        })
    }else{
        ops +="<h5> we don't have any history."
    }

    historyOperation.innerHTML = ops;
}


function clearHistory(){
    localStorage.clear();
    allOperations=[];
}