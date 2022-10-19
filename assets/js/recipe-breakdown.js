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

var relatedRecipesListEl = $('#relatedRecipesList');

let title = "";
let keywords = "";
var relatedRecipes = [];

var saveObj = {};
var recipeId = "";
var nutRefArray = ['SUGAR.added','CA','CHOCDF.net','CHOCDF','CHOLE','ENERC_KCAL','FAMS','FAPU','FAPU','FASAT','FATRN','FIBTG','FOLDFE','FOLFD','FOLAC','FE','MG','NIA','P','K','PROCNT','RIBF','NA','Sugar.alcohol','SUGAR','THIA','FAT','VITA_RAE','VITB12','VITB6A','VITC','VITD','TOCPHA','VITK1','WATER','ZN'];
var pantry = Pantry();
var ingredients_used = [];

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
        keywords = title.split(" ");
        
        /*
        for (var i = 0; i < keywords.length; i++) {
           getRelatedRecipes(keywords[i]);
        };
        */

        var waiTime = 1500;
        //console.log(keywords.length);
        var timer = Math.ceil((keywords.length/5));



        for (var y = 0; y < timer; y++) {
            //console.log(keywords.length);
            
            //setTimeout(function() {
                if(keywords.length > 5){
                    //setTimeout(function() {
                    for(let z = 0; z < 5; z++){
                        console.log("if");
                        console.log(keywords[0]);
                        console.log(keywords.length);
                        getRelatedRecipes(keywords[0]);
                        keywords.shift();
                    }
                    //}, waiTime);
                  }else if (keywords.length <= 5) {
                    setTimeout(function(){
                        for(let i = 0; i < keywords.length; i++){
                            console.log("else");
                            getRelatedRecipes(keywords[i]);
                            console.log(keywords[i]);
                            console.log(keywords.length);
                            //keywords.shift();
                        }
                    }, waiTime);
                  }
            //}, waiTime);
        }

          


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
            let iQuant = data.recipe.ingredients[i].quantity.toFixed(2);    // limit the quantity to 2 decimal points
            let unit = data.recipe.ingredients[i].measure;
            if (unit==="<unit>") {
                unit=iName;
            }
            let ingredientMetadata = pantry.get_ingredient(iName);
            ingredients_used.push({name:iName.toLowerCase(),quantity:IngredientQuantity(iQuant,unit)});

            ingTableEl.append(
              $("<tr>")
                  .append(
                      $("<td>")
                          .text(iName)
                  )
                  .append(
                      $("<td>")
                          .text(iQuant + " " + unit)
                  )
                  .append(
                      $("<td>")
                          .text(
                              ingredientMetadata.quantity.amount +
                              " " +
                              ingredientMetadata.quantity.unit
                          )
                  )
            );
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
    console.log(recipeName);

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
// Related recipes... takes the title of the page, breaks it into separate words
// each word gets its own call of updateRelatedRecipes
// within updateRelatedRecipes, we we're ultimately trying to append the Related Recipes tab to show list of related recipes
// this is done by 

function updateRelatedRecipes(newRecipes) {
    // combining new recipes with the old ones
    // creates a multidimensional array, which we don't want. We want to rm 192, 194, and inside forEach loop

    console.log(newRecipes);
    //console.log(newRecipes.results[0].display);
    //console.log(newRecipes.results[1]);

    // need to define length by number of displays within array
    //console.log(newRecipes.results.length);

    // need to test to see if there is content / inventory in the array
    //console.log(newRecipes.results[0]);

    //make API call. Wait 1 seconds. Then make another API call.
    //if length of array is over 5, run it for the first 5 items, wait 1.5 seconds. Then run again until .length.

    for (i = 0; i < newRecipes.results.length; i++) {
        console.log(newRecipes.results[i].display);
        relatedRecipesListEl.append('<tr><td>' + newRecipes.results[i].display + '</td></tr>');

    }
}

/*

Tasty API Implementation
JS Updates
[x] have Tasty API pull and list of related recipes

HTML Updates
[x] add 'Similar Recipes' tab to the right of 'Labels tab'

*/


recipeId = readQParam(window.location.href);
console.log(recipeId);
getApi(buildApiURL());
pantry.load_from_storage();

$("#pantryUse").click(function(){
    for (let i=0;i<ingredients_used.length;i+=1) {
        let name = ingredients_used[i].name;
        let quantity = ingredients_used[i].quantity;
        let ingredientMetadata = pantry.get_ingredient(name);
        pantry.remove_from_ingredient(name,quantity);
        ingTableEl
            .children()
            .eq(i)
            .children()
            .eq(2)
            .text(
                ingredientMetadata.quantity.amount +
                " " +
                ingredientMetadata.quantity.unit
            )
    }
    pantry.save_to_storage();
});
