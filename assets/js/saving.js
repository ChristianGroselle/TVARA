var saveBtnEl = $('.saveBtn');
var testEl = $('#test');

//saveBtnEl.click(function(event) {
    //let parentEl = $(event.target);
    //console.log('el' + parentEl);
    //console.log(this.id);
//})

function addLocalRecipe(targetEl){
    data = targetEl.dataset;
    let recipeObj = {id:data.id, title:data.title, time:data.time, yield:data.yield, url:data.url, img:data.img};
    localStorage.setItem(localStorage.length, JSON.stringify(recipeObj));
}

//search button logic
$(document).on('click', '.saveBtn', function() {
    console.log(this.dataset.title);
    addLocalRecipe(this);
  });