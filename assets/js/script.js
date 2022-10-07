//edamam api testing
//test request url
//https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=eaff234d&app_key=4726246f26709a39dee3c8328f230c5e%09&mealType=Dinner&field=url

var apiTestEl = document.querySelector('#apiCall');
var recipeCardListEl = $('#recipeList');
var searchBtnEl = $('#searchBtn');
var temp = 0;

//initialization for materialize js
M.AutoInit();

// gets the url of 20 dinner recipies that have to do with chicken
//doesnt have a functional use yet
function getApi() {
    
    var requestUrl = 'https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=eaff234d&app_key=4726246f26709a39dee3c8328f230c5e%09&mealType=Dinner&field=url';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        console.log(data.hits.length);
        for (var i = 0; i < data.hits.length; i++) {
        console.log(data[i]);
        var listItem = document.createElement('li');
        listItem.textContent = data.hits[i].recipe.url;
        apiTestEl.appendChild(listItem);
        }
      });
  }

  function buildRecipeCard(rTitle, rDesc, rLink, rImg) {
    temp++;
    console.log(temp);
    recipeCardListEl.append('<li><div class="card-panel grey lighten-5 z-depth-1"><div class="row valign-wrapper"><div class="col s4"><img src="'+rImg+'" alt="" class="circle responsive-img"></div><div class="col s8"><span class="black-text"><h4>'+rTitle+'</h4><div>'+rDesc+'</div></span></div></div></div></li>');
  }
// for(let i = 0; i < 10;i++){
//   let temp = i + 1
//   $('#startBtn').click(buildRecipeCard('Recipe Title '+ temp, 'Recipe description','','../images/200.jfif'));
// }

// $('#searchBtn').click(buildRecipeCard('Recipe Title '+ temp, 'Recipe description','','../images/200.jfif'));

//searchBtnEl.click(buildRecipeCard('Recipe Title '+ temp, 'Recipe description','','../images/200.jfif'));
for (let index = 0; index < 10; index++) {
  buildRecipeCard('Recipe Title '+ temp, 'Recipe description','','../images/200.jfif')
}
 //getApi();