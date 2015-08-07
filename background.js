// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Global accessor that the popup uses.
var addresses = {};
var selectedRecipe = null;
var selectedId = null;
var uniqueUserID = null;

function updateRecipe(tabId) {
  console.log("updateRecipe:" + tabId);
  console.log(addresses[tabId]);
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
  console.log("updateSelected:" + tabId);
  console.log(addresses[tabId]);
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
        console.log( "user  bg id = " + userid);
      }
    });

    chrome.pageAction.setTitle({tabId:tabId, title:selectedRecipe});
  }
}
function getRandomToken() {
    // E.g. 8 * 32 = 256 bits token
    var randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
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
