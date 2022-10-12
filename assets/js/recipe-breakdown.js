console.log(window.location.href);
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

var recipeId = "";

//reads the query parameters
function readQParam(currUrl){
    
    return(currUrl.slice((currUrl.indexOf("?=") + 2), currUrl.indexOf('#')));
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

//   function buildPage(title, time, yield, cal, ){

//   }

  function getApi(requestUrl) {
    

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        let title = data.recipe.label;
        let time = data.recipe.totalTime;
        let yield = data.recipe.yield;
        let cal = Math.round(data.recipe.calories);
        let url = data.recipe.url;
        let img = data.recipe.images.LARGE.url;


        titleEl.text(title);

        if(time < 1){
            rTimeEl.text("Cooking Time: N/A");
        } else {
            rTimeEl.text("Cooking Time: " + time);
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
        // for(let i = 0; i < data.recipe.totalNutrients.length; i++){
        //     let label = data.recipe.totalNutrients[i].label;
        //     let quant = data.recipe.totalNutrients[i].quantity;
        //     let unit = data.recipe.totalNutrients[i].unit;

        //     quant = Math.round((quant + Number.EPSILON) * 100) / 100
        //     if(quant > 0){
        //         nutTableEl.append('<tr><td>' + label + '</td><td>' + quant + ' ' + unit + '</td>');
        //     }
        // }

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
recipeId = readQParam(window.location.href);
console.log(recipeId);
getApi(buildApiURL());

