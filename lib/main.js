var contextMenu = require("sdk/context-menu");
var menuItem = contextMenu.Item({
    label: "Parse ingredients!",
    context: contextMenu.SelectionContext(),
    contentScript: 'self.on("click", function () {' +
    '  var text = window.getSelection().toString();' +
    '  self.postMessage(text);' +
    '});',
    image: self.data.url("images/icon.png"),
    onMessage: function (selectionText) {
        console.log(selectionText);
    }
});

console.log("asd");
