// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var debugMode=true;
var currentlyShowingView=false;

//https://raw.githubusercontent.com/fgnass/spin.js/master/spin.min.js
!function(a,b){"object"==typeof module&&module.exports?module.exports=b():"function"==typeof define&&define.amd?define(b):a.Spinner=b()}(this,function(){"use strict";function a(a,b){var c,d=document.createElement(a||"div");for(c in b)d[c]=b[c];return d}function b(a){for(var b=1,c=arguments.length;c>b;b++)a.appendChild(arguments[b]);return a}function c(a,b,c,d){var e=["opacity",b,~~(100*a),c,d].join("-"),f=.01+c/d*100,g=Math.max(1-(1-a)/b*(100-f),a),h=j.substring(0,j.indexOf("Animation")).toLowerCase(),i=h&&"-"+h+"-"||"";return m[e]||(k.insertRule("@"+i+"keyframes "+e+"{0%{opacity:"+g+"}"+f+"%{opacity:"+a+"}"+(f+.01)+"%{opacity:1}"+(f+b)%100+"%{opacity:"+a+"}100%{opacity:"+g+"}}",k.cssRules.length),m[e]=1),e}function d(a,b){var c,d,e=a.style;if(b=b.charAt(0).toUpperCase()+b.slice(1),void 0!==e[b])return b;for(d=0;d<l.length;d++)if(c=l[d]+b,void 0!==e[c])return c}function e(a,b){for(var c in b)a.style[d(a,c)||c]=b[c];return a}function f(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)void 0===a[d]&&(a[d]=c[d])}return a}function g(a,b){return"string"==typeof a?a:a[b%a.length]}function h(a){this.opts=f(a||{},h.defaults,n)}function i(){function c(b,c){return a("<"+b+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',c)}k.addRule(".spin-vml","behavior:url(#default#VML)"),h.prototype.lines=function(a,d){function f(){return e(c("group",{coordsize:k+" "+k,coordorigin:-j+" "+-j}),{width:k,height:k})}function h(a,h,i){b(m,b(e(f(),{rotation:360/d.lines*a+"deg",left:~~h}),b(e(c("roundrect",{arcsize:d.corners}),{width:j,height:d.scale*d.width,left:d.scale*d.radius,top:-d.scale*d.width>>1,filter:i}),c("fill",{color:g(d.color,a),opacity:d.opacity}),c("stroke",{opacity:0}))))}var i,j=d.scale*(d.length+d.width),k=2*d.scale*j,l=-(d.width+d.length)*d.scale*2+"px",m=e(f(),{position:"absolute",top:l,left:l});if(d.shadow)for(i=1;i<=d.lines;i++)h(i,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(i=1;i<=d.lines;i++)h(i);return b(a,m)},h.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}}var j,k,l=["webkit","Moz","ms","O"],m={},n={lines:12,length:7,width:5,radius:10,scale:1,corners:1,color:"#000",opacity:.25,rotate:0,direction:1,speed:1,trail:100,fps:20,zIndex:2e9,className:"spinner",top:"50%",left:"50%",shadow:!1,hwaccel:!1,position:"absolute"};if(h.defaults={},f(h.prototype,{spin:function(b){this.stop();var c=this,d=c.opts,f=c.el=a(null,{className:d.className});if(e(f,{position:d.position,width:0,zIndex:d.zIndex,left:d.left,top:d.top}),b&&b.insertBefore(f,b.firstChild||null),f.setAttribute("role","progressbar"),c.lines(f,c.opts),!j){var g,h=0,i=(d.lines-1)*(1-d.direction)/2,k=d.fps,l=k/d.speed,m=(1-d.opacity)/(l*d.trail/100),n=l/d.lines;!function o(){h++;for(var a=0;a<d.lines;a++)g=Math.max(1-(h+(d.lines-a)*n)%l*m,d.opacity),c.opacity(f,a*d.direction+i,g,d);c.timeout=c.el&&setTimeout(o,~~(1e3/k))}()}return c},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=void 0),this},lines:function(d,f){function h(b,c){return e(a(),{position:"absolute",width:f.scale*(f.length+f.width)+"px",height:f.scale*f.width+"px",background:b,boxShadow:c,transformOrigin:"left",transform:"rotate("+~~(360/f.lines*k+f.rotate)+"deg) translate("+f.scale*f.radius+"px,0)",borderRadius:(f.corners*f.scale*f.width>>1)+"px"})}for(var i,k=0,l=(f.lines-1)*(1-f.direction)/2;k<f.lines;k++)i=e(a(),{position:"absolute",top:1+~(f.scale*f.width/2)+"px",transform:f.hwaccel?"translate3d(0,0,0)":"",opacity:f.opacity,animation:j&&c(f.opacity,f.trail,l+k*f.direction,f.lines)+" "+1/f.speed+"s linear infinite"}),f.shadow&&b(i,e(h("#000","0 0 4px #000"),{top:"2px"})),b(d,b(i,h(g(f.color,k),"0 0 1px rgba(0,0,0,.1)")));return d},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}}),"undefined"!=typeof document){k=function(){var c=a("style",{type:"text/css"});return b(document.getElementsByTagName("head")[0],c),c.sheet||c.styleSheet}();var o=e(a("group"),{behavior:"url(#default#VML)"});!d(o,"transform")&&o.adj?i():j=d(o,"animation")}return h});

var current_recipe_url;
/*function formatNumbers(){
    $( "*" ).each(function(index){ 
      if($(this).attr('nut') !== undefined ){ 
        $(this).text(parseFloat($(this).text()).toFixed($(this).attr('nut')) );
      }
      if($(this).attr('changeable') !== undefined ){ 
        $(this).click(function(e){$(this).text("Change!");});
      }
  } );
}
*/

function _internalUpdateUIWithParsedIngredients(){
  var postData = $("#recipe_ingredients").val().split("\n");
  var options = {};
  if($("#recipe_portions").val()>0){
    options.portions = $("#recipe_portions").val();
  }

  //
  // Parse ingredient's results in the array of ingredients being POSTed to the recipe api server
  // and the results being parsed into a recipe object.
  parseIngredients(postData, options,function(recipe,error){
      if( recipe===false ){
          ShowGeneralError(error);
      }else {
          $('#nutrition-label').nutritionLabel( recipe );
          getTextTemplate("recipe-template", function (source) {
              var template = Handlebars.compile(source);
              var info = template(recipe);
              $('#parsed-ingredients-content').html(info);
          });
      }
  });
}

function utf8_to_b64( str ) {
    return window.btoa(unescape(encodeURIComponent( str )));
}

function b64_to_utf8( str ) {
    return decodeURIComponent(escape(window.atob( str )));
}

function map() {
    var initaliser = {scheme: "https", debug: false,enable_persistent_visitor:true,application_name:"CalorieMash chrome ext"};
    initRecipeCalCalc("recipecalcalc.com/api", initaliser,function(success,data){
        console.error(success);
        console.error(data);
        if(data) {
            chrome.extension.getBackgroundPage().userId = data.userId ? data.userId : false;
            chrome.extension.getBackgroundPage().apiKey = data.apiKey ? data.apiKey : false;
        }else{
            chrome.extension.getBackgroundPage().userId = false;
            chrome.extension.getBackgroundPage().apiKey = false;
        }
    });

    attachNoLongValidGuestIDHook(function(){chrome.extension.getBackgroundPage().signout();});

    if(!user_id&&!api_key){
        RequestGuestKey("caloremash-chrome",{}, function (success,data) {
            console.log(data);
            if(success){
                chrome.extension.getBackgroundPage().saveGuestID(data);
            }else{
                console.error("No internet!")
            }
        })
    }

    if( typeof Handlebars  != "undefined" ) {
        Handlebars.registerHelper('eachInMap', function (map, block) {
            var out = '';
            Object.keys(map).map(function (key) {
                out += block.fn({name: key, list: map[key]});
            });
            return out;
        });
        Handlebars.registerHelper('multiply', function (v1, v2) {
            return (v1 * v2);
        });
        Handlebars.registerHelper('divide', function (v1, v2, places) {
            if (!isNaN(places) && places > 0) {
                return (v1 / v2).toFixed(places);
            } else {
                return (v1 / v2);
            }
        });
        function contains(a, food_id) {
            for (var i = 0; i < a.length; i++) {
                if (a[i].nut_food_id == food_id) return true;
            }
            return false;
        }
        Handlebars.registerHelper('not', function (recipe_nutrition, block) {
            var out = '';
            recipe_nutrition.forEach(function (nutrition) {
                if (!contains(parsedFoods, nutrition.food_id)) {
                    out += block.fn({common_name: nutrition.common_name});
                }
            });
            return out;
        });
        Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
            switch (operator) {
                case '==':
                    return (v1 == v2) ? options.fn(this) : options.inverse(this);
                case '===':
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);
                case '<':
                    return (v1 < v2) ? options.fn(this) : options.inverse(this);
                case '<=':
                    return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                case '>':
                    return (v1 > v2) ? options.fn(this) : options.inverse(this);
                case '>=':
                    return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                case '&&':
                    return (v1 && v2) ? options.fn(this) : options.inverse(this);
                case '||':
                    return (v1 || v2) ? options.fn(this) : options.inverse(this);
                default:
                    return options.inverse(this);
            }
        });
        Handlebars.registerHelper('yes', function (recipe_nutrition, block) {
            var out = "";
            recipe_nutrition.forEach(function (nutrition) {
                if (contains(parsedFoods, nutrition.food_id)) {
                    out += block.fn({common_name: nutrition.common_name});
                }
            });
            return out;
        });
    }


    $(function ($) {
        function showParseIngredients() {
            getTextTemplate("empty-recipe-template", function (source) {
                $('#recipe-content').html(source);
                var target = document.getElementById('spinner')
                var spinner = new Spinner({radius: 10, length: 0, width: 10, color: '#000000', trail: 40}).spin(target);
            });

            getTextTemplate("parse-ingredients-template", function (source) {
                var template = Handlebars.compile(source);
                var info = template({});
                $('#recipe-content').html(info);

                $("#recipe_ingredients").html(chrome.extension.getBackgroundPage().currentIngredientBoxContent);
                $("#recipe_portions").val(chrome.extension.getBackgroundPage().currentRecipePortions);
                $("#recipe_name").val(chrome.extension.getBackgroundPage().currentRecipeName);

                $("#save-recipe").click(function () {
                    var recipe_object = {};
                    recipe_object.ingredients = $("#recipe_ingredients").val();
                    recipe_object.portions = $("#recipe_portions").val();
                    recipe_object.name = $("#recipe_name").val();
                    CreateRecipe(recipe_object, function (success, data_in) {
                        if (success === true) {
                            ShowMyRecipes();
                        } else {
                            ShowGeneralError(data_in);
                        }
                    });
                });
                if ($("#recipe_ingredients").val().length > 0) {
                    _internalUpdateUIWithParsedIngredients();
                }

                $("#recipe_name").keyup(function (e) {
                    chrome.extension.getBackgroundPage().saveRecipeNameContent($("#recipe_name").val());
                });

                $("#recipe_ingredients").keyup(function (e) {
                    chrome.extension.getBackgroundPage().saveIngredientsContent($("#recipe_ingredients").val());
                    chrome.extension.getBackgroundPage().saveRecipePortionsContent($("#recipe_portions").val());
                    chrome.extension.getBackgroundPage().saveRecipeNameContent($("#recipe_name").val());
                    _internalUpdateUIWithParsedIngredients();
                });
                $("#recipe_portions").keyup(function (e) {
                    chrome.extension.getBackgroundPage().saveIngredientsContent($("#recipe_ingredients").val());
                    chrome.extension.getBackgroundPage().saveRecipePortionsContent($("#recipe_portions").val());
                    chrome.extension.getBackgroundPage().saveRecipeNameContent($("#recipe_name").val());
                    var options = {};
                    if ($("#recipe_portions").val() > 0) {
                        options.portions = $("#recipe_portions").val();
                    }
                    //
                    // Refresh ingredient's results in the locally parsed recipe object being updarted with the new porttions value,
                    // and the local HTML page refreshing with the new values.
                    refreshIngredients(options, function (recipe, error) {
                        if(currentlyShowingView!=="show-parse-ingredients"){
                            return;
                        }

                        if (error) {
                            ShowGeneralError(error);
                        } else {
                            getTextTemplate("recipe-template", function (source) {
                                var template = Handlebars.compile(source);
                                var info = template(recipe);
                                $('#parsed-ingredients-content').html(info);
                            });
                        }
                    });
                });

                $("input[type='submit']").click(function () {
                    return false;
                });
                $("form").submit(function () {
                    return false;
                });

            });
        };
        function showParseUrl() {
            getTextTemplate("empty-recipe-template", function (source) {
                $('#recipe-content').html(source);
                var target = document.getElementById('spinner')
                var spinner = new Spinner({radius: 10, length: 0, width: 10, color: '#000000', trail: 40}).spin(target);
            });

            chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                if(debugMode)console.log("The current tab is:");
                if(debugMode)console.log(tabs[0]);
                if(debugMode)console.log("Sending message to current tab:");
                chrome.tabs.sendMessage(tabs[0].id, {method: "getSource"},
                    function (response) {
                        if(response) {
                            // We're potentially handling senstive information here, since we're seeing what the
                            // browser sees. This is important since many recipe manager sites are being user
                            // signed pages. So, the recipe server can't parse those pages. We send only to extract
                            // the ingredients and recipe title/description. Nothing else is recorded on the remote end.
                            if(debugMode)console.log("Got response:");
                            if(debugMode && response.source)console.log("Page source is " + response.source.length + " chars long.");
                            var query = response.source;
                            var b64 = utf8_to_b64( query );
                            var recipe_url = response.recipe_url; // The recipe_url can help provide recipe name, and
                            recipeCalCalcParseRecipePageBase64(recipe_url,b64,{nutritionLabel:{}},function(success,super_recipe) {
                                if(currentlyShowingView!=="parse-current-page"){
                                    console.log("Naved away from parse-current-page; " + currentlyShowingView);
                                    return;
                                }else{
                                }

                                if ( !success ){
                                    ShowGeneralError("No recipe information was found on the page. Try selecting the ingredients and then right clicking and choosing 'Parse ingredients'. <a href='mailto:support@caloriemash.com'>Contact support</a>");
                                    return;
                                }
                                getTextTemplate("parse-ingredients-template", function (source) {
                                //getTextTemplate("super-recipe-template", function (source) {
                                    var template = Handlebars.compile(source);
                                    var info = template({});
                                    $('#recipe-content').html(info);
                                    $('#nutrition-label').nutritionLabel( super_recipe );
                                    $("#recipe_ingredients").html(super_recipe.ingredients);
                                    $("#recipe_portions").val(super_recipe.portions);
                                    $("#recipe_name").val(super_recipe.name);
                                    getTextTemplate("recipe-template", function (source) {
                                        var template = Handlebars.compile(source);
                                        var info = template(super_recipe);
                                        $('#parsed-ingredients-content').html(info);
                                    });
                                    $("#save-recipe").click(function () {
                                        CreateRecipe(super_recipe, function (success, data_in) {
                                            if (success === true) {
                                                ShowMyRecipes();
                                            } else {
                                                ShowGeneralError(data_in);
                                            }
                                        });
                                    });
                                    //if ($("#recipe_ingredients").val().length > 0) {
                                    //    _internalUpdateUIWithParsedIngredients();
                                    //}

                                    $("#recipe_name").keyup(function (e) {
                                        chrome.extension.getBackgroundPage().saveRecipeNameContent($("#recipe_name").val());
                                    });

                                    $("#recipe_ingredients").keyup(function (e) {
                                        chrome.extension.getBackgroundPage().saveIngredientsContent($("#recipe_ingredients").val());
                                        chrome.extension.getBackgroundPage().saveRecipePortionsContent($("#recipe_portions").val());
                                        chrome.extension.getBackgroundPage().saveRecipeNameContent($("#recipe_name").val());
                                        _internalUpdateUIWithParsedIngredients();
                                    });
                                    $("#recipe_portions").keyup(function (e) {
                                        chrome.extension.getBackgroundPage().saveIngredientsContent($("#recipe_ingredients").val());
                                        chrome.extension.getBackgroundPage().saveRecipePortionsContent($("#recipe_portions").val());
                                        chrome.extension.getBackgroundPage().saveRecipeNameContent($("#recipe_name").val());
                                        var options = {};
                                        if ($("#recipe_portions").val() > 0) {
                                            options.portions = $("#recipe_portions").val();
                                        }
                                        //
                                        // Refresh ingredient's results in the locally parsed recipe object being updarted with the new porttions value,
                                        // and the local HTML page refreshing with the new values.
                                        refreshIngredients(options, function (recipe, error) {
                                            if (error) {
                                                ShowGeneralError(error);
                                            } else {
                                                getTextTemplate("recipe-template", function (source) {
                                                    var template = Handlebars.compile(source);
                                                    var info = template(recipe);
                                                    $('#parsed-ingredients-content').html(info);
                                                });
                                            }
                                        });
                                    });

                                    $("input[type='submit']").click(function () {
                                        return false;
                                    });
                                    $("form").submit(function () {
                                        return false;
                                    });

                                });
                            });
                        }else{
                            ShowGeneralError("Failed to start parse data. Try refreshing the page and returning here again.");
                            console.error("There's no onMessage listener attached to the tab!");
                        }
                    });
            });

        };
        currentlyShowingView="parse-current-page";
        showParseUrl();

        //
        // Setup the nav bar
        $("#clear-ingredients").click(function () {
            $("#recipe_ingredients").val("");
            $("#recipe_portions").val("");
            $("#recipe_name").val("");
            $("#parsed-ingredients-content").html("");
        });

        $("#parse-current-page").click(function () {
            currentlyShowingView="parse-current-page";
            showParseUrl();
        });

        $("#show-parse-ingredients").click(function () {
            currentlyShowingView="show-parse-ingredients";
            showParseIngredients();
        });

        $("#signin-button").click(function () {
            currentlyShowingView="signin-button";
            getTextTemplate("signin-template", function (source) {
                var template = Handlebars.compile(source);
                var info = template({});
                $('#recipe-content').html(info);
            });
        });
        $("#signup-button").click(performMyAccountAction);
        $("#load-my-recipes").click(function () {
            currentlyShowingView="load-my-recipes";
            ShowMyRecipes();
        });

    });
}

