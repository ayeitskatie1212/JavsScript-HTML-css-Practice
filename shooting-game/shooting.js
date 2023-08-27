let targetArea = document.getElementById('targetArea');
let scoreSpan = document.getElementById('score');
let targetsLeftSpan = document.getElementById('targetLeft');
let playButton = document.getElementById('playButton');
let targets = [
    {name: "ten.png", hitName: "ten-hit.png", size: 120, score: 10, time: 2000, maxY:280, maxX:680},
    {name: "twenty.png", hitName: "twenty-hit.png", size: 80, score: 20, time: 1000, maxY:320, maxX:720},
    {name: "fifty.png", hitName: "fifty-hit.png", size: 50, score: 50, time: 500, maxY:350, maxX:750}
]
let numTargetsToDisplay = 7;
let numTargetsShown = 0;
let targetsLeft = 7
let score = 0
window.onload = function() {
    resetGame()
}
let spawnedTargets = new Array(numTargetsToDisplay).fill(undefined);
playButton.addEventListener('click', startGame)



function startGame() {
    resetGame()
    playButton.style.visibility = "hidden"
    intervalID = setInterval(makeTarget, 5000)
}

function makeTarget() {
    numTargetsShown++;
    if (numTargetsShown === numTargetsToDisplay) {
        clearInterval(intervalID)
    }
    let targetType = chooseTarget();
    console.log(targetType)
    let newTarget = document.createElement("img")
    let x = getRandomInt(0, targetType.maxX)
    let y = getRandomInt(0, targetType.maxY)
    newTarget.style.position = "absolute"
    newTarget.style.left = x + "px"
    newTarget.style.top = y + "px"
    newTarget.style.width = targetType.size + "px"
    newTarget.style.height = targetType.size + "px"
    newTarget.src = targetType.name
    targetArea.appendChild(newTarget)
    let timeoutID = setTimeout(clearTarget, targetType.time, numTargetsShown)
    newTarget.addEventListener("click", () => {
        increaseScore(targetType)
        clearTargetHit(numTargetsShown, targetType)
        clearTimeout(timeoutID)
    })
    spawnedTargets[numTargetsShown - 1] = newTarget
}

function increaseScore(targetType) {
    score+= targetType.score
    console.log(score)
    scoreSpan.innerHTML = score

}

function clearTargetHit(targetIdx, targetType) {
    spawnedTargets[targetIdx - 1].src = targetType.hitName;
    targetsLeft -= 1
    targetsLeftSpan.innerHTML = targetsLeft
    setTimeout ( function () {
        spawnedTargets[targetIdx - 1].remove()
        if (targetsLeft === 0) {
            playButton.style.visibility = "visible"
        }
    }, 800)
}

function clearTarget(targetIdx) {
    console.log(targetIdx)
    spawnedTargets[targetIdx - 1].remove()
    targetsLeft -= 1
    targetsLeftSpan.innerHTML = targetsLeft
    if (targetsLeft === 0) {
        playButton.style.visibility = "visible"
    }
}


function resetGame() {
    scoreSpan.innerHTML = 0
    targetsLeftSpan.innerHTML = 7
    targetsLeft = 7
    numTargetsShown = 0
    score = 0
    spawnedTargets = new Array(numTargetsToDisplay).fill(undefined);
}

function chooseTarget() {
    let int = getRandomInt(1, 101)
    if (int <= 10) {
        return targets[2]
    }
    if (int <= 45) {
        return targets[1]
    }
    return targets[0]
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

