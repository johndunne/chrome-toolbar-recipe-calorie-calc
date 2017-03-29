// The background page is asking us to find an address on the page.
if (window == top) {
    if (chrome.extension.onRequest) {
        chrome.extension.onRequest.addListener(function (req, sender, sendResponse) {
            sendResponse(findRecipe());
        });
    }
}

if ( document.URL.indexOf("feastmachine.com") >=0 ){
    // Add a script to the head that will init the initRecipeCalCalc method for the caloriemash page
    chrome.runtime.sendMessage({method: "id-data"}, function(response) {
        if ( response ) {
            var elementa = document.createElement("script");
            elementa.src="/js/caloriemash.fb.js";
            (document.head ? document.head : document.documentElement).appendChild(elementa);

            var element = document.createElement("script");
            if (response.userId) {
                element.innerHTML = 'var RecipeCalCalc={userId:"' + response.userId + '"};';
            }else if (response.apiKey) {
                element.innerHTML = 'var RecipeCalCalc={apiKey:"' + response.apiKey + '"};';
            } else {
                element.innerHTML = 'var RecipeCalCalc={};';
            }
            element.innerHTML += 'doFacebookSignup(RecipeCalCalc.userId);';

            if(document.head){
                console.log("head");
            }else{
                console.log("element");
            }
            (document.head ? document.head : document.documentElement).appendChild(element);

            var element2 = document.createElement("script");
            element2.src="/js/recipeEngine.js";
            (document.head ? document.head : document.documentElement).appendChild(element2);


        }else{
            console.error("No response!");
        }
    });
//}else{
//    console.error("document.URL isn' caloriemash");
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("Received get selection message");
    console.log(request);
    if (request.method == "getSelection") {
        sendResponse({data: window.getSelection().toString(), recipe_url: document.URL});
    }else if (request.method == "getLocalAppIds") {
        sendResponse({api_key: _getLocalApiId(), user_id: _getLocalUserId(), recipe_url: document.URL});
    }else if (request.method == "getSource") {
        sendResponse({source: DOMtoString(document), recipe_url: document.URL});
    }else {
        sendResponse({}); // Not interested
    }
    return true;
});

function walkTheDOM(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walkTheDOM(node, func);
        node = node.nextSibling;
    }
}

function DOMtoString(document_root) { // TODO URGENT Don't spit out <script> which is not interesting for the parser
    //walkTheDOM(d.firstChild, function (node) { if (node.nodeType === Node.ELEMENT_NODE) { if (node.outerHTML && node.outerHTML.indexOf("<script")==0 ){ console.log(node); } } });
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
            case Node.ELEMENT_NODE:
                html += node.outerHTML;
                break;
            case Node.TEXT_NODE:
                html += node.nodeValue;
                break;
            case Node.CDATA_SECTION_NODE:
                html += '<![CDATA[' + node.nodeValue + ']]>';
                break;
            case Node.COMMENT_NODE:
                html += '<!--' + node.nodeValue + '-->';
                break;
            case Node.DOCUMENT_TYPE_NODE:
                // (X)HTML documents are identified by public identifiers
                html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
                break;
        }
        node = node.nextSibling;
    }
    /*var source_html="";
    var ignore=false;
    try {
        html.split("\n").forEach(function (e) {
            if (ignore && e.indexOf("</head>") >= 0) {
                e = e.replace("</head>", "");
                ignore = false;
            }
            if (e.indexOf("<head>") >= 0) {
                e = e.replace("<head>", "");
                ignore = true;
            }
            if (!ignore) {
                source_html += e;
            }
        });
    }catch(e){
        return html;
    }
    return source_html;*/
    return html;
}

// This is useful for debugging
//chrome.runtime.sendMessage({
//    action: "getSource",
//    source: DOMtoString(document)
//});

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