function FetchSingleRecipe(recipe_id){
    FetchSingleRecipeAPI( recipe_id ,{},function(success,recipe){
        if(success) {
            console.log(recipe);
            getTextTemplate("my-recipes-template", function (source) {
                var template = Handlebars.compile(source);
                var info = template({recipes:recipe});
                $('#recipe-content').html(info);
            });
            $('#recipe_error_message').text("");
        }else{
            ShowGeneralError("Failed to load your recipes. Connect to server error.");
        }
    });
}

function FetchRecipeSuperObject(recipe_id){
    FetchRecipeSuperObjectAPI( recipe_id ,{nutritionLabel:{}},function(success,recipe){
        if(success) {
            getTextTemplate("super-recipe-template", function (source) {
                var template = Handlebars.compile(source);
                var info = template(recipe);
                $('#recipe-content').html(info);
                $('#nutrition-label').nutritionLabel( recipe );
                $('#make-changes-button').click(function(e){
                    chrome.tabs.create({url: "https://caloriemash.com/my-recipe.html?recipe_id=" + recipe_id});
                });
                $('#export-html').click(function(){
                   var url = "https://recipecalcalc.com/api/recipe/" + recipe_id + "/nutrition-label/html";
                    chrome.tabs.create({url: url});
                });
                $('#export-csv').click(function(){
                    var url = "https://recipecalcalc.com/api/recipe/" + recipe_id + "/csv";
                    chrome.tabs.create({url: url});
                });
                $('#export-png').click(function(){
                    var url = "https://recipecalcalc.com/api/recipe/" + recipe_id + "/nutrition-label/png";
                    chrome.tabs.create({url: url});
                });
                $('#export-pdf').click(function(){
                    var url = "https://recipecalcalc.com/api/recipe/" + recipe_id + "/nutrition-label/pdf";
                    chrome.tabs.create({url: url});
                });
                $('#delete-recipe').click(function(){
                    var recipe_id=$(this).attr("recipe-id");
                    console.log("Deleting recipe " + recipe_id );
                    ShowAlertMessage("Are you sure you want to delete this recipe?","Delete","Cancel","",function(cancelled) {
                        if(cancelled){

                        }else {
                            DeleteRecipe(recipe_id, {}, function (success, data) {
                                if (success) {
                                    ShowMyRecipes();
                                } else {
                                    ShowGeneralError(data);
                                }
                            });
                        }
                    });
                });
                vitaminChangeNames();
            });
            $('#recipe_error_message').text("");
            applyCSS();
        }else{
            ShowGeneralError("Failed to load your recipes. Connect to server error.");
        }
    });
}

