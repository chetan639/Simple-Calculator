const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator__keys');
const display = document.querySelector('.display-result');

const calculate = (n1,operator,n2)=>{
    const firstNum = parseFloat(n1);
    const secondNum = parseFloat(n2);
    switch (operator) {
        case 'add':
            return firstNum + secondNum;
        case 'subtract':
            return firstNum - secondNum;
        case 'multiply':
            return firstNum * secondNum;
        case 'divide':
            return firstNum / secondNum;
    }
}

keys.addEventListener('click',(e)=>{
    const key = e.target;
    const action = key.dataset.action;
    const displayNum = display.textContent;
    const keyNum = key.textContent;
    const prevKey = calculator.dataset.prevKeyType;

    if(!action)
    {
        if (displayNum === '0' || prevKey === 'operator' || prevKey === 'calculate') {
            display.textContent = keyNum;
        }else{
            display.textContent = displayNum + keyNum;
        }
        calculator.dataset.prevKeyType='number';
    }
    if (action === 'decimal') {
        if (calculator.dataset.prevKeyType==='operator') {
            display.textContent='0.'
        }
        else if(!displayNum.includes('.'))
        {
            display.textContent = displayNum+'.';
        }
        calculator.dataset.prevKeyType='decimal';
    }

    if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
        const firstOperand = calculator.dataset.firstOperand;
        const operator = calculator.dataset.operator;
        const secondOperand = displayNum;

        if (firstOperand && operator && prevKey!=='operator' && prevKey!=='calculate') {
            const calcValue = calculate(firstOperand,operator,secondOperand);
            display.textContent = calcValue;

            calculator.dataset.firstOperand = calcValue;
        }
        else
        {
            calculator.dataset.firstOperand = display.textContent;
        }

        key.classList.add('.is-depressed');
        calculator.dataset.prevKeyType = 'operator';
        calculator.dataset.operator = action;
    }

    if (action === 'calculate') {
        let firstOperand =  calculator.dataset.firstOperand;
        const operator = calculator.dataset.operator;
        let secondOperand = display.textContent;

        if(firstOperand)
        {
            if(prevKey === 'calculate')
            {
                firstOperand = display.textContent;
                secondOperand = calculator.dataset.modValue;
            }
            display.textContent = calculate(firstOperand,operator,secondOperand);

        }
        calculator.dataset.modValue=secondOperand;
        calculator.dataset.prevKeyType = 'calculate';
    }

    if (action !== 'clear') {
        const clearBtn = calculator.querySelector('[data-action="clear"]');
        clearBtn.textContent = 'CE';
    }

    if (action === 'clear') {
        if (key.textContent === 'AC') {
            calculator.dataset.firstOperand="";
            calculator.dataset.modValue="";
            calculator.dataset.operator="";
        }
        else
        {
            key.textContent = "AC";
        }
        display.textContent="0";
        calculator.dataset.prevKeyType = 'clear';
    }

})