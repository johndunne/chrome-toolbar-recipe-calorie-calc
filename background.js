// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Global accessor that the popup uses.
var addresses = {};
var selectedRecipe = null;
var selectedId = null;
var currentIngredientBoxContent = "";
var currentRecipeName = "";
var currentRecipePortions = 0;
var debugMode=isDevMode();
var userId = false;
var apiKey = false;

 // The code below is sample code for enabling right click features in a plugin
// See: https://developer.chrome.com/extensions/contextMenus#type-ContextType
parseCalorieMash = function(word){
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {method: "getSelection"},
            function (response) {
                if(response) {
                    if(debugMode)console.log("Got response:");
                    if(debugMode)console.log(response);
                    var query = response.data;
                    var recipe_url = response.recipe_url; // The recipe_url can help provide recipe name, and
                    postData("https://feastmachine.com/calorie-calculator", {
                        "ingredients": query,
                        "recipe_url": recipe_url
                    });
                }else{
                    console.error("There's no onMessage listener attached to the tab!");
                }
            });
    });
};

function utf8_to_b64( str ) {
    return window.btoa(unescape(encodeURIComponent( str )));
}

function b64_to_utf8( str ) {
    return decodeURIComponent(escape(window.atob( str )));
}

sourceCalorieMash = function(word){
    if(debugMode)console.log("Received parse request");
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        if (debugMode)console.log("The current tab is:");
        if (debugMode)console.log(tabs[0]);
        if (debugMode)console.log("Sending message to current tab:");
        chrome.tabs.sendMessage(tabs[0].id, {method: "getSource"},
            function (response) {
                if (response) {
                    // We're potentially handling senstive information here, since we're seeing what the
                    // browser sees. This is important since many recipe manager sites are being user
                    // signed pages. So, the recipe server can't parse those pages. We send only to extract
                    // the ingredients and recipe title/description. Nothing else is recorded on the remote end.
                    if (debugMode)console.log("Got response:");
                    if (debugMode && response.source)console.log("Page source is " + response.source.length + " chars long.");
                    var query = response.source;
                    var b64 = utf8_to_b64(query);
                    var recipe_url = response.recipe_url; // The recipe_url can help provide recipe name, and
                    postData("https://feastmachine.com/calorie-calculator", {
                        "page_source_b": b64,
                        "recipe_url": recipe_url
                    });
                } else {
                    console.error("There's no onMessage listener attached to the tab!");
                }
            });
    });
};

var latestIngredientsParsingData = false;

var onIngreidentsParseMessageHandler = function(request,sender,sendResponse){
    console.error("Received message");
    console.error(request);
    if (request.method=="id-data"){
        console.error("sending data");
        sendResponse({userId:userId,apiKey:apiKey});
    }else {
        sendResponse(latestIngredientsParsingData);
    }
};

chrome.runtime.onMessage.addListener(onIngreidentsParseMessageHandler);

function postData(url, data) {
    latestIngredientsParsingData = {url: url, data: data, method: "postForm"};
    chrome.tabs.create(
        { url: chrome.runtime.getURL("post.html") },
        function(tab) {
            var handler = function(tabId, changeInfo) {
                if(tabId === tab.id && changeInfo.status === "complete") {
                    chrome.tabs.onUpdated.removeListener(handler);
                    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, latestIngredientsParsingData);
                    });
                }
            };
            // in case we're faster than page load (usually):
            chrome.tabs.onUpdated.addListener(handler);
            // just in case we're too late with the listener:
            chrome.tabs.sendMessage(tab.id, {url: url, data: data});
        }
    );
}

function isDevMode() {
    return !('update_url' in chrome.runtime.getManifest());
}

chrome.contextMenus.create({
    title: "Parse ingredients (new tab)",
    contexts:["selection"],  // ContextType
    onclick: parseCalorieMash // A callback function
});

if(chrome.storage.local) {
    chrome.storage.local.get('currentIngredientBoxContent', function (items) {
        currentIngredientBoxContent = items.currentIngredientBoxContent;
    });
    chrome.storage.local.get('currentRecipeName', function (items) {
        currentRecipeName = items.currentRecipeName;
    });
    chrome.storage.local.get('currentRecipePortions', function (items) {
        currentRecipePortions = items.currentRecipePortions;
    });
}else{ // Must be firefox
    var ss = require("sdk/simple-storage");
    console.log(ss);
    currentRecipePortions = ss.storage.currentRecipePortions;
    currentIngredientBoxContent = ss.storage.currentIngredientBoxContent;
    currentRecipeName = ss.storage.currentRecipeName;

}
//chrome.browserAction.setBadgeText({text: "yeah"});
/*function updateRecipe(tabId) {
  chrome.tabs.sendRequest(tabId, {}, function(recipe_url) {
      if (recipe_url) {
          console.log("updateRecipe->: recipe_url:" + recipe_url);
          addresses[tabId] = recipe_url;
          if (!recipe_url) {
              chrome.pageAction.hide(tabId);
          } else {
              chrome.pageAction.show(tabId);
              if (selectedId == tabId) {
                  updateSelected(tabId);
              }
          }
      }
  });
}*/

/*function updateSelected(tabId) {
    selectedRecipe = addresses[tabId];
    chrome.pageAction.setTitle({tabId:tabId, title:selectedRecipe});
}*/

function saveRecipeNameContent( content ){
    currentRecipeName = content;
    if(chrome.storage.local) {
        chrome.storage.local.set({currentRecipeName: content}, function () {
            console.log("Saved");
        });
    }else{//Must be firefox
        var ss = require("sdk/simple-storage");
        ss.storage.currentRecipeName=content;
    }
}

function saveRecipePortionsContent( content ){
    currentRecipePortions = content;
    if(chrome.storage.local) {
        chrome.storage.local.set({currentRecipePortions: content}, function () {
            console.log("Saved");
        });
    }else{//Must be firefox
        var ss = require("sdk/simple-storage");
        ss.storage.currentRecipePortions=content;
    }
}

function saveIngredientsContent( content ){
    currentIngredientBoxContent = content;
    if(chrome.storage.local) {
        chrome.storage.local.set({currentIngredientBoxContent: content}, function () {
            console.log("Saved");
        });
    }else{//Must be firefox
        var ss = require("sdk/simple-storage");
        ss.storage.currentIngredientBoxContent=content;
    }
}

function getRandomToken() {
    var randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    return hex;
}

/*if(chrome.tabs.onSelectionChanged) {
    chrome.tabs.onUpdated.addListener(function (tabId, change, tab) {
        if (change.status == "complete") {
            updateRecipe(tabId);
        }
    });
    chrome.tabs.onSelectionChanged.addListener(function (tabId, info) {
        selectedId = tabId;
        updateSelected(tabId);
    });
    // Ensure the current selected tab is set up.
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      updateRecipe(tabs[0].id);
    });

}*/

/*if(chrome.extension.onRequest) {
    chrome.extension.onRequest.addListener(function (request, sender) {
        chrome.tabs.update(sender.tab.id, {url: request.redirect});
    });
}*/
