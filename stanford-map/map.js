images = [
  { name: "map-s.gif", width: 1283, height: 997, ratioUp: 1.59547934528 },
  {
    name: "map-m.gif",
    width: 2047,
    height: 1589,
    ratioUp: 1.49633610161,
    ratioDown: 0.627438640654,
  },
  {
    name: "map-l.gif",
    width: 3063,
    height: 2373,
    ratioUp: 1.32158015018,
    ratioDown: 0.669616519174,
  },
  { name: "map-xl.gif", width: 4084, height: 3164, ratioDown: 0.75 },
];
let loadedImgs = new Array(4);
let isDragging = false;
let x = 0;
let y = 0;
let currImg = 0;

let upButton = document.getElementById("upNavigation");
let downButton = document.getElementById("downNavigation");
let leftButton = document.getElementById("leftNavigation");
let rightButton = document.getElementById("rightNavigation");
let zoomInButton = document.getElementById("zoomIn");
let ZoomOutButton = document.getElementById("zoomOut");
let mapFrame = document.getElementById("mapFrame");
let img = document.getElementById("img");

zoomInButton.addEventListener("click", zoomIn);
ZoomOutButton.addEventListener("click", zoomOut);

rightButton.addEventListener("click", moveRight);
leftButton.addEventListener("click", moveLeft);
upButton.addEventListener("click", moveUp);
downButton.addEventListener("click", moveDown);

document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mouseup", handleMouseUp);
document.addEventListener("dblclick", handleDblClick);
window.addEventListener("resize", resizeFrame); //will need to center location accordingly?

window.onload = function () {
  //adjust for current window size
  resizeFrame();

  // center map
  x = -(images[currImg].width / 2) + frameMiddleX;
  y = -(images[currImg].height / 2) + frameMiddleY;
  updateMap(x, y);
  for (let i = 0; i <= 3; i++) {
    loadedImgs[i] = new Image(images[i].width, images[i].height)
    loadedImgs[i].src = images[i].name
  }
};

// Adjusts necessary measurements when window is resized
function resizeFrame() {
  frameBorderWidth = +getComputedStyle(mapFrame).borderWidth.slice(0, -2); // Get border width by splicing "[size]px" and converting to a number
  let rect = mapFrame.getBoundingClientRect();
  imageTop = rect.top + frameBorderWidth;
  imageLeft = rect.left + frameBorderWidth;
  imageBottom = rect.bottom - frameBorderWidth;
  imageRight = rect.right - frameBorderWidth;

  //these equal half of the frame size. 
  frameMiddleX = (imageRight - imageLeft) / 2;
  frameMiddleY = (imageBottom - imageTop) / 2;
}
function moveRight() {
  x -= frameMiddleX;
  img.style.left = x + "px";
}
function moveUp() {
  y += frameMiddleY;
  img.style.top = y + "px";
}
function moveLeft() {
  x += frameMiddleX;
  img.style.left = x + "px";
}
function moveDown() {
  y -= frameMiddleY;
  img.style.top = y + "px";
}
function handleMouseDown(e) {
  if (mapClicked(e)) {
    isDragging = true;
  }
}

// returns true and disables default click events if there is a left click on the map
function mapClicked(e) {
  let currScrollX = window.scrollX;
  let currScrollY = window.scrollY;
  if (
    e.button === 0 &&
    imageLeft - currScrollX <= e.x &&
    e.x <= imageRight - currScrollX &&
    imageTop - currScrollY <= e.y &&
    e.y <= imageBottom - currScrollY
  ) {
    e.preventDefault();
    return true;
  }
  return false;
}

function handleMouseUp() {
    document.body.style.cursor = "";
  isDragging = false;
}
function handleMouseMove(e) {
  if (isDragging) {
    document.body.style.cursor = "move";
    x += e.movementX;
    y += e.movementY;
    updateMap(x, y);
  }
}

// Center the map where there is a double click. Works regardless of page zoom level
function handleDblClick(e) {
  if (mapClicked(e)) {
    x += -e.pageX + imageLeft + frameMiddleX;
    y += -e.pageY + imageTop + frameMiddleY;
    updateMap(x, y);
  }
}

function zoomIn() {
  if (currImg < 3) {
    // Multiply by respective image size ratios
    x = (x - frameMiddleX) * images[currImg].ratioUp + frameMiddleX;
    y = (y - frameMiddleY) * images[currImg].ratioUp + frameMiddleY;
    currImg++;  // Go to next image
    img.src = images[currImg].name;
    updateMap(x, y);
  }
}
function zoomOut() {
  if (currImg > 0) {
    // Multiply by respective image size ratios
    x = (x - frameMiddleX) * images[currImg].ratioDown + frameMiddleX;
    y = (y - frameMiddleY) * images[currImg].ratioDown + frameMiddleY;
    currImg--;  // Go to prev image
    img.src = images[currImg].name;
    updateMap(x, y);
  }
}
function updateMap(x, y) {
  img.style.left = x + "px";
  img.style.top = y + "px";
}