function ShowMyRecipes(){
    FetchMyRecipesAPI({},function(success,data_in){
        if(currentlyShowingView!=="load-my-recipes"){
            return;
        }
        if(success) {

            getTextTemplate("my-recipes-template", function (source) {
                var template = Handlebars.compile(source);
                var info = template({recipes:data_in});
                $('#recipe-content').html(info);

                $('[clickable="true"]').click(function(){
                    FetchRecipeSuperObject($(this).attr("recipe_id"));
                });
            });
            $('#recipe_error_message').text("");
        }else{
            ShowGeneralError("Failed to load your recipes. Connect to server error.");
        }
    });
}

function ShowGeneralError(error_message){
    getTextTemplate("general-error-template", function (source) {
        var template = Handlebars.compile(source);
        var info = template({error_message:error_message});
        $('#recipe-content').html(info);
    });

}

function ShowAlertMessage(warning_message,warning_confirm_text,warning_cancel_text,warning_header,action){
    if($("#general-alert-message").length){
        console.log("There's already an alert message showing.");
        return;
    }
    if (!warning_message || warning_message.length==0){
        console.error("I can't show an alert without a warning message");
        return;
    }
    if (!warning_confirm_text || warning_confirm_text.length==0){
        console.error("I can't show an alert without the confirm button text");
        return;
    }
    if (!warning_cancel_text || warning_cancel_text.length==0){
        warning_cancel_text="Cancel";
    }
    if("function"!==typeof action){
        console.error(typeof action);
        console.error("I need an action function.");
        return;
    }
    getTextTemplate("general-alert-template", function (source) {
        var template = Handlebars.compile(source);
        var info = template({warning_message:warning_message,warning_confirm_text:warning_confirm_text,warning_header:warning_header,warning_cancel_text:warning_cancel_text});
        var new_alert_box = $(info);
        new_alert_box.attr("id","general-alert-message");
        new_alert_box.alert();

        new_alert_box.append('<button type="button" class="btn btn-sm btn-default" id="general-alert-cancel">' + warning_cancel_text + '</button>');
        new_alert_box.append('<button type="button" class="btn btn-sm btn-danger" id="general-alert-doit">' + warning_confirm_text + '</button>');

        $('#recipe-content').prepend(new_alert_box);

        $("#general-alert-doit").click(function(){
            action(false);
            new_alert_box.close();
        });
        $("#general-alert-cancel").click(function(){
            new_alert_box.close();
        });
    });

}

