export {
    Pantry,
    IngredientMetadata,
    UNITS,
}


const UNITS={
    kilograms:"kg",
    grams:"g",
    pounds:"lbs",
    tablespoons:"tbsp",
    teaspoons:"tsp",
    cups:"cups",
    litres:"litres",
};




// @storage_key: the key where the ingredient map is stored as JSON
function Pantry(storage_key) {
    if (!storage_key) {
        storage_key="pantry_data";
    }
    return {
        storage_key,
        // The map of ingredients to amount, unit type, and location
        ingredients:{},
        load_from_storage:function() {
            let str_data=window.localStorage.getItem(this.storage_key);
            if (!str_data) {
                str_data="{}";
            }
            this.ingredients=JSON.parse(str_data);
        },
        save_to_storage:function() {
            let str_data=JSON.stringify(this.ingredients);
            window.localStorage.setItem(this.storage_key,str_data);
        },
        // @name: the name of the ingredient
        // @metadata: the `IngredientMetadata` of the current ingredient
        add_ingredient:function(name,metadata) {
            ingredients[name]=metadata;
        },
    };
}
// @quantity: the scalar value of how much of something you have
// @unit: the unit of measurement. Should be one of the ones stored in the `UNITS` map
// @location: the location in your house. Just a string so it is easier to find
function IngredientMetadata(quantity,unit,location) {
    return {quantity,unit,location};
}
