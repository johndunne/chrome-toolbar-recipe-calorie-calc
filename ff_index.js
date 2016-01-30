/**
 * Created by johndunne on 30/01/2016.
 */
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var button = buttons.ActionButton({
    id: "mozilla-link",
    label: "Visit Mozilla",
    icon: {
        "16": "./icon.png",
        "32": "./icon.png",
        "64": "./icon.png"
    },
    onClick: handleClick
});

function handleClick(state) {
    tabs.open("https://www.mozilla.org/");
}

var contextMenu = require("sdk/context-menu");
var menuItem = contextMenu.Item({
    label: "Parse ingredients",
    context: contextMenu.SelectionContext(),
    contentScript: 'self.on("click", function () {' +
    '  var text = window.getSelection().toString();' +
    '  self.postMessage(text);' +
    '});',
    image: self.data.url("icon.png"),
    onMessage: function (selectionText) {
        console.log(selectionText);
    }
});

/**
 * The context menu
 */
var data = require("sdk/self").data;
// Construct a panel, loading its content from the "text-entry.html"
// file in the "data" directory, and loading the "get-text.js" script
// into it.
var text_entry = require("sdk/panel").Panel({
    contentURL: data.url("text-entry.html"),
    contentScriptFile: data.url("get-text.js")
});

// Create a button
buttons.ActionButton({
    id: "show-panel",
    label: "Show Panel",
    icon: {
        "16": "./icon-16.png",
        "32": "./icon-32.png",
        "64": "./icon-64.png"
    },
    onClick: handleButtonClick
});

// Show the panel when the user clicks the button.
function handleButtonClick(state) {
    text_entry.show();
}

// When the panel is displayed it generated an event called
// "show": we will listen for that event and when it happens,
// send our own "show" event to the panel's script, so the
// script can prepare the panel for display.
text_entry.on("show", function() {
    text_entry.port.emit("show");
});

// Listen for messages called "text-entered" coming from
// the content script. The message payload is the text the user
// entered.
// In this implementation we'll just log the text to the console.
text_entry.port.on("text-entered", function (text) {
    console.log(text);
    text_entry.hide();
});