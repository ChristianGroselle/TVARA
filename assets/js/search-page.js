//test request url
//https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=eaff234d&app_key=4726246f26709a39dee3c8328f230c5e%09&mealType=Dinner&field=url

var apiTestEl = document.querySelector('#apiCall');
var recipeCardListEl = $('#recipeList');

var searchBtnEl = $('#searchBtn');
var nxtPageBtnEl = $('#nxtPageBtn');
var prevPageBtnEl = $('#prevPageBtn');


var cuisineSelectEl = $('#cuisineSelect');
var mealTypeSelectEl = $('#mealSelect');
var dishTypeSelectEl = $('#dishSelect');
var keyWordSearchEl = $('#keyWordInput');
var pgNumEl = $('#pgNum');
var totalPageEl = $('#totalPage');

//materialize's instance methods dont play nice with JQuery so these are base JS
var healthSelectEl = document.querySelector('#healthSelect');
var dietSelectEl = document.querySelector('#dietSelect');

var nxtPageUrl = "";
var previousUrls = [];
var pageIndex = 0;
var currUrl = "";
var isNextPage = false;
//initialization for materialize js
M.AutoInit();

//for grabbing muliple health restrictions
function getHealthParam(i){
  if(i == 1){
    return("alcohol-free");
  } else if(i == 2){
    return("celery-free");
  } else if(i == 3){
    return("crustacean-free");
  } else if(i == 4){
    return("dairy-free");
  } else if(i == 5){
    return("DASH");
  } else if(i == 6){
    return("egg-free");
  } else if(i == 7){
    return("fish-free");
  } else if(i == 8){
    return("fodmap-free");
  } else if(i == 9){
    return("gluten-free");
  } else if(i == 10){
    return("immuno-supportive");
  } else if(i == 11){
    return("keto-friendly");
  } else if(i == 12){
    return("kidney-friendly");
  } else if(i == 13){
    return("kosher");
  } else if(i == 14){
    return("low-potassium");
  } else if(i == 15){
    return("low-sugar");
  } else if(i == 16){
    return("lupine-free");
  } else if(i == 17){
    return("Mediterranean");
  } else if(i == 18){
    return("mollusk-free");
  } else if(i == 19){
    return("mustard-free");
  } else if(i == 20){
    return("No-oil-added");
  } else if(i == 21){
    return("paleo");
  } else if(i == 22){
    return("peanut-free");
  } else if(i == 23){
    return("pecatarian");
  } else if(i == 24){
    return("pork-free");
  } else if(i == 25){
    return("red-meat-free");
  } else if(i == 26){
    return("sesame-free");
  } else if(i == 27){
    return("shellfish-free");
  } else if(i == 28){
    return("soy-free");
  } else if(i == 29){
    return("sugar-conscious");
  } else if(i == 30){
    return("sulfite-free");
  } else if(i == 31){
    return("tree-nut-free");
  } else if(i == 32){
    return("vegan");
  } else if(i == 33){
    return("vegetarian");
  } else if(i == 34){
    return("wheat-free");
  } else {
    return null;
  }
}
//for grabbing multiple diet restrictions
function getDietParam(i){
  if(i == 1){
    return("balanced");
  } else if(i == 2){
    return("high-fiber");
  } else if(i == 3){
    return("high-protein");
  } else if(i == 4){
    return("low-carb");
  } else if(i == 5){
    return("low-fat");
  } else if(i == 6){
    return("low-sodium");
  } else {
    return null;
  }
}

function getDishParam(i){
    if(i == 1){
        return("alcohol%20cocktail");
      } else if(i == 2){
        return("biscuits%20and%20cookies");
      } else if(i == 3){
        return("bread");
      } else if(i == 4){
        return("cereals");
      } else if(i == 5){
        return("condiments%20and%20sauces");
      } else if(i == 6){
        return("desserts");
      } else if(i == 7){
        return("drinks");
      } else if(i == 8){
        return("egg");
      } else if(i == 9){
        return("main%20course");
      } else if(i == 10){
        return("pancake");
      } else if(i == 11){
        return("preps");
      } else if(i == 12){
        return("preserve");
      } else if(i == 13){
        return("salad");
      } else if(i == 14){
        return("sandwiches");
      } else if(i == 15){
        return("soup");
      } else if(i == 16){
        return("special%20occasions");
      } else if(i == 17){
        return("starter");
      } else{
        return null;
      }
}
//builds the HTML for the recipe cards
//needs recipie detail page to be built before it can be finalized
function buildRecipeCard(rTitle, rLink, rImg, rTime, rYield, rID) {
    recipeCardListEl.append('<li><div class="card-panel grey lighten-5 z-depth-1"><div class="row valign-wrapper"><div class="col s4"><img src="'+rImg+'" alt="recipe" class="circle responsive-img"></div><div class="col s8"><span class="black-text"><h4>'+rTitle+'</h4><div>Cooking Time: '+rTime+'</div><div>Feeds: '+rYield+'</div></span></div></div><div class="card-action"><div class="col s6"><a class="btn waves-effect waves-light left-align" href="'+rLink+'">Source</a></div><div class="col s6"><a class="btn waves-effect waves-light right-align" href="./recipe-breakdown.html?='+ rID +'">Cook!</a></div></div></div></li>');
  }

//building the API request url
function buildApiURL(){
  let cuisine = cuisineSelectEl.find(':selected').val();
  let meal = mealTypeSelectEl.find(':selected').val();
  let dish = dishTypeSelectEl.find(':selected').val();
  let keyWord = keyWordSearchEl.val();
  let healthInstance = M.FormSelect.getInstance(healthSelectEl);
  let dietInstance = M.FormSelect.getInstance(dietSelectEl);
  let selectedHealth = healthInstance.getSelectedValues();
  let selectedDiet = dietInstance.getSelectedValues();

  let cuisineParam = "";
  let mealParam = "";

  let workingURL = "https://api.edamam.com/api/recipes/v2?type=public"
  //assining users selection to the api specific parameter
  if(cuisine){
    if(cuisine == 1){
      cuisineParam = "american";
    } else if(cuisine == 2){
      cuisineParam = "asian";
    } else if(cuisine == 3){
      cuisineParam = "british";
    } else if(cuisine == 4){
      cuisineParam = "caribbean";
    } else if(cuisine == 5){
      cuisineParam = "central%20europe";
    } else if(cuisine == 6){
      cuisineParam = "chinese";
    } else if(cuisine == 7){
      cuisineParam = "eastern%20europe"
    } else if(cuisine == 8){
      cuisineParam = "french";
    } else if(cuisine == 9){
      cuisineParam = "greek";
    } else if(cuisine == 10){
      cuisineParam = "indian";
    } else if(cuisine == 11){
      cuisineParam = "italian";
    } else if(cuisine == 12){
      cuisineParam = "japanese";
    } else if(cuisine == 13){
      cuisineParam = "korean";
    } else if(cuisine == 14){
      cuisineParam = "kosher";
    } else if(cuisine == 15){
      cuisineParam = "mediterranean";
    } else if(cuisine == 16){
      cuisineParam = "mexican";
    } else if(cuisine == 17){
      cuisineParam = "middle%20eastern";
    } else if(cuisine == 18){
      cuisineParam = "nordic";
    } else if(cuisine == 19){
      cuisineParam = "south%20american";
    } else if(cuisine == 20){
      cuisineParam = "south%20east%20asian";
    } else if(cuisine == 21){
      cuisineParam = "world";
    }
  }

  if(meal){
    if(meal == 1){
      mealParam = "breakfast";
    } else if(meal == 2){
      mealParam = "brunch";
    } else if(meal == 3){
      mealParam = "lunch";
    } else if(meal == 4){
      mealParam = "dinner";
    } else if(meal == 5){
      mealParam = "snack";
    } else if(meal == 6){
      mealParam = "teatime";
    }
  }

  if(keyWord.length > 0){
    //formating the keyword input for use
    let formatedKeyWord = keyWord.trim();
    formatedKeyWord = formatedKeyWord.replace(/ /g, '%20');
    //adding the keyword querySelector into the URL
    workingURL += "&q="+formatedKeyWord;
  }
  //adding the API auth key
  workingURL += "&app_id=eaff234d&app_key=4726246f26709a39dee3c8328f230c5e%09";

  //adding diet label selectors if applicable
  console.log('diet length: ' + selectedDiet.length + " " + selectedDiet);
  if(selectedDiet.length > 0 && selectedDiet[0] >= 1){
    for(let i = 0; i < selectedDiet.length;i++){
      workingURL += "&diet="+getDietParam(selectedDiet[i]);
    }
  }

  //adding health restriction selectors if applicable
  console.log('health length: ' + selectedHealth.length + " " + selectedHealth);

  if(selectedHealth.length > 0 && selectedHealth[0] >= 1){
    for(let i = 0; i < selectedHealth.length;i++){
      workingURL += "&health="+getHealthParam(selectedHealth[i]);
    }
  }

  //adding cuisine selector if applicable
  if(cuisineParam.length > 0){
    workingURL += "&cuisineType="+cuisineParam;
  }

  //adding meal selector if applicable
  if(mealParam.length > 0){
    workingURL += "&mealType="+mealParam;
  }

  //adding dish selector if applicable
  if(getDishParam(dish)){
    workingURL += "&dishType="+getDishParam(dish);
  }

  //finishing the URL with fixed request
  workingURL += "&field=url&field=label&field=images&field=totalTime&field=uri&field=yield";

  return workingURL;
}

function getApi(requestUrl) {

  currUrl = requestUrl;

  pgNumEl.text("Page: " + (pageIndex + 1));
  
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.hits.length);
      

      totalPageEl.text("of " + (data.count/20)+ " pages.");
      if(data._links.next){
        isNextPage = true;
        nxtPageUrl = data._links.next.href;
      }else {
        isNextPage = false;
      }
      
      for(let i = 0; i < data.hits.length;i++){
        let title = data.hits[i].recipe.label;
        let link = data.hits[i].recipe.url;
        let imgSrc = data.hits[i].recipe.images.SMALL.url;
        let cTime = data.hits[i].recipe.totalTime;
        let cYield = data.hits[i].recipe.yield;
        let npRecId = data.hits[i].recipe.uri;
        //cuts the recipe id out of the uri
        let pRecId = npRecId.slice((npRecId.indexOf("recipe_") + 7), npRecId.length);
        //pRecId += "||";

        if(cTime < 1){
          cTime = 'N/A';
        } else {
          cTime += ' minutes';
        }
        if(cYield < 1){
          cYield = 'N/A';
        }
        
        buildRecipeCard(title, link, imgSrc, cTime, cYield, pRecId);
      }
    });
}

//search button logic
searchBtnEl.click(function() {
  let requestURL = buildApiURL();
  recipeCardListEl.empty();
  getApi(requestURL);
  console.log(requestURL);
});

//btn for loading next pages
nxtPageBtnEl.click(function() {
  if(currUrl){
    if(isNextPage){
      pageIndex++;
      previousUrls.push(currUrl);
      console.log("pUrl Length: " + previousUrls.length);
      console.log("-- " + previousUrls + " --");
      recipeCardListEl.empty();
      getApi(nxtPageUrl);
      console.log(nxtPageUrl);
    }
  }
  
})

//btn for loading previous pages
prevPageBtnEl.click(function() {
  if(pageIndex > 0){
    recipeCardListEl.empty();
    pageIndex--;
    getApi(previousUrls[pageIndex]);
    previousUrls.pop();
    console.log(previousUrls[pageIndex]);
  }
})

//console.log(window.location.href);