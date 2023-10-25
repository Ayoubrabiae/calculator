const container = document.querySelector(".container");
const themeToggleArea = document.querySelector(".theme__toggle .toggle");
const dotToggle = document.querySelector(".toggle .dot");

let currentTheme = 0;
const themes = [
	{
		name: "Dark Theme",
		colors: {
			"--color-main-background": "#3a4764",
			"--color-keypad-background": "#232c43",
			"--color-screen-background": "#182034",
			"--color-key-blue-background": "#637097",
			"--color-key-blue-shadow": "#404e72",
			"--color-key-blue-hover": "#a2b3e1",
			"--color-key-red-background": "#d03f2f",
			"--color-key-red-shadow": "#93261a",
			"--color-key-red-hover": "#f86c5c",
			"--color-key-gray-background": "#eae3dc",
			"--color-key-gray-shadow": "hsl(28, 16%, 65%)",
			"--color-dark-blue-text": "#444b5a",
			"--color-white-text": "#ffffff"
		},
		dot: "left: 3px;"
	},
	{
		name: "Light Earthy Theme",
		colors: {
			"--color-main-background": "#f0f0e4",
			"--color-keypad-background": "#dcd9c2",
			"--color-screen-background": "#c5c0a7",
			"--color-key-blue-background": "#81a29c",
			"--color-key-blue-shadow": "#6a8d85",
			"--color-key-blue-hover": "#aacabf",
			"--color-key-red-background": "#e07a5f",
			"--color-key-red-shadow": "#c25b43",
			"--color-key-red-hover": "#fca68c",
			"--color-key-gray-background": "#f4ebe0",
			"--color-key-gray-shadow": "#b6b0a0",
			"--color-dark-blue-text": "#444b5a",
			"--color-white-text": "#3a4764"
		},
		dot: "left: 50%; transform: translate(-50%);"
	},
	{
		name: "Optimal Dark Theme",
		colors: {
			"--color-main-background": "#121212",
			"--color-keypad-background": "#1f1f1f",
			"--color-screen-background": "#181818",
			"--color-key-blue-background": "#3949AB",
			"--color-key-blue-shadow": "#263592",
			"--color-key-blue-hover": "#5F6FB2",
			"--color-key-red-background": "#D32F2F",
			"--color-key-red-shadow": "#A02626",
			"--color-key-red-hover": "#E57373",
			"--color-key-gray-background": "#757575",
			"--color-key-gray-shadow": "#5B5B5B",
			"--color-dark-blue-text": "#E0E0E0",
			"--color-white-text": "#FFFFFF"
		},
		dot: "left: 75%;"
	}
];

themeToggleArea.addEventListener("click", () => {
	currentTheme < themes.length - 1 ? currentTheme++ : currentTheme = 0;
	dotToggle.style.cssText = themes[currentTheme].dot;

	let colors = ""; Object.keys(themes[currentTheme].colors).reduce((pre, curr) => {
		colors += `${pre}: ${themes[currentTheme].colors[pre]};`;
		return curr;
	});
	container.style.cssText = colors;
});


// calculator's Logic
const keyElements = document.querySelectorAll("[data-type]");
const result = document.querySelector(".calc__result");
let storedNumber = "";
let currentNumber = "";
let operation = "";

const updateUI = (value) => result.textContent = !value ? "0" : value;

const numberButtonHandler = (value) => {
	if(value === "0" && !currentNumber) return;
	if(value === "." && currentNumber.includes(".")) return;

	currentNumber += value;
	updateUI(currentNumber);
};

const resetButtonHandler = () => {
	storedNumber = "";
	currentNumber = "";
	operation = "";
	updateUI();
};

const deleteButtonHandler = () => {
	if(!currentNumber || currentNumber === "0") return;
	
	if (currentNumber.length === 1) {
		currentNumber = "";
	} else if (currentNumber.length > 1) {
		currentNumber = currentNumber.substring(0, currentNumber.length-1);
	}
	updateUI(currentNumber);
};

const excuteOperation = () => {
	if(currentNumber && storedNumber && operation) {
		switch(operation) {
		case "+":
			storedNumber = Number(storedNumber) + Number(currentNumber);
			break;
		case "-": 
			storedNumber = Number(storedNumber) - Number(currentNumber);
			break;
		case "*": 
			storedNumber = Number(storedNumber) * Number(currentNumber);
			break;
		case "/": 
			storedNumber = Number(storedNumber) / Number(currentNumber);
			break;
		}
		currentNumber = "";
		updateUI(storedNumber);
	}
};

const operationButtonHandler = (operationValue) => {
	if(!currentNumber && !storedNumber) {
		return;
	} 
	
	if(currentNumber && !storedNumber) {
		storedNumber = currentNumber;
		currentNumber = "";
		operation = operationValue;
	} else if (storedNumber) {
		if(currentNumber) excuteOperation();
		operation = operationValue;
	}
};

const keyElementsHandler = (key) => key.addEventListener("click", () => {
	const {type, value} = key.dataset;
	if (type === "number") {
		numberButtonHandler(value);
	} else if (type === "operation") {
		switch(value) {
		case "c": 
			resetButtonHandler();
			break;
		case "Backspace":
			deleteButtonHandler();
			break;
		case "Enter": 
			excuteOperation();
			break;
		default:
			operationButtonHandler(value);
		}
	}
});

keyElements.forEach((key) => keyElementsHandler(key));

// Type with keyboard
window.addEventListener("keydown", (event) => {
	const key = document.querySelector(`[data-value='${event.key}']`);
	if(key) {
		key.classList.add("active");
		key.click();
		setTimeout(() => key.classList.remove("active"), 150);
	}
});