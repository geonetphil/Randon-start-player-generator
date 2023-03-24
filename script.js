const circles = [];
function displayCircles(touchStartEvent) {

    console.log(touchStartEvent);
    const touches = touchStartEvent.touches;

    for (const touch of touches) {
        
        const circle = document.createElement("div")
        circle.classList.add("circle")
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

        circles[touch.identifier] = circle;

    }
    
}

document.body.addEventListener("touchstart", displayCircles);


function removeCircles(touchRemoveEvent) {

    console.log(touchRemoveEvent)
    const touches = touchRemoveEvent.changedTouches

    for (const touch of touches) {
        console.log(circles);
        const circle = circles[touch.identifier]
        circle.remove();
    }
    
}

document.body.addEventListener("touchend", removeCircles);
document.body.addEventListener("touchcancel", removeCircles);
