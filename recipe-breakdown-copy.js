//initialization for materialize js
M.AutoInit();
//example search by id Url:
//https://api.edamam.com/api/recipes/v2/9b5945e03f05acbf9d69625138385408?type=public&app_id=eaff234d&app_key=4726246f26709a39dee3c8328f230c5e&field=label
 
var titleEl = $('#titleTxt');
var rTimeEl = $('#rTime');
var rYieldEl = $('#rYield');
var rCalEl = $('#rCal');
var rImgEl = $('#rImg');
var rUrlEl = $('#rUrl');
var ingTableEl = $('#ingTable');
var nutTableEl = $('#nutTable');
var healthTableEl = $('#healthTable');
var dietTableEl = $('#dietTable');
var cautionTableEl = $('#cautTable');
var rSaveBtnEl = $('#rSave');

let title = "";

var saveObj = {};
var recipeId = "";
var nutRefArray = ['SUGAR.added','CA','CHOCDF.net','CHOCDF','CHOLE','ENERC_KCAL','FAMS','FAPU','FAPU','FASAT','FATRN','FIBTG','FOLDFE','FOLFD','FOLAC','FE','MG','NIA','P','K','PROCNT','RIBF','NA','Sugar.alcohol','SUGAR','THIA','FAT','VITA_RAE','VITB12','VITB6A','VITC','VITD','TOCPHA','VITK1','WATER','ZN'];

//reads the query parameters
function readQParam(currUrl){
    
    return(currUrl.slice((currUrl.indexOf("?=") + 2), currUrl.lenght));
}


//building the API request url
function buildApiURL(){
    let workingURL = "https://api.edamam.com/api/recipes/v2/"

    workingURL += readQParam(window.location.href);

    //adding the API auth key
    workingURL += "?type=public&app_id=eaff234d&app_key=4726246f26709a39dee3c8328f230c5e%09";
  
    //finishing the URL with fixed request
    workingURL += "&field=url&field=label&field=images&field=totalTime&field=yield&field=dietLabels&field=healthLabels&field=cautions&field=ingredientLines&field=ingredients&field=calories&field=totalWeight&field=totalNutrients&field=totalDaily&field=tags";
  
    console.log(workingURL);
    return workingURL;
  }

  var relatedRecipes = [];

  function getApi(requestUrl) {
    

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        title = data.recipe.label;
        let time = data.recipe.totalTime;
        let yield = data.recipe.yield;
        let cal = Math.round(data.recipe.calories);
        let url = data.recipe.url;
        let img = data.recipe.images.REGULAR.url;

        rSaveBtnEl.attr('data-id', readQParam(window.location.href));
        rSaveBtnEl.attr("data-title", title);
        rSaveBtnEl.attr("data-time", time);
        rSaveBtnEl.attr("data-yield", yield);
        rSaveBtnEl.attr("data-url", url);
        rSaveBtnEl.attr("data-img", img);

        titleEl.text(title);

        // [ ] combs through the title, splits it up into separate words, and combs through each keyword and calls getRelatedRecipes functionw with that keyword
        let keywords = title.split(" ");
        for (var i = 0; i < keywords.length; i++) {
           getRelatedRecipes(keywords[i]);
           //console.log(relatedRecipes);
        };

        //console.log(relatedRecipes);

        if(time < 1){
            rTimeEl.text("Cooking Time: N/A");
        } else {
            rTimeEl.text("Cooking Time: " + time + " minutes");
        }

        if(yield < 1){
            rYieldEl.text("Serves: N/A");
        } else {
            rYieldEl.text("Serves: " + yield);
        }

        if(cal < 1){
            rCalEl.text("Calories: N/A");
        } else {
            rCalEl.text("Calories: " + cal);
        }

        rUrlEl.attr("href", url);
        rImgEl.attr("src", img);

        //building Ingredients list
        for(let i = 0; i < data.recipe.ingredients.length; i++){
            let iName = data.recipe.ingredients[i].food;
            let iQuant = data.recipe.ingredients[i].quantity;
            let unit = data.recipe.ingredients[i].measure;
            
            ingTableEl.append('<tr><td>' + iName + '</td><td>' + iQuant + ' ' + unit + '</td><td> N/A </td></tr>');
        }

        //building Nutruebts list
        for(let i = 0; i < nutRefArray.length; i++){
            let indexNut = nutRefArray[i];
            if(data.recipe.totalNutrients[indexNut]){
                let label = data.recipe.totalNutrients[indexNut].label;
                let quant = data.recipe.totalNutrients[indexNut].quantity;
                let unit = data.recipe.totalNutrients[indexNut].unit;
                quant = Math.round((quant + Number.EPSILON) * 100) / 100
                
                nutTableEl.append('<tr><td>' + label + '</td><td>' + quant + ' ' + unit + '</td></tr>');
            } 
        }

        //building Label lists
        for(let i = 0; i < data.recipe.healthLabels.length; i++){
            healthTableEl.append('<tr><td>' + data.recipe.healthLabels[i] + '</td></tr>');
        }
        for(let i = 0; i < data.recipe.dietLabels.length; i++){
            dietTableEl.append('<tr><td>' + data.recipe.dietLabels[i] + '</td></tr>');
        }
        for(let i = 0; i < data.recipe.cautions.length; i++){
            cautionTableEl.append('<tr><td>' + data.recipe.cautions[i] + '</td></tr>');
        }

      });
      
  }

