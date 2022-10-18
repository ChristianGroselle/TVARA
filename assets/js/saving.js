var saveBtnEl = $('.saveBtn');
var savedRecipeList = [];
function addLocalRecipe(targetEl){
    data = targetEl.dataset;
    let recipeObj = {id:data.id, title:data.title, time:data.time, yield:data.yield, url:data.url, img:data.img};
    savedRecipeList.push(recipeObj);
    if(localStorage.getItem('recipeList')){
        localStorage.removeItem('recipeList');
        localStorage.setItem('recipeList', JSON.stringify(savedRecipeList));
    } else {
        localStorage.setItem('recipeList', JSON.stringify(savedRecipeList));
    }
}

//search button logic
$(document).on('click', '.saveBtn', function(event) {
    event.preventDefault();
    console.log(this.dataset.title);
    addLocalRecipe(this);
  });

$(document).on('click', '#rSave', function(event) {
    event.preventDefault();
    console.log(this.dataset.title);
    addLocalRecipe(this);
  });

function removeSaved(index){
    let recList = JSON.parse(localStorage.getItem('recipeList'));
    for(let i = 0; i < recList.length; i++){
        if(recList[i].id == index){
            recList.splice(i, 1);
        }
    }
    localStorage.setItem('recipeList', JSON.stringify(recList));
}
//remove button logic
$(document).on('click', '.removeBtn', function() {
    console.log(this.id);
    removeSaved(this.id);
    location.reload();
  });