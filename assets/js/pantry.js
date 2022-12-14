const UNITS={
    tablespoons:"tbsp",
    teaspoons:"tsp",
    cups:"cups",
    litres:"litres",
    kilograms:"kg",
    grams:"g",
    pounds:"lbs",
};
const UNIT_MAP={
    volume:{
        tbsp:{
            scale_to_tsp:3,
        },
        tsp:{
            scale_to_tsp:1,
        },
        cups:{
            scale_to_tsp:48,
        },
        litres:{
            scale_to_tsp:202.9,
        },
        gallons:{
            scale_to_tsp:768,
        },
        ounces:{
            scale_to_tsp:6,
        },
    },
    weight:{
        kg:{
            scale_to_g:1000,
        },
        g:{
            scale_to_g:1,
        },
        lbs:{
            scale_to_g:453.59237,
        },
    },
};
const UNIT_ALIASES={
    pound:"lbs",
    pounds:"lbs",
    lbs:"lbs",
    gram:"g",
    grams:"g",
    g:"g",
    kilogram:"kg",
    kilograms:"kg",
    kg:"kg",
    oz:"ounces",
    ounce:"ounces",
    ounces:"ounces",
    gal:"gallons",
    gallon:"gallons",
    gallons:"gallons",
    cup:"cups",
    cups:"cups",
    litre:"litres",
    litres:"litres",
    teaspoon:"tsp",
    teaspoons:"tsp",
    tsp:"tsp",
    tablespoon:"tbsp",
    tablespoons:"tbsp",
    tbsp:"tbsp",
};
const WEIGHT_UNITS=[
    "kg",
    "g",
    "lbs",
];
const VOLUME_UNITS=[
    "tsp",
    "tbsp",
    "cups",
    "litres",
    "gallons",
    "ounces",
];


// A storage for ingredients, their quantities, and where they are located.
// @storage_key: the key where the ingredient map is stored as JSON
function Pantry(storage_key) {
    if (!storage_key) {
        storage_key="pantry_data";
    }
    return {
        storage_key,
        // The map of ingredients to amount, unit type, and location
        ingredients:{},
        // Loads the ingredient map from storge
        load_from_storage:function() {
            let str_data=window.localStorage.getItem(this.storage_key);
            if (!str_data) {
                str_data="{}";
            }
            this.ingredients=JSON.parse(str_data);
            for (let key of Object.keys(this.ingredients)) {
                let quantity=this.ingredients[key].quantity;
                let amt=quantity.amount;
                let unit=quantity.unit;
                this.ingredients[key].quantity=IngredientQuantity(amt,unit);
            }
        },
        // Writes the ingredient map to storage
        save_to_storage:function() {
            let str_data=JSON.stringify(this.ingredients);
            window.localStorage.setItem(this.storage_key,str_data);
        },
        // @name: the name of the ingredient
        // @metadata: the `IngredientMetadata` of the current ingredient
        add_ingredient:function(name,metadata) {
            this.ingredients[name]=metadata;
        },
        // @name: name of the ingredient
        // @amount: the new amount to set
        // @unit: the new unit to set
        update_ingredient:function(name,amount,unit) {
            if (this.ingredients[name]) {
                if (amount) {
                    this.ingredients[name].quantity.amount=amount;
                }
                if (unit) {
                    this.ingredients[name].quantity.unit=unit;
                }
                this.ingredients[name].quantity.update_units();
            }
        },
        // @ret: returns null if there are no errors or returns a non-zero length string if there was one
        add_to_ingredient:function(name,quantity) {
            if (this.ingredients[name]) {
                return this.ingredients[name].quantity.add(quantity);
            } else {
                return "Ingredient "+name+" does not exist!";
            }
        },
        // @ret: returns null if there are no errors or returns a non-zero length string if there was one
        remove_from_ingredient:function(name,quantity) {
            if (this.ingredients[name]) {
                return this.ingredients[name].quantity.remove(quantity);
            } else {
                return "Ingredient "+name+" does not exist!";
            }
        },
        remove_ingredient:function(name) {
            if (this.ingredients[name]) {
                delete this.ingredients[name];
            }
        },
        // @ret: returns an object with the field `good` set to a boolean saying if there was an error.
        //   If there was an error, then the `msg` field will be populated and will contain the error
        //   message. If there was no error, then the `loc` field will be populated with the location
        //   the user designated.
        get_ingredient_location:function(name) {
            if (this.ingredients[name]) {
                return {good:true,loc:this.ingredients[name].location};
            } else {
                return {good:false,msg:"Ingredient "+name+" does not exist!"};
            }
        },
        // @name: the name of the ingredient. The name is converted to all lowercase before being used.
        // @ret: returns the `IngredientMetadata` of the ingredient, or a blank `IngredientMetadata`
        //   if it does not exist.
        get_ingredient:function(name) {
            name=name.toLowerCase();
            if (this.ingredients[name]) {
                return this.ingredients[name];
            } else {
                return IngredientMetadata(0,"","N/A");
            }
        },
    };
}
// @amount: the scalar value of how much of something you have
// @unit: the unit of measurement. Should be one of the ones stored in the `UNITS` map
// @location: the location in your house. Just a string so it is easier to find
function IngredientMetadata(amount,unit,location) {
    return {quantity:IngredientQuantity(amount,unit),location};
}
function IngredientQuantity(amount,unit) {
    amount=Number(amount);
    if (amount<0) {
        amount=0;
    }
    unit=unalias_unit_name(unit);
    return {
        amount,
        unit,
        is_volume:VOLUME_UNITS.includes(unit),
        is_weight:WEIGHT_UNITS.includes(unit),
        update_units:function() {
            this.is_volume=VOLUME_UNITS.includes(unit);
            this.is_weight=WEIGHT_UNITS.includes(unit);
        },
        // @ret: returns null if there are no errors or returns a non-zero length string if there was one
        add:function(other) {
            if (this.is_volume&&other.is_volume) {
                let unit_scale_a=UNIT_MAP.volume[this.unit].scale_to_tsp;
                let unit_scale_b=UNIT_MAP.volume[other.unit].scale_to_tsp;
                let amount_a_scaled=this.amount*unit_scale_a;
                let amount_b_scaled=other.amount*unit_scale_b;
                this.amount=(amount_a_scaled+amount_b_scaled)/unit_scale_a;
            } else if (this.is_weight&&other.is_weight) {
                let unit_scale_a=UNIT_MAP.weight[this.unit].scale_to_g;
                let unit_scale_b=UNIT_MAP.weight[other.unit].scale_to_g;
                let amount_a_scaled=this.amount*unit_scale_a;
                let amount_b_scaled=other.amount*unit_scale_b;
                this.amount=(amount_a_scaled+amount_b_scaled)/unit_scale_a;
            } else {
                if (this.unit===other.unit) {
                    this.amount+=other.amount;
                } else {
                    return "Unit "+other.unit+" cannot be added to "+this.unit;
                }
            }
            return null;
        },
        // @ret: returns null if there are no errors or returns a non-zero length string if there was one
        remove:function(other) {
            if (this.amount<=0) {
                this.amount=0;
                return;
            }
            if (this.is_volume&&other.is_volume) {
                let unit_scale_a=UNIT_MAP.volume[this.unit].scale_to_tsp;
                let unit_scale_b=UNIT_MAP.volume[other.unit].scale_to_tsp;
                let amount_a_scaled=this.amount*unit_scale_a;
                let amount_b_scaled=other.amount*unit_scale_b;
                this.amount=(amount_a_scaled-amount_b_scaled)/unit_scale_a;
            } else if (this.is_weight&&other.is_weight) {
                let unit_scale_a=UNIT_MAP.weight[this.unit].scale_to_g;
                let unit_scale_b=UNIT_MAP.weight[other.unit].scale_to_g;
                let amount_a_scaled=this.amount*unit_scale_a;
                let amount_b_scaled=other.amount*unit_scale_b;
                this.amount=(amount_a_scaled-amount_b_scaled)/unit_scale_a;
            } else {
                if (this.unit===other.unit) {
                    this.amount-=other.amount;
                } else {
                    return "Unit "+other.unit+" cannot be subtracted from "+this.unit;
                }
            }
            return null;
        },
        convert_to:function(unit_name) {
            let unit=unalias_unit_name(unit_name);
            if (this.is_weight) {
                let unit_scale_from=UNIT_MAP.weight[this.unit].scale_to_g;
                let unit_scale_to=UNIT_MAP.weight[unit].scale_to_g;
                let amount_scaled=this.amount*unit_scale_from;
                this.amount=amount_scaled/unit_scale_to;
            } else if (this.is_volume) {
                let unit_scale_from=UNIT_MAP.volume[this.unit].scale_to_tsp;
                let unit_scale_to=UNIT_MAP.volume[unit].scale_to_tsp;
                let amount_scaled=this.amount*unit_scale_from;
                this.amount=amount_scaled/unit_scale_to;
            }
            this.unit=unit;
        },
    };
}
// @ret: returns the original name if it could not find a unit name, or the unit name used by this
//   API if its found.
function unalias_unit_name(unit_name) {
    unit_name=unit_name.toLowerCase();
    if (UNIT_ALIASES[unit_name]) {
        return UNIT_ALIASES[unit_name];
    } else {
        return unit_name;
    }
}
