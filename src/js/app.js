const currentColor = "#000";

const canvas = document.querySelector(".drawing-panel__canvas");
const canvasSizeInput = document.querySelector(".drawing-panel__size-changer");
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
