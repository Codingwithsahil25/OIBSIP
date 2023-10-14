let display = document.getElementById('display');
let currentValue = '';

function appendToDisplay(value) {
    currentValue += value;
    display.value = currentValue;
}

function clearDisplay() {
    currentValue = '';
    display.value = '';
}

function calculateResult() {
    try {
        currentValue = eval(currentValue);
        display.value = currentValue;
    } catch (error) {
        display.value = 'Error';
    }
}

function handleKeyboardInput(event) {
    const key = event.key;

    if (/\d|\+|-|\*|\//.test(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculateResult();
    } else if (key === 'Escape') {
        clearDisplay();
    }
}

// Add event listeners
document.addEventListener('keydown', handleKeyboardInput);
