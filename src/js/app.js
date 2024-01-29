let currentColor = "#000";

const canvas = document.querySelector(".drawing-panel__canvas");
const canvasSizeInput = document.querySelector(".drawing-panel__size-changer");
const colorPickerInput = document.querySelector(".drawing-panel__color-picker");
const clearBtn = document.querySelector("#clear-btn");

let isMouseDown = false;

changeInputSize(canvasSizeInput.value);

function changeInputSize(size) {
    for (let i = 0; i < size * size; i++) {
        const div = document.createElement("div");
        canvas.append(div);
    }
}

canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mouseup", handleMouseUp);
canvas.addEventListener("mouseover", handleMouseOver);

colorPickerInput.addEventListener("input", handleColorPick);

clearBtn.addEventListener("click", handleClearBtnClick);

function handleMouseDown(e) {
    e.target.style.background = currentColor;
    isMouseDown = true;
}

function handleMouseUp() {
    isMouseDown = false;
}

function handleMouseOver(e) {
    if (isMouseDown) {
        e.target.style.background = currentColor;
    }
}

function handleColorPick(e) {
    currentColor = e.target.value;
}

function handleClearBtnClick() {
    Array.from(canvas.children).forEach((child) => {
        child.style.background = "#fff";
    });
}
