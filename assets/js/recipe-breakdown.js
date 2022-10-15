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
        let img = data.recipe.images.REGULAR.url;


        titleEl.text(title);

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
recipeId = readQParam(window.location.href);
console.log(recipeId);
getApi(buildApiURL());

