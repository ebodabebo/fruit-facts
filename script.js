var fruitName = ""; 

var fruitInputEl = document.querySelector("#fruit-name");
var fruitFormEl = document.querySelector("#fruit-form");

var fruitResults = document.getElementById("fruit-results")

//create input 
var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();

    console.log("fruit name from input : " + fruitName);
  
    // get value from input element
    var fruitName = fruitInputEl.value.trim();
    console.log("fruit name from input : " + fruitName);
  
    if (fruitName) {
      getFruit(fruitName);
      getNutrition(fruitName)
  
      // clear old content
      
      fruitInputEl.value = '';
    } else {
      alert('Please enter a fruit name');
    }
  };



// https://api.giphy.com/v1/gifs/search?q=orange&api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN&limit=1

//https://media2.giphy.com/media/3o7TKPdUkkbCAVqWk0/giphy_s.gif?cid=235416f56gn986s06ekq0eurvvdajhu5cv8tuad2es098bd9&rid=giphy_s.gif&ct=g


// GIPHY API CALL 


var getFruit = function (inputFood) {
  //fruitName = whatever the user puts in
  var apiUrl = "https://api.giphy.com/v1/gifs/search?q=" + inputFood + "&api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN&limit=1";

  // make a get request to url
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        //console.log("the response: " + response);
        response.json().then(function (information) {
          console.log("Giphy: ");
          console.log(information);
          console.log ("finding the url : " + information.data[0].images.original.url)

          giphyData = information.data[0].images.original.url;  //giphyData is the variable that holds the image URL from they API call

          displayFruitPic (giphyData);   // use this to call the function that displays the data.

        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to Fruityvice');
    });
};

// 5681a0f0793909d41e71f141f7911a66  nutritionix API Key

// NUTRITIONIX API CALL 

var getNutrition = function (inputFood) {
  // format the Fruityvice api url
  var apiUrl = "https://trackapi.nutritionix.com/v2/natural/nutrients";
  console.log("Fruit: ", inputFood)
  const credentials = { "Content-Type": "application/json", "x-app-id": "0a99b456", "x-app-key": "0efd891da46cd8f10b36b9165cc39553", "x-remote-user-id": 0 }
  const postFood = JSON.stringify({ "query": inputFood})
  const request = new Request(apiUrl, {method:"POST", headers:credentials, body: postFood})
  // make a get request to url
  fetch(request)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        console.log("Nutritionix: ");
        console.log(response);
        response.json().then(function (information) {
          console.log('information: ')
          console.log(information)
          //console.log("Nutrionix / foods(object) / array / information)"+ information.foods[0].nf_calories); first successful call to API
          let calories = information.foods[0].nf_calories;
          let cholesterol = information.foods[0].nf_cholesterol;
          let potassium = information.foods[0].nf_potassium;
          let protein = information.foods[0].nf_protein;
          let saturatedfat = information.foods[0].nf_saturated_fat;
          let sodium = information.foods[0].nf_sodium;
          let sugars = information.foods[0].nf_sugars;

        displayFruitNutrition (inputFood,calories,cholesterol,potassium,protein,saturatedfat,sodium,sugars);   // Here's the call to the fucntion that will show the nutrition facts on the page use this to call the function that displays the data.

        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      console.log(error)
    });
};

//Ebony, here are the functions to display the fruit nutrition facts and picture:

displayFruitNutrition = function(foodName,calories,cholesterol,potassium,protein,satfat,sodium,sugars) {
console.log("The nutrition facts are: " + " cal: " + calories + " chol: " + cholesterol + " pot: " +  potassium + " prot: " + protein + " satfat: " + satfat + " sodium: " + sodium + " sug: " +sugars)

document.getElementById("fruit-results").innerHTML = "";

let header = document.createElement("h2")
header.textContent = foodName
fruitResults.appendChild(header) 

let span = document.createElement("span")
span.textContent = "Calories: " + calories
fruitResults.appendChild(span)

let cholesterolspan = document.createElement("span")
cholesterolspan.textContent = "Cholesterol: " + cholesterol
fruitResults.appendChild(cholesterolspan)

let potassiumspan = document.createElement("span")
potassiumspan.textContent = "Potassium: " + potassium
fruitResults.appendChild(potassiumspan)

let protienspan = document.createElement("span")
protienspan.textContent = "Protein: " + protein
fruitResults.appendChild(protienspan)

let saturatedfatspan = document.createElement("span")
saturatedfatspan.textContent = "Saturated Fat: " + satfat
fruitResults.appendChild(saturatedfatspan)

let sodiumspan = document.createElement("span")
sodiumspan.textContent = "Sodium: " + sodium
fruitResults.appendChild(sodiumspan)

let sugarsspan = document.createElement("span")
sugarsspan.textContent = "Sugars: " + sugars
fruitResults.appendChild(sugarsspan)
}

displayFruitPic = function(url){
  console.log("this is the url that needs to be displayed : " + url);
}

fruitFormEl.addEventListener("submit", formSubmitHandler);