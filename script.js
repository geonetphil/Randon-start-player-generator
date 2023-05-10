    function isTouchDevice() {
        return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
      }
      
      function closeWelcomeMessage() {
        document.querySelector('.welcome').style.display = 'none';
      }
      
      if (isTouchDevice()) {
        document.querySelector('.compat').style.display = 'none';
        document.querySelector('.welcome').style.display = 'block';
        document.addEventListener('touchstart', closeWelcomeMessage, { once: true });
      } else {
        document.querySelector('.compat').style.display = 'block';
        document.querySelector('.welcome').style.display = 'none';
      
        var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

        if (!isChrome) {
            var closeButton = document.createElement('button');
            closeButton.textContent = 'Close Tab';
            closeButton.addEventListener('click', function() {
              window.close();
            });
            document.body.appendChild(closeButton);
          }
        }

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

function startTimer (){
    const existingMatchingCircles = document.body.querySelectorAll("." + circleClassName);
    if (existingMatchingCircles.length >1) {
        document.body.classList.add("race")
        timer = setTimeout(choosePlayer, 5000); 
    }
}


function choosePlayer(){
    const existingMatchingCircles =[... document.body.querySelectorAll("." + circleClassName)];
    const randomIndex = Math.floor(Math.random() * existingMatchingCircles.length);
    existingMatchingCircles.splice(randomIndex, 1);
    for (const element of existingMatchingCircles) {
        element.style.visibility='hidden';
    }


}

let timer

function displayCircles(touchStartEvent) {
    touchStartEvent.preventDefault();
    const touches = touchStartEvent.changedTouches;

    

    for (const touch of touches) {
    
        const circle = document.createElement("div")
        circle.classList.add(circleClassName)
        const className = toClassName(touch.identifier);
        circle.classList.add(className)
        circle.style.width = height + "px";
        circle.style.height = height + "px";
        circle.style.borderRadius = radius  + "px"
        moveCircle(touch, circle);

        document.body.appendChild(circle)

    }
    clearTimer()
    startTimer()

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