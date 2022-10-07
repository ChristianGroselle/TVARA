//edamam api testing
//test request url
//https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=eaff234d&app_key=4726246f26709a39dee3c8328f230c5e%09&mealType=Dinner&field=url

var apiTestEl = document.querySelector('#apiCall');

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

 //getApi();