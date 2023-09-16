import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-19ef3-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputEl = document.getElementById("input-field")
const addBtn = document.getElementById("add-button")
const ulEl = document.getElementById("shopping-list")

addBtn.addEventListener("click", function() {
    let inputValue = inputEl.value
    clearInputField()
    push(shoppingListInDB, inputValue)
})

onValue(shoppingListInDB, function(snapshot) {

    if (snapshot.exists()) {
        let foodItems = Object.entries(snapshot.val())

        clearList()
    
        for (let i = 0; i < foodItems.length; i++) {
            let currentItem = foodItems[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendToList(currentItem)
        }
    } else {
        ulEl.innerHTML = "No items here... yet"
    }
})

function clearList() {
    ulEl.innerHTML = ""
}
function clearInputField() {
    inputEl.value = ""
}
function appendToList(value) {
    let newEl = document.createElement("li")
    let itemID = value[0]
    let itemValue = value[1]
    newEl.textContent = itemValue

    newEl.addEventListener("dblclick", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    ulEl.append(newEl)
}