// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var globalID = null;

// The background page is asking us to find an address on the page.
if (window == top) {
    if(chrome.extension.onRequest) {
        chrome.extension.onRequest.addListener(function (req, sender, sendResponse) {
            sendResponse(findRecipe());
        });
    }

    if(chrome.storage) {
        chrome.storage.sync.get('userid', function (items) {
            var userid = items.userid;
            if (userid) {
                useToken(userid);
            } else {
                userid = getRandomToken();
                chrome.storage.sync.set({userid: userid}, function () {
                    useToken(userid);
                });
            }
            function useToken(userid) {
                globalID = userid;
            }
        });
    }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.method == "getSelection") {
        sendResponse({data: window.getSelection().toString(), recipe_url: document.URL});
    } else if (request.method == "postForm") {
        console.log("Psting?");
        console.log("Psting!");
        // Ensure it is run only once, as we will try to message twice
        chrome.runtime.onMessage.removeListener(onMessageHandler);

        // code from http://stackoverflow.com/a/7404033/934239
        if (request.data["recipe_url"]) {
            var recipe_url = document.getElementById("recipe_url");
            recipe_url.innerHTML = request.data["recipe_url"];
        }
        var pre = document.getElementById("ingredients")
        pre.innerHTML = "<pre>" + request.data["ingredients"] + "</pre>";

        var form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", request.url);
        for (var key in request.data) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", request.data[key]);
            form.appendChild(hiddenField);
        }
        document.body.appendChild(form);
        form.submit();
    }
    else
        sendResponse({}); // Not interested
    return true;
});

function getRandomToken() {
    // E.g. 8 * 32 = 256 bits token
    var randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    return hex;
}

var findRecipe = function() {
  var x = document.URL;
  var supported_sites = ["101cookbooks.com","12tomatoes.com","/^\w+\.about\.com$/","/^(m\.)?allrecipes.com$/","americastestkitchen.com","bbcgoodfood.com","bbc.co.uk","bhg.com","bigoven.com","bonappetit.com","bravotv.com","chow.com","cooking.com","cookingchanneltv.com","cooks.com","eatingwell.com","elanaspantry.com","epicurious.com","food.com","food52.com","foodandwine.com","foodnetwork.com","foodnetwork.co.uk","kingarthurflour.com","marthastewart.com","myrecipes.com","nytimes.com","pillsbury.com","realsimple.com","recipe.com","saveur.com","seriouseats.com","simplyrecipes.com","skinnytaste.com","recipes.sparkpeople.com","tasteofhome.com","thedailymeal.com","thekitchn.com"];

  var done = false;
  supported_sites.forEach(function (site){
    if( x.indexOf(site) > 0 ){
      done = true;
    }
  });

  if( done ){
    console.log("Supported site : " + x );
    return x;
  }
  return null;
}

