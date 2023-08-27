"use strict";
var photoArray = [
    {filename: "memchu.jpg",
     caption: "Stanford Memorial Church - the church used to have an 80' bell tower, which fell in the 1906 earthquake."},
    {filename: "quad.jpg",
     caption: "The Stanford Quad"},
    {filename: "hoop.jpg",
     caption: "The <i>Red Hoop Fountain</i> with Green Library in the background."},
    {filename: "memorial-court.jpg",
     caption: "Memorial Court (in the front of the Quad) with Rodin's <i>Burghers of Calais</i> statues."},
    {filename: "gates.jpg",
     caption: "The Gates Building - home of Stanford Computer Science."},
    {filename: "stone-river.jpg",
     caption: "The Stone River statue near the Cantor Arts Center (Stanford's own art museum)."},
];

let photoSection = document.getElementById("photoSection")
let rightButton = document.getElementById("forwardOverlay")
let leftButton = document.getElementById("backwardOverlay")
let photo = document.getElementById("photo")
let caption = document.getElementById("caption")
let currIndex = 0
let numPhotos = photoArray.length

leftButton.addEventListener("click", displayPrevPhoto, false)
rightButton.addEventListener("click", displayNextPhoto, false)
window.onload = () => resizeWindow()
window.addEventListener("resize",resizeWindow,false);


function displayPrevPhoto() {
    currIndex -= 1
    if (currIndex <= -1) {
        currIndex = numPhotos - 1
    }
    photo.src = photoArray[currIndex].filename
    caption.innerHTML = photoArray[currIndex].caption
}
function displayNextPhoto() {
    currIndex += 1
    if (currIndex >= numPhotos) {
        currIndex = 0
    }
    photo.src = photoArray[currIndex].filename
    caption.innerHTML = photoArray[currIndex].caption
}
function resizeWindow() {
    let w = window.innerWidth
    let h = window.innerHeight
    console.log(h)
    let topMargin = (h - 600) / 2
    let leftMargin = (w - 800) / 2
    photoSection.style.left = leftMargin + "px"
    photoSection.style.top = topMargin + "px"
}