function ShowGeneralWorkingMessage(working_message){
    getTextTemplate("general-working-template", function (source) {
        var template = Handlebars.compile(source);
        var info = template({working_message:working_message});
        $('#recipe-content').html(info);
    });

}

function rateRecipe( rating ){
  if(debugMode)console.log("Setting rating: " + rating);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && (request.status == 200||request.status == 201)) {
          if(debugMode)console.log("rateRecipe: " + request.responseText);
        }
    }

    var url = recipe_api_url + "/rate-recipe";
    var params = '{"recipe_url" : "' + current_recipe_url + '", "rating" : ' + rating + '}';
    request.open("POST", url, true);
    request.setRequestHeader("UserID", chrome.extension.getBackgroundPage().uniqueUserID);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.setRequestHeader("Content-length", params.length);
    request.setRequestHeader("Connection", "close");
    request.send(params);
}

function getRecipeRating( the_recipe_url ){
    var url = recipe_api_url + "/get_recipe_rating";
    console.log("Fetching: " + url);
    chrome.extension.getBackgroundPage().console.log(url);
    $("#debug").html(" URL + " + url);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
    document.getElementById("debug").innerHTML = request.readyState +  "Some" + request.status ;
        if (request.readyState == 4 && (request.status == 200||request.status == 201)) {
          console.log("Received rating: " + request.responseText);
          var result = JSON.parse(request.responseText);
          document.getElementById("debug").innerHTML = result.average;
          for (i=5; i > 0; i--) {
            $("#star_image_"+i).attr('src','star_off.png');
          };
          var max_integer =  Math.floor(result.average);
          if( result.average - max_integer >= 0.5 ){
            $("#star_image_"+(max_integer+1) ).attr('src','half_star.png');
          }
          for (i=max_integer; i > 0; i--) {
            $("#star_image_"+i).attr('src','star.png');
          };
        }
    }
    var params = '{"url":"' + the_recipe_url + '"}';
    request.open("POST", url, true);
    request.setRequestHeader("UserID", chrome.extension.getBackgroundPage().uniqueUserID);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.setRequestHeader("Content-length", params.length);
    request.setRequestHeader("Connection", "close");
    request.send(params);
    
}

function favRecipe( ){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      document.getElementById("debug").innerHTML = "S=" + request.status;
        if (request.readyState == 4 && (request.status == 200||request.status == 201)) {
          document.getElementById("debug").innerHTML = "Done";
        }
    }
    var url = recipe_api_url + "/fav-recipe";
    var params = '{"recipe_url" : "' + current_recipe_url + '"}';
    request.open("POST", url, true);
    request.setRequestHeader("UserID", chrome.extension.getBackgroundPage().uniqueUserID);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.setRequestHeader("Content-length", params.length);
    request.setRequestHeader("Connection", "close");
    request.send(params);
}

var performMyAccountAction = function () {
    currentlyShowingView="my-account";
    if(debugMode)console.log("My account");

    getTextTemplate("signup-template", function (source) {
        var template = Handlebars.compile(source);
        var info = template({});
        $('#recipe-content').html(info);
        setupLoginUI();
    });

    var user_id = getRecipeCalCalLocalUserId();
    GetObject("me", {}, function (success, data) {
        var me = {};
        if(debugMode)console.log(data);
        if (success) {
            if(data.guest){
                getTextTemplate("signup-template", function (source) {
                    var template = Handlebars.compile(source);
                    var info = template({});
                    $('#recipe-content').html(info);
                    setupLoginUI();
                });


            }else {
                me = data;
                if(currentlyShowingView=="my-account") {
                    getTextTemplate("recipe-my-account", function (source) {
                        var template = Handlebars.compile(source);
                        var info = template(me);
                        $('#recipe-content').html(info);
                        setupLoginUI();
                    });
                }else{
                    console.log("Not displaying my account recipe page due to nav away.")
                }
                if (user_id) {
                    RequestApiKey({}, function (success, api_key) {
                        if(debugMode)console.log(api_key);
                    });
                    TakeGuestRecipes(user_id, {}, function (success, data) {
                        if(debugMode)console.log(data);
                    });
                }
            }
        }
    });
}


