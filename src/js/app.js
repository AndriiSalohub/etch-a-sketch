const state = {
    currentColor: "#000",
    colorModeColor: "#000",
    isMouseDown: false,
};

const canvas = document.querySelector(".drawing-panel__canvas");
const canvasSizeInput = document.querySelector(".drawing-panel__size-changer");
const colorPickerInput = document.querySelector(".drawing-panel__color-picker");
const sizeText = document.querySelector(".drawing-panel__size-text");

const allButtons = document.querySelectorAll(".drawing-panel__controls-button");
const colorButton = document.querySelector("#color");
const clearButton = document.querySelector("#clear-btn");
const eraserButton = document.querySelector("#eraser");

changeInputSize(canvasSizeInput.value);

canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mouseup", handleMouseUp);
canvas.addEventListener("mouseover", handleMouseOver);

canvasSizeInput.addEventListener("input", handleSizeChange);

colorPickerInput.addEventListener("input", handleColorPick);

colorButton.addEventListener("click", handleColorModeClick);
eraserButton.addEventListener("click", handleEraserModeClick);
clearButton.addEventListener("click", handleClearButtonClick);

function changeInputSize(size) {
    for (let i = 0; i < size * size; i++) {
        const div = document.createElement("div");
        canvas.append(div);
    }
}

function setCurrentMode(button) {
    allButtons.forEach((btn) => {
        btn.classList.remove("current-mode");
    });
    button.classList.add("current-mode");
}

function handleMouseDown(e) {
    e.target.style.background = state.currentColor;
    state.isMouseDown = true;
}

function handleMouseUp() {
    state.isMouseDown = false;
}

function handleMouseOver(e) {
    if (state.isMouseDown) {
        e.target.style.background = state.currentColor;
    }
}

function handleColorPick(e) {
    state.currentColor = e.target.value;
    state.colorModeColor = e.target.value;
}

function clearAllCells() {
    Array.from(canvas.children).forEach((child) => {
        child.style.background = "#fff";
    });
}

function handleSizeChange(e) {
    clearAllCells();
    const size = e.target.value;
    changeInputSize(size);
    sizeText.textContent = `${size} x ${size}`;
    canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;
}

function handleColorModeClick(e) {
    state.currentColor = state.colorModeColor;
    setCurrentMode(e.target);
}

function handleEraserModeClick(e) {
    state.currentMode = "eraser";
    state.currentColor = "#fff";
    setCurrentMode(e.target);
}

function handleClearButtonClick() {
    clearAllCells();
    setCurrentMode(colorButton);
    state.currentColor = state.colorModeColor;
}