// [ ] New API Implementation

function getRelatedRecipes(recipeName) {
    var url = "https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=" + recipeName;
    //console.log(url);
    //console.log('this is recipeName: ' + recipeName);
    //console.log(recipeName[0]);

    // code snippet below provided by API to pull the API

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '81463b00b4mshd93bd2380ea334bp17535fjsn2b275451e531',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };
    


    fetch(url, options)
        .then(response => response.json())
        //.then(response => console.log(response))
        .then(response => ( updateRelatedRecipes(response) ))
        //.then(console.log(relatedRecipes))
        .catch(err => console.error(err));

}

// [ ] remove the duplicates is the last item on the agenda
// takes the title of the page, breaks it into separrate words
// each word gets its own call of updateRelatedRecipes

function updateRelatedRecipes(newRecipes) {
    // combining new recipes with the old ones
    // creates a multidimensional array, which we don't want. We want to rm 192, 194, and inside forEach loop
    relatedRecipes = relatedRecipes.concat(newRecipes);
    // flattens the array because it's multi-dimenstional. We want a one-dimensional array.
    relatedRecipes = relatedRecipes.flat();
    // get relatedRecipeList dom element
    let list = document.getElementById("relatedRecipeList");
    // we loop through the related recipes. 
    // inside API Reponse is a results property
    // inside the results property is an array of recipe objects
    relatedRecipes.forEach((apiResponse) => {
        // we grab the results property from the recipe objects
        let results = apiResponse.results;
        // with the results array, we iterate over it and forEach loop, we're setting it to list elemets text. And then appending each element to the list
        results.forEach((recipe) => {
            let li = document.createElement("li");
            // sets innerText within HTML to the 
            li.innerText = recipe.display;
            list.append(li);})
        
    })
    console.log(relatedRecipes);

    //relatedRecipes = newRecipes;
    /*
    if (newRecipes) {
        relatedRecipes.push(...newRecipes);
    }
    */
    //console.log(newRecipes);
    //console.log(relatedRecipes);
}

/*

Tasty API Implementation
JS Updates
[ ] have Tasy API pull and list of similar recipes

HTML Updates
[ ] add 'Similar Recipes' tab to the right of 'Labels tab'

*/


// Gets Access token every time the page is loaded
/*
$(function() {
    getRelatedRecipes();
});
*/

//--------------

// Kroger API Implementation

/*
Getting data array to work:
[x] need to break up URL endpoints
[ ] need to create code that programmatically updates access tokens / get Refresh Tokens grant access

Getting location and pricing to work:
[ ] need to get location ID
[ ] need to add location so that we can get specific prices. All prices will be via the specific location.

Getting html/js search bar to work
[ ] make it so that when a user inputs a search query, the searchValue variable updates
*/

/*

// Declaring variables
const access_token = '';
const apiDomain = 'https://api-ce.kroger.com/v1';
const locationEndpoint = '/locations?';
const productsEndpoint = '/products?';
const authEndpoint = '/connect/oauth2/token'
const secret = 'dHZhcmEyLTcyMmQ3MGZmODlkNTE1ZmQ0MzViYzg5MDljOTY0Y2Y1NTg0NzMxNzU1NzQxMDA1NzM5Nzp0UU41S1J5cGQ3ZGEyUklUa3QwU043MVZaei1FS0I2dW1tODI0U0M1';
var recipeValue = '';


var url = 'https://api.kroger.com/v1/products?filter.term=carrot' + recipeValue + '&filter.limit=2&access_token=' + access_token;

console.log(url);

// Gets access Token
$.get(url, function(responseText) {
    console.log('This is the URL variable: ' + url);
    console.log('Below is updated GET request:');
    console.log(responseText);
    console.log(responseText.data[0]);
    console.log(responseText.data[0].productId);
  });

// Gets product price from Kroger API
function getProductPrice(productName) {
    return 5;
}

// Sets new access token once per page load
function setAccessToken() {
    $.ajax({
        url: apiDomain + authEndpoint,
        method: "POST",
        crossDomain: true,
        cache: false,
        data: "grant_type=client_credentials&scope=product.compact",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + secret);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.setRequestHeader("Access-Control-Allow-Origin", "");
        },
        success: function (data) {
            console.log(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

*/

recipeId = readQParam(window.location.href);
console.log(recipeId);
getApi(buildApiURL());