import "./main.css"
import "bootstrap/js/dist/modal"
import "bootstrap/dist/css/bootstrap.min.css"
import $ from "jquery"
const dbName = "testing"
// increase the version and then open the new tab in the same browser
const version = 1
let db = null

//status field for appending text
const statusEl = document.querySelector("#status")

appendToStatus("Init app")
appendToStatus("Open Database")
let openRequest = indexedDB.open(dbName, version)

openRequest.onsuccess = function(event) {
  // store the result of opening the database in the db variable.
  db = openRequest.result
  appendToStatus("Database opened.")
  appendToStatus(`Database version: ${db.version}`)

  // handle database version change
  db.onversionchange = function() {
    appendToStatus("Database is outdated, please reload the page.")

    //!important when version change is detected close database immediately
    db.close()
    // instruct user to reload the page via popup
    launchPopup($newVersionPopupContent)
  }
}

openRequest.onerror = function(event) {
  console.log(`on error`)

  appendToStatus("Error loading database.")
}

openRequest.onblocked = function() {
  // there's another open connection to the same database
  // and it hasn't been closed after db.onversionchange was triggered
  appendToStatus("Database upgrade blocked")
  launchPopup($closeOtherTabsPopupContent)
}

openRequest.onupgradeneeded = function() {
  // triggers if the client has no database - first time on the site
  // or database has been deleted via browser developer tools

  // modify - create object stores here
  // db.createObjectStore('todos', {keyPath: 'id'});

  appendToStatus("Upgrading database")
}

//launch notification modal
function launchPopup(contentEl) {
  $("#myModal")
    .find(".modal-dialog")
    .empty()
    .append(contentEl.removeClass("invisible"))
  $("#myModal").modal({
    keyboard: false,
    backdrop: "static"
  })
}

// helper function for writing to dom nodes
function appendToStatus(data) {
  statusEl.innerHTML += `<li>${data}</li>`
  console.log(data)
}
/* Popup handling code */
const $newVersionPopupContent = $("#new-version")
const $closeOtherTabsPopupContent = $("#close-tab")
