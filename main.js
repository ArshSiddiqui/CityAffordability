const customPointer = document.getElementById("custom-pointer");
let pointerX;
let pointerY;

document.onmousemove = function (event) {
    pointerX = event.pageX;
    pointerY = event.pageY;

    customPointer.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
};