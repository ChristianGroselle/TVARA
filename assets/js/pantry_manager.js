const PANTRY_EL=$("#pantryIngredients");


let pantry=Pantry();
let locations={};
let mode="edit";


function add_item(event) {
    let form=event.target.parentElement;
    let location=form.getAttribute("data-location");
    let name=form.children[2].value;
    let quantity=Number(form.children[4].value);
    let unit=form.children[6].value;
    let metadata=IngredientMetadata(Number(quantity),unit,location);
    pantry.add_ingredient(name,metadata);
    $("#"+location+"IngredientsTable").append(create_ingredient_element(name,metadata));
    pantry.save_to_storage();
}
function delete_item(event) {
    let name=event.target.getAttribute("data-name");
    pantry.remove_ingredient(name);
    pantry.save_to_storage();
    event.target.parentElement.parentElement.remove();
}
function delete_location(event) {
    let location_name=event.target.getAttribute("data-location");
    let ingredients=locations[location_name];
    for (let i=0;i<ingredients.length;i+=1) {
        pantry.remove_ingredient(ingredients[i]);
    }
    delete locations[location_name];
    pantry.save_to_storage();
    event.target.parentElement.remove();
}
function create_location_element(name,ingredients) {
    let location_el=$("<details>")
        .addClass("card-content")
        .append($("<summary>").text(name))
        .append(
            $("<a>")
                .attr("data-location",name)
                .addClass("btn")
                .addClass("waves-effect")
                .addClass("waves-light")
                .text("Remove location and all items in it")
                .click(delete_location)
        )
        .append(
            $("<details>")
                .attr("data-location",name)
                .addClass("addItem")
                .append(
                    $("<summary>")
                        .text("Add a new item")
                )
                .append(
                    $("<label>")
                        .attr("for","itemName")
                        .text("Item Name")
                )
                .append(
                    $("<input>")
                        .attr("type","text")
                        .attr("id","itemName")
                        .attr("name","itemName")
                )
                .append(
                    $("<label>")
                        .attr("for","itemQuantity")
                        .text("Quantity")
                )
                .append(
                    $("<input>")
                        .attr("type","number")
                        .attr("id","itemQuantity")
                        .attr("name","itemQuantity")
                        .attr("min","0")
                )
                .append(
                    $("<label>")
                        .attr("for","itemUnit")
                        .text("Item Measurement Unit")
                )
                .append(
                    $("<input>")
                        .attr("type","text")
                        .attr("id","itemUnit")
                        .attr("name","itemUnit")
                )
                .append(
                    $("<input>")
                        .attr("type","submit")
                        .attr("value","Add")
                        .click(add_item)
                )
        );
    PANTRY_EL.append(location_el);
    let items=$("<table>")
        .addClass("striped")
        .addClass("border-black")
        .append(
            $("<thead>").append(
                $("<tr>")
                    .append($("<th>").text("Ingredient name"))
                    .append($("<th>").text("Quantity"))
                    .append($("<th>").text("Unit"))
                    .append($("<th>").text("Actions"))
            )
        );
    let table_items=$("<tbody>").attr("id",name+"IngredientsTable");
    items.append(table_items);
    for (let i=0;i<ingredients.length;i+=1) {
        let item_name=ingredients[i];
        let meta=pantry.get_ingredient(item_name);
        table_items.append(create_ingredient_element(item_name,meta));
    }
    location_el.append(items);
}
function create_ingredient_element(item_name,metadata) {
    return $("<tr>")
        .attr("data-name",item_name)
        .append($("<td>").text(item_name))
        .append(
            $("<td>").append(
                $("<input>")
                    .attr("type","number")
                    .attr("min","0")
                    .attr("value",String(metadata.quantity.amount))
                    .change(update_item)
            )
        )
        .append(
            $("<td>").append(
                $("<input>")
                    .attr("type","text")
                    .attr("value",metadata.quantity.unit)
                    .change(update_item)
            )
        )
        .append(
            $("<td>").append(
                $("<a>")
                    .attr("data-name",item_name)
                    .addClass("btn")
                    .addClass("waves-effect")
                    .addClass("waves-light")
                    .text("Remove item")
                    .click(delete_item)
            )
        );
}
function update_item(event) {
    let item_row=$(event.target.parentElement.parentElement);
    let name=item_row.attr("data-name");
    let amount=Number(item_row.children().eq(1).children().eq(0).val());
    let unit=item_row.children().eq(2).children().eq(0).val();
    pantry.update_ingredient(name,amount,unit);
    pantry.save_to_storage();
}


pantry.load_from_storage();
// save the pantry items in their respective locations
for (let name of Object.keys(pantry.ingredients)) {
    let location_res=pantry.get_ingredient_location(name);
    if (location_res.good) {
        if (!locations[location_res.loc]) {
            locations[location_res.loc]=[];
        }
        locations[location_res.loc].push(name);
    } else {
        if (!locations.uncategorised) {
            locations.uncategorised=[];
        }
        locations.uncategorised.push(name);
    }
}
for (let location of Object.keys(locations)) {
    create_location_element(location,locations[location]);
}
$("#newLocation").click(function() {
    let location_name=$("#newLocationName").val();
    create_location_element(location_name,[]);
});
