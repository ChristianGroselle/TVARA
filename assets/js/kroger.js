// Connect the Kroger API to the app
var key = 'tvara-9ab12f9c57100cf9251796bc21028ea23803929742703015782';

// Kroger API - Products: Product Search
// allows you to find products by passing in either a search term or prooduct Id.
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.kroger.com/v1/products?filter.brand={{BRAND}}&filter.term={{TERM}}&filter.locationId={{LOCATION_ID}}",
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      "Authorization": "Bearer {{TOKEN}}"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
  
// Kroger API - Products: Product Details
// returns product details for a specific product.
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.kroger.com/v1/products/{{ID}}?filter.locationId={{LOCATION_ID}}",
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      "Authorization": "Bearer {{TOKEN}}"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
  
  