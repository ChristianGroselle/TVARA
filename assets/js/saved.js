M.AutoInit();

savedListEl = $('#savedList');

function buildRecipeCard(rTitle, rLink, rImg, rTime, rYield, rID) {
    savedListEl.append('<li><div class="card-panel grey lighten-5 z-depth-1"><div class="row valign-wrapper"><div class="col s4"><img src="'+rImg+'" alt="recipe" class="circle responsive-img"></div><div class="col s8"><span class="black-text"><h4>'+rTitle+'</h4><div>Cooking Time: '+rTime+'</div><div>Feeds: '+rYield+'</div></span></div></div><div class="card-action"><div class="col s4"><a class="btn waves-effect waves-light left-align" href="'+rLink+'">Source</a></div><div class="col s4"><a class="btn waves-effect waves-light center-align removeBtn" id="'+ rID +'" href="#">Remove</a></div><div class="col s4"><a class="btn waves-effect waves-light right-align" href="./recipe-breakdown.html?='+ rID +'">Cook!</a></div></div></div></li>');
  }

function buildList(){
    let recList = JSON.parse(localStorage.getItem('recipeList'));
    for(let i = 0; i < recList.length; i++){
        let currObj = recList[i];
        buildRecipeCard(currObj.title, currObj.url, currObj.img, currObj.time, currObj.rYield, currObj.id);
        console.log("run: " + i);
        console.log(currObj);
    }
}

buildList();