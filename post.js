/**
 * Created by johndunne on 29/01/2016.
 */
chrome.runtime.sendMessage({john:"John"}, function(response) {
    console.log(response);
    onMessageHandler(response,false,false);
});

var onMessageHandler = function(sender,request,sendResponse){
    if(sender && sender.data) {
        // Ensure it is run only once, as we will try to message twice
        chrome.runtime.onMessage.removeListener(onMessageHandler);

        // code from http://stackoverflow.com/a/7404033/934239
        if (sender.data["recipe_url"]) {
            var recipe_url = document.getElementById("recipe_url");
            recipe_url.innerHTML = sender.data["recipe_url"];
        }
        var pre = document.getElementById("ingredients")
        pre.innerHTML = "<pre>" + sender.data["ingredients"] + "</pre>";

        var form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", sender.url);
        for (var key in sender.data) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", sender.data[key]);
            form.appendChild(hiddenField);
        }
        document.body.appendChild(form);
        //form.submit();
    }
    return true;
}
chrome.runtime.onMessage.addListener(onMessageHandler);
