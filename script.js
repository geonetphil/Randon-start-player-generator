
const height = 100;
const radius = height / 2;

function toClassName(identifier) {
    return "circle-" + identifier;
}

function moveCircle(touch, circle) {
    const top = touch.clientY - radius
    const left = touch.clientX - radius
    circle.style.top = top + "px"
    circle.style.left = left + "px"
}

function displayCircles(touchStartEvent) {
    touchStartEvent.preventDefault();
    console.log(touchStartEvent);
    const touches = touchStartEvent.touches;

    for (const touch of touches) {
        
        const circle = document.createElement("div")
        circle.classList.add("circle")
        const className = toClassName(touch.identifier);
        circle.classList.add(className)
       
        circle.style.width = height + "px";
        circle.style.height = height + "px";
        circle.style.borderRadius = radius  + "px"
        moveCircle(touch, circle);

        document.body.appendChild(circle)

    }
    
}

document.body.addEventListener("touchstart", displayCircles);


function removeCircles(touchRemoveEvent) {
    touchRemoveEvent.preventDefault();
    console.log(touchRemoveEvent)
    const touches = touchRemoveEvent.changedTouches

    for (const touch of touches) {
        const className = toClassName(touch.identifier);
        const existingMatchingCircles = document.body.querySelectorAll("." + className);
        for (const element of existingMatchingCircles) {
            element.remove();
        }
    }
    
}

document.body.addEventListener("touchmove", moveCircles);

function moveCircles(touchMoveEvent) {
    touchMoveEvent.preventDefault();
    const touches = touchMoveEvent.changedTouches

    for (const touch of touches) {
        const className = toClassName(touch.identifier);
        const existingMatchingCircles = document.body.querySelectorAll("." + className);
        for (const circle of existingMatchingCircles) {
            moveCircle(touch, circle);
        }
    }

}

document.body.addEventListener("touchend", removeCircles);
document.body.addEventListener("touchcancel", removeCircles);



