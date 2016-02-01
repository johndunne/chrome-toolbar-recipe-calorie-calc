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
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.method == "getSelection") {
        sendResponse({data: window.getSelection().toString(), recipe_url: document.URL});
    }else
        sendResponse({}); // Not interested
    return true;
});

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
    return x;
  }
  return null;
}

