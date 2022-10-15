<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> ad8ee56eec05ec98d30da04e54cac40142833a2f
//edamam api testing
//test request url
//https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=eaff234d&app_key=4726246f26709a39dee3c8328f230c5e%09&mealType=Dinner&field=url

var apiTestEl = document.querySelector('#apiCall');

function getApi() {
    // replace `octocat` with anyone else's GitHub username
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

<<<<<<< HEAD
getApi();
=======
>>>>>>> 680ea184121e5af6dfc86f35d8655f6b27b12651
=======
  // getApi();
>>>>>>> ad8ee56eec05ec98d30da04e54cac40142833a2f
