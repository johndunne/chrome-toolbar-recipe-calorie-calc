// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
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
          getTextTemplate("recipe-template", function (source) {
              var template = Handlebars.compile(source);
              var info = template(recipe);
              $('#parsed-ingredients-content').html(info);
          });
      }
  });
}

function map() {
    var recipe_url = chrome.extension.getBackgroundPage().selectedRecipe;
    var user_id = chrome.extension.getBackgroundPage().uniqueUserID;
    console.log("User_id" + user_id);
    initRecipeCalCalc("recipecalcalc.com/api", {user_id: user_id, scheme: "https", debug: false});
    //initRecipeCalCalc("localhost:1243", { user_id:user_id, scheme:"http",debug:false });

    //var recipe_url = chrome.extension.getBackgroundPage().selectedRecipe;
    //console.log(chrome.extension.getBackgroundPage());c
    console.log("Want: " + recipe_url);
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
            $("#btn-fbsignup").click(function (button) {
                var user_id = chrome.extension.getBackgroundPage().uniqueUserID;
                chrome.tabs.create({url: "https://caloriemash.com/signup.html?user=" + user_id});
            });
            $("#btn-fblogin").click(function (button) {
                var user_id = chrome.extension.getBackgroundPage().uniqueUserID;
                chrome.tabs.create({url: "https://caloriemash.com/signin.html?user=" + user_id});
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

        function showParseIngredients() {
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
                    console.log("Key event");
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
                        console.error(recipe);
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
        showParseIngredients();

        //
        // Setup the nav bar
        $("#clear-ingredients").click(function () {
            $("#recipe_ingredients").val("");
            $("#recipe_portions").val("");
            $("#recipe_name").val("");
            $("#parsed-ingredients-content").html("");
        });

        $("#show-parse-ingredients").click(function () {
            showParseIngredients();
        });

        $("#signin-button").click(function () {
            getTextTemplate("signin-template", function (source) {
                var template = Handlebars.compile(source);
                var info = template({});
                $('#recipe-content').html(info);
            });
        });

        $("#signup-button").click(function () {
            GetObject("me", {}, function (success, data) {
                var me = {};
                console.log(data);
                if (success) {
                    me = data;
                }
                getTextTemplate("signup-template", function (source) {
                    var template = Handlebars.compile(source);
                    var info = template(me);
                    $('#recipe-content').html(info);
                    setupLoginUI();
                });

            });
        });

        $("#load-my-recipes").click(function () {
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
                    var user_id = chrome.extension.getBackgroundPage().uniqueUserID;
                    chrome.tabs.create({url: "https://caloriemash.com/my-recipe.html?recipe_id=" + recipe_id});
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
    console.trace();
    getTextTemplate("general-error-template", function (source) {
        var template = Handlebars.compile(source);
        var info = template({error_message:error_message});
        $('#recipe-content').html(info);
    });

}
function rateRecipe( rating ){
  console.log("Setting rating: " + rating);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && (request.status == 200||request.status == 201)) {
          console.log("ratRecipe: " + request.responseText);
        }
    }
    console.log("Unique ID[" + chrome.extension.getBackgroundPage().uniqueUserID + "]");

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


window.onload = map;
