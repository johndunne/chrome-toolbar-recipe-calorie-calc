// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Global accessor that the popup uses.
var addresses = {};
var selectedRecipe = null;
var selectedId = null;
var uniqueUserID = null;
var apiKey = null;
var currentIngredientBoxContent = "";
var currentRecipeName = "";
var currentRecipePortions = 0;
var application_name = "chrome-toolbar";
//chrome.storage.sync.remove('userid',function(i){console.error(i)});

chrome.storage.sync.get('userid', function(items) {
    var userid = items.userid;
    if (userid) {
        useToken(userid);
    }
});
function useToken(userid) {
    uniqueUserID = userid;
}
chrome.storage.sync.get('apikey', function(items) {
    var api_key = items.apikey;
    if (api_key) {
        apiKey = api_key;
    }
});

chrome.storage.sync.get('currentIngredientBoxContent', function(items) {
  currentIngredientBoxContent = items.currentIngredientBoxContent;
});
chrome.storage.sync.get('currentRecipeName', function(items) {
  currentRecipeName = items.currentRecipeName;
});
chrome.storage.sync.get('currentRecipePortions', function(items) {
  currentRecipePortions = items.currentRecipePortions;
});

//chrome.browserAction.setBadgeText({text: "yeah"});
var saveGuestID= function(guest_id){
    chrome.storage.sync.set({userid: guest_id}, function() {
        uniqueUserID=guest_id;
        apiKey = null;
    });
};
var signout= function(){
    chrome.storage.sync.remove("userid", function() {
    });
    chrome.storage.sync.remove("apikey", function() {
    });
};

var saveApiKey = function(api_key){
    chrome.storage.sync.set({apikey: api_key}, function() {
        uniqueUserID=null;
        apiKey = api_key;
    });
};

function saveApiKey(api_key) {
    chrome.storage.sync.set({apikey: api_key}, function () {
        console.log("Set!");
        console.log(api_key);
        apiKey = api_key;
    });

}
function updateRecipe(tabId) {
  chrome.tabs.sendRequest(tabId, {}, function(recipe_url) {
    if(recipe_url){
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
}

function updateSelected(tabId) {
  selectedRecipe = addresses[tabId];
  if (selectedRecipe){
    chrome.storage.sync.get('userid', function(items) {
      var userid = items.userid;
      if (userid) {
        useToken(userid);
      } else {
        userid = getRandomToken();
        chrome.storage.sync.set({userid: userid}, function() {
            useToken(userid);
        });
      }
      function useToken(userid) {
        uniqueUserID = userid;
      }
    });
    chrome.pageAction.setTitle({tabId:tabId, title:selectedRecipe});
  }
}

function saveRecipeNameContent( content ){
    currentRecipeName = content;
    chrome.storage.sync.set({currentRecipeName: content}, function() {
      console.log("Saved");
    });
}

function saveRecipePortionsContent( content ){
    currentRecipePortions = content;
      console.log(content);
    chrome.storage.sync.set({currentRecipePortions: content}, function() {
      console.log("Saved");
    });
}

function saveIngredientsContent( content ){
    currentIngredientBoxContent = content;
    chrome.storage.sync.set({currentIngredientBoxContent: content}, function() {
      console.log("Saved");
    });
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

chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
  if (change.status == "complete") {
    updateRecipe(tabId);
  }
});

chrome.tabs.onSelectionChanged.addListener(function(tabId, info) {
  selectedId = tabId;
  updateSelected(tabId);
});

// Ensure the current selected tab is set up.
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  updateRecipe(tabs[0].id);
});

chrome.extension.onRequest.addListener(function(request, sender) {
    console.log("asd");
    chrome.tabs.update(sender.tab.id, {url: request.redirect});
});