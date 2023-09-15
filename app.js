import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
    let foodItems = Object.values(snapshot.val())
    
    clearList()

    for (let i = 0; i < foodItems.length; i++) {
        let item = foodItems[i]
        appendToList(item)
    }
})

function clearList() {
    ulEl.innerHTML = ""
}
function clearInputField() {
    inputEl.value = ""
}
function appendToList(value) {
    ulEl.innerHTML += `<li>${value}</li>`
}