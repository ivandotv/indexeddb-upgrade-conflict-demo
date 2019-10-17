import "./main.css"
import "bootstrap/js/dist/modal"
import "bootstrap/dist/css/bootstrap.min.css"
import $ from "jquery"

// to test the demo increase the version and then open the new tab in the same browser
const version = 1
const dbName = "testing"
let db = null

//status field for appending text
const statusEl = document.querySelector("#status")

writeStatus("Init app")
writeStatus("Open Database")

// open the connection to the database
let openRequest = indexedDB.open(dbName, version)

openRequest.onsuccess = function(event) {
  // store the result of opening the database in the db variable.
  db = openRequest.result
  writeStatus("Database opened.")
  writeStatus(`Database version: ${db.version}`)

  // add listener to handle database version change
  db.onversionchange = function() {
    writeStatus("Database is outdated, please reload the page.")

    //!important when version change is detected close database immediately
    db.close()
    // instruct user to reload the page via popup
    launchPopup($newVersionPopupContent)
  }
}

openRequest.onerror = function(event) {
  console.log(`on error`)

  writeStatus("Error loading database.")
}

openRequest.onblocked = function() {
  // there's another open connection to the same database
  // and it hasn't been closed after db.onversionchange was triggered
  writeStatus("Database upgrade blocked")
  launchPopup($closeOtherTabsPopupContent)
}

openRequest.onupgradeneeded = function() {
  // triggers if the client has no database (first time on the site)
  // OR database has been deleted via browser developer tools
  // OR new version of the database is being used

  // create your new object schema here
  // db.createObjectStore('todos', {keyPath: 'id'});

  writeStatus("Upgrading database")
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
function writeStatus(data) {
  statusEl.innerHTML += `<li>${data}</li>`
  console.log(data)
}
/* Popup handling code */
const $newVersionPopupContent = $("#new-version")
const $closeOtherTabsPopupContent = $("#close-tab")
