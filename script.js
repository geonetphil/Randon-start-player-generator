
function toClassName(identifier) {
    return "circle-" + identifier;
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
        const height = 50;
        const radius = height / 2;
        circle.style.width = height + "px";
        circle.style.height = height + "px";
        circle.style.borderRadius = radius  + "px"
    
        const top = touch.clientY - radius
        const left = touch.clientX - radius
    
    
        circle.style.top = top + "px"
        circle.style.left = left + "px"

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

document.body.addEventListener("touchend", removeCircles);
document.body.addEventListener("touchcancel", removeCircles);


function moveCircles(touchMoveEvent) {
    touchMoveEvent.preventDefault();
}

document.body.addEventListener("touchmove", moveCircles);