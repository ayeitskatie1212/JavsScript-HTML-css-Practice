let updateButton = document.getElementById("updateButton");
let deleteButton = document.getElementById("deleteButton");
let xBox = document.getElementById("xBox");
let yBox = document.getElementById("yBox");
let width = document.getElementById("width");
let height = document.getElementById("height");
let body = document.getElementById("body");
let colorSelect = document.getElementById("colorSelect");

let clickedOnce = false;
let rectExists = false;
let rect = undefined;
let topX = undefined;
let topY = undefined;
let bottomX = undefined;
let bottomY = undefined;
window.onload = function() {
    colorSelect.value = "white"
} 

updateButton.addEventListener("click", updateRect);
deleteButton.addEventListener("click", deleteRect);
document.addEventListener("mousedown", drawRect);

function drawRect(e) {
  if (!rectExists) {
    if (!clickedOnce) {
      topX = e.clientX;
      topY = e.clientY;
      clickedOnce = true;
    } else {
      bottomX = e.clientX;
      bottomY = e.clientY;
      console.log(topX, topY, bottomX, bottomY);
      x = topX
      y = topY
      if (bottomX < topX) {
        x = bottomX
      }
      if (bottomY < topY) {
        y = bottomY
      }
      rect = document.createElement("div");
      rect.style.border = "1px black solid";
      let width = bottomX - topX;
      let height = bottomY - topY;
      if (width < 0) {
        width *= -1
      }
      if (height < 0) {
        height *= -1
      }
      rect.style.position = "absolute";
      rect.style.top = y + "px";
      rect.style.left = x + "px";
      rect.style.width = width + "px";
      rect.style.height = height + "px";
      console.log(rect);
      body.appendChild(rect);
      rect.style.zIndex = "-1";
      rectExists= true;
      xBox.value = x
      yBox.value = y
      widthBox.value = width
      heightBox.value = height
      colorSelect.value = "white"
    }
  }
}

function updateRect() {
  if (rectExists) {
    x = +xBox.value;
    y = +yBox.value;
    let width = +widthBox.value;
    let height = +heightBox.value;
    rect.style.width = width + "px";
    rect.style.height = height + "px";
    rect.style.left = x + "px";
    rect.style.top = y + "px";
    rect.style.backgroundColor = colorSelect.value
  }
}

function deleteRect() {
  rect.remove();
  rect = undefined;
  clickedOnce = false;
  rectExists = false;
  xBox.value = ""
  yBox.value = ""
  widthBox.value = ""
  heightBox.value = ""
  
}
