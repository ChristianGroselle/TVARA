// Connect the Kroger API to the app
var key = 'tvara-9ab12f9c57100cf9251796bc21028ea23803929742703015782';

// Kroger API - Products: Product Search
// allows you to find products by passing in either a search term or prooduct Id.

/*
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.kroger.com/v1/products?filter.brand={{BRAND}}&filter.term={{TERM}}&filter.locationId={{LOCATION_ID}}",
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      "Authorization": "Bearer "
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
*/
  
/*
function getAPI() {
  var requestURL = "https://api.kroger.com/v1/connect/oauth2/token";
  console.log(productDetails);
}
*/

export function getProductPrice(productName) {
  return 5;
}
let price = getPrductPrice(iName);


            
            // ********************
            // get access to price var below
            let price = getPrductPrice(iName);

            ingTableEl.append('<tr><td>' + iName + '</td><td>' + iQuant + ' ' + unit + '</td><td>'+ price + '</td></tr>');

// Declaring var values
var searchValue = '';
var updatedSearchValue = document.getElementById('myInput');
//$endpoint = "https://api.kroger.com/v1/products?"

var access_token = 'eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJ0dmFyYS05YWIxMmY5YzU3MTAwY2Y5MjUxNzk2YmMyMTAyOGVhMjM4MDM5Mjk3NDI3MDMwMTU3ODIiLCJleHAiOjE2NjYwNTY1MjQsImlhdCI6MTY2NjA1NDcxOSwiaXNzIjoiYXBpLmtyb2dlci5jb20iLCJzdWIiOiIzOWFjYjNiMS1kYTI3LTUwYTMtYTVhNC01OGMwZTY4ZTA3ZjQiLCJzY29wZSI6InByb2R1Y3QuY29tcGFjdCIsImF1dGhBdCI6MTY2NjA1NDcyNDkyMzMyOTM5MSwiYXpwIjoidHZhcmEtOWFiMTJmOWM1NzEwMGNmOTI1MTc5NmJjMjEwMjhlYTIzODAzOTI5NzQyNzAzMDE1NzgyIn0.oA7o5YJ4D2O49kxmzipWF44KqkRtRtihePUhBiZUmMEXfjtysTb635vyw8Gcdl7c9Oo5U9fAPSxIbCZjG3cQU9mC-YaUGv55MHyJ9EFNSMj6dvOtdlB5TVScQzhu675Vn8ihEz8E1FxTM643S2CZty93-2I5tTGYwAayxismJ8BwPWT5G4N5n0xGlGC0J2nn2y5i_ksiWsvjEgpTc03GZlaL8Zhs3GZCR8-6SNv5EQpp95r18mAu18hglPyEHesivkCiv9NtCGOOJTZRHbizUHlXvntIRCMjnWMhdkyWbKK0ET2GoRhc3WUmeoYqMvR321Q-PsMU3-mUV84f3b0Rlw' 

// var url = endpoint + searchValue + accessToken
// url creator
var url = 'https://api.kroger.com/v1/products?filter.term=carrot' + searchValue + '&filter.limit=2&access_token=' + access_token;

//var url = 'https://api.kroger.com/v1/products?filter.term=milk' + searchValue + '&filter.limit=2filter.locationId=01100469&access_token=' + access_token;

console.log(url);


/*

https://api.kroger.com/v1/products?filter.term=milk&filter.limit=2&filter.locationId=01100469&access_token=eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJ0dmFyYS05YWIxMmY5YzU3MTAwY2Y5MjUxNzk2YmMyMTAyOGVhMjM4MDM5Mjk3NDI3MDMwMTU3ODIiLCJleHAiOjE2NjYwNTU0NzgsImlhdCI6MTY2NjA1MzY3MywiaXNzIjoiYXBpLmtyb2dlci5jb20iLCJzdWIiOiIzOWFjYjNiMS1kYTI3LTUwYTMtYTVhNC01OGMwZTY4ZTA3ZjQiLCJzY29wZSI6InByb2R1Y3QuY29tcGFjdCIsImF1dGhBdCI6MTY2NjA1MzY3ODI1MzIyMzY5OSwiYXpwIjoidHZhcmEtOWFiMTJmOWM1NzEwMGNmOTI1MTc5NmJjMjEwMjhlYTIzODAzOTI5NzQyNzAzMDE1NzgyIn0.ZjO2YAGkLAmdu_4irYtZO9tbwx6my4s_rS1Qaj4rKgwz0n2_CNYPsgBtEhjbllH7FY-T2fStbW8F34fdpKKZ5zyjyXNno5IPAyvshLZFGW9LpNQVigYMGXCO7wBjKvIPQwoicyJSW_GSNqxLxDIiDKg4pFZa_Blvlj6mWDI219fckjGaj-vU35Qty3_Hrad5DmEK3eo1ZmZf1f06JZAKEUY7NfzS6MBjXfYLHJ2Zx3WloMVT0sSo5ckEocFhK8luaBDASPR7pHVNxnJOuUnfcaCnuXXINuVvCp6NfBQwKoykb8NpsFcHKYB1FmLx_uVkvHipGF5jNCU-ndDvKONWAg

*/

// Search Function
function searchFunction() {
  console.log('This is updated Search Value: '+ updatedSearchValue);
}

// 01100469
// ---------------- Creating array ----
$.get(url, function(responseText) {
  console.log('This is the URL variable: ' + url);
  console.log('Below is updated GET request:');
  console.log(responseText);
  console.log(responseText.data[0]);
  console.log(responseText.data[0].productId);
});

// Get location ID
/*
$.get('https://api.kroger.com/v1/locations?filter.zipCode.near=30005&filter.limit=2&access_token=[access_token]', function(responseText) {
    console.log(responseText);
});
*/

/*
Getting data array to work:
[x] need to break up URL endpoints
[ ] need to create code that programmatically updates access tokens / get Refresh Tokens grant access

Getting location and pricing to work:
[ ] need to get location ID
[ ] need to add location so that we can get specific prices. All prices will be via the specific location.

Getting html/js search bar to work
[ ] make it so that when a user inputs a search query, the searchValue variable updates
*/

// Kroge location ID: 

// ----------------

/*
// Kroger API - Products: Product Details
// returns product details for a specific product.
var productDetails = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.kroger.com/v1/products/{{ID}}?filter.locationId={{LOCATION_ID}}",
  "method": "GET",
  "headers": {
    "Accept": "application/json",
    "Authorization": "Bearer {{TOKEN}}"
  }
}

$.ajax(productDetails).done(function (response) {
  console.log(response);
});
*/