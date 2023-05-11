function isTouchDevice() {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
}


const messagesSelector = ".messages"
function hideMessages() {
    const messages = document.querySelectorAll(messagesSelector);
    messages.forEach(m => m.style.display = "none");
}


const messageClassToShow = isTouchDevice() ? "welcome" : "compat";
document.querySelector("." + messageClassToShow).style.display = "block"


const circleClassName = "circle"

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

function clearTimer() {
    document.body.classList.remove("race");
    if (timer) {
        clearTimeout(timer)
    }

}

function startTimer() {

    const existingMatchingCircles = document.body.querySelectorAll("." + circleClassName);
    if (existingMatchingCircles.length > 1) {
        document.body.classList.add("race")
        timer = setTimeout(choosePlayer, 5000);
    }
}


function choosePlayer() {
    const existingMatchingCircles = [...document.body.querySelectorAll("." + circleClassName)];
    const randomIndex = Math.floor(Math.random() * existingMatchingCircles.length);
    existingMatchingCircles.splice(randomIndex, 1);
    console.log(existingMatchingCircles)

    for (const element of existingMatchingCircles) {
        element.style.visibility = 'hidden';
    }
}

let timer

function displayCircles(touchStartEvent) {
    hideMessages();

    touchStartEvent.preventDefault();
    const touches = touchStartEvent.changedTouches;


    for (const touch of touches) {
        const circle = document.createElement("div")
        circle.classList.add(circleClassName)
        const className = toClassName(touch.identifier);
        circle.classList.add(className)
        circle.style.width = height + "px";
        circle.style.height = height + "px";
        circle.style.borderRadius = radius + "px"
        moveCircle(touch, circle);
        const ringsContainer = document.querySelector(".rings")
        ringsContainer.appendChild(circle)
    }
    clearTimer()
    startTimer()

}

document.body.addEventListener("touchstart", displayCircles);


function removeCircles(touchRemoveEvent) {
    touchRemoveEvent.preventDefault();
    const touches = touchRemoveEvent.changedTouches

    for (const touch of touches) {
        const className = toClassName(touch.identifier);
        const existingMatchingCircles = document.body.querySelectorAll("." + className);

        for (const element of existingMatchingCircles) {
            element.remove();
        }
    }
    clearTimer()
    startTimer()


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