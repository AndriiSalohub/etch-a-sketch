const state = {
    currentColor: "#000",
    colorModeColor: "#000",
    isMouseDown: false,
    mode: "color",
};

const canvas = document.querySelector(".drawing-panel__canvas");
const canvasSizeInput = document.querySelector(".drawing-panel__size-changer");
const colorPickerInput = document.querySelector(".drawing-panel__color-picker");
const sizeText = document.querySelector(".drawing-panel__size-text");

const allButtons = document.querySelectorAll(".drawing-panel__controls-button");
const colorButton = document.querySelector("#color");
const clearButton = document.querySelector("#clear-btn");
const eraserButton = document.querySelector("#eraser");
const rainbowButton = document.querySelector("#rainbow");

changeInputSize(canvasSizeInput.value);

canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mouseup", handleMouseUp);
canvas.addEventListener("mouseover", handleMouseOver);

canvas.addEventListener("touchstart", handleMouseDown);
canvas.addEventListener("touchend", handleMouseUp);
canvas.addEventListener("touchmove", handleTouchMove);

canvasSizeInput.addEventListener("input", handleSizeChange);

colorPickerInput.addEventListener("input", handleColorPick);

colorButton.addEventListener("click", handleColorModeClick);
eraserButton.addEventListener("click", handleEraserModeClick);
clearButton.addEventListener("click", handleClearButtonClick);
rainbowButton.addEventListener("click", handleRainbowButtonClick);

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
    if (state.mode === "color") {
        e.target.style.background = state.currentColor;
    }

    if (state.mode === "rainbow") {
        e.target.style.background = generateRandomColor();
    }

    state.isMouseDown = true;
}

function handleTouchMove(e) {
    e.preventDefault();
    const touches = e.changedTouches;
    for (let i = 0; i < touches.length; i++) {
        const touch = touches[i];
        const x = touch.clientX - canvas.offsetLeft;
        const y = touch.clientY - canvas.offsetTop;
        const cell = document.elementFromPoint(x, y);
        if (cell) {
            if (state.isMouseDown && state.mode === "color") {
                cell.style.background = state.currentColor;
            }
            if (state.isMouseDown && state.mode === "rainbow") {
                cell.style.backgroundColor = generateRandomColor();
            }
        }
    }
}

function handleMouseUp() {
    state.isMouseDown = false;
}

function handleMouseOver(e) {
    if (state.isMouseDown && state.mode === "color") {
        e.target.style.background = state.currentColor;
    }

    if (state.isMouseDown && state.mode === "rainbow") {
        e.target.style.backgroundColor = generateRandomColor();
    }
}

function generateRandomColor() {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    return `rgba(${randomR}, ${randomG}, ${randomB})`;
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
    state.mode = "color";
    if (state.mode === "rainbow") {
        state.currentColor = state.colorModeColor;
    } else {
        state.currentColor = state.colorModeColor;
        setCurrentMode(e.target);
    }
}

function handleEraserModeClick(e) {
    state.currentMode = "eraser";
    state.currentColor = "#fff";
    setCurrentMode(e.target);
    state.mode = "color";
}

function handleClearButtonClick() {
    clearAllCells();
    setCurrentMode(colorButton);
    state.currentColor = state.colorModeColor;
    state.mode = "color";
}

function handleRainbowButtonClick() {
    state.mode = "rainbow";
    setCurrentMode(rainbowButton);
}
