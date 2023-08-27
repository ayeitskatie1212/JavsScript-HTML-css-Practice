let entryName = document.getElementById("entryName")
let entryCategory = document.getElementById("entryCategory")
let entryAmount = document.getElementById("entryAmount")
let entryButton = document.getElementById("entryButton")
let lookupName = document.getElementById("lookupName")
let lookupCategory = document.getElementById("lookupCategory")
let lookupButton = document.getElementById("lookupButton")
let resultsBox = document.getElementById("results")

let storedItems = [
    {name: "Desk", category: "Furniture", amount: 1},
    {name: "Chair", category: "Furniture", amount: 3},
    {name: "Laptop", category: "Equipment", amount: 4},
    {name: "Stapler", category: "Supplies", amount: 3},
]

entryButton.addEventListener("click", addItem)
lookupButton.addEventListener("click", lookupItems)

function lookupItems() {
    clearResults()
    let name = lookupName.value
    let category = lookupCategory.value
    let itemFound = false
    for (let i = 0; i < storedItems.length; i++) {
        let currItem = storedItems[i]
        if ((!name || (name ===currItem.name)) && (!category || (category ===currItem.category))){
            let span = document.createElement("li")
            span.innerHTML = currItem.name + ", category: " +currItem.category + ", amount: " + currItem.amount
            resultsBox.appendChild(span)
            itemFound = true
        }
    }
    if (!itemFound) {
        let span = document.createElement("span")
        span.innerHTML = "No matching items"
        resultsBox.appendChild(span)
    }
}

function clearResults() {
    let numChildren = resultsBox.children.length
    for (let i = numChildren - 1; i >= 0; i--) {
        resultsBox.children[i].remove()
    }
}




function addItem() {
    console.log("CLICKED")
    let name = entryName.value 
    let category = entryCategory.value
    let amount = +entryAmount.value
    let itemFound = false
    console.log(name, category, amount)
    for (let i = 0; i < storedItems.length; i++){
        let currItem = storedItems[i]
        if (currItem.name === name && currItem.category === category) {
            itemFound = true
            currItem.amount += amount
            break
        }
    }
    if (!itemFound) {
        storedItems.push({name: name, category: category, amount: amount})
    }
    console.log(storedItems)
}