var showLogin = function showLogin() {
    $('#loginbox').hide();
    $('#signupbox').show();
}
var showSignup = function showSignup() {
    $('#loginbox').hide();
    $('#signupbox').show();
}
var setupLoginUI = function setupLoginUI() {
    $("#signupbox").hide();
    $("#sign-up-here-button").click(
        function () {
            $("#signupbox").show();
            $("#loginbox").hide();
        }
    );
    $("#btn-signout").click(function (button) {
        if(debugMode)console.log("Logging out...");
        SignOut({},function(success,data){
            performMyAccountAction();
        });
    });
    $("#btn-fbsignup").click(function (button) {
        chrome.tabs.create({url: "https://caloriemash.com/pluginfbsignup.html"}); // The content script will inject the user_id into the page
    });
    $("#btn-fblogin").click(function (button) {
        chrome.tabs.create({url: "https://caloriemash.com/pluginfbsignup.html"});
    });
    $("#btn-signup").click(function (button) {
        var inputs = $("#signupform");
        var user = {};
        inputs.serializeArray().forEach(function (input) {
            user[input.name] = input.value;
        });
    });
    $("#btn-login").click(function (button) {
        var inputs = $("#loginform");
        var user = {};
        inputs.serializeArray().forEach(function (input) {
            user[input.name] = input.value;
        });
    });
}


window.onload = map;
