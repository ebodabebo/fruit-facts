const fruitName = "apple"; //testing input, DOESN'T CHANGE it's CONSTANT, we may want to change this back to let/var if we want to attach this to the user input


// //create input 
// var formSubmitHandler = function(event) {
//     // prevent page from refreshing
//     event.preventDefault();
  
//     // get value from input element
//     var fruitName = nameInputEl.value.trim();
  
//     if (username) {
//       getUserRepos(username);
  
//       // clear old content
//       repoContainerEl.textContent = '';
//       nameInputEl.value = '';
//     } else {
//       alert('Please enter a GitHub username');
//     }
//   };



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

        displayFruitNutrition (calories,cholesterol,potassium,protein,saturatedfat,sodium,sugars);   // Here's the call to the fucntion that will show the nutrition facts on the page use this to call the function that displays the data.

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

displayFruitNutrition = function(calories,cholesterol,potassium,protein,satfat,sodium,sugars) {
console.log("The nutrition facts are: " + " cal: " + calories + " chol: " + cholesterol + " pot: " +  potassium + " prot: " + protein + " satfat: " + satfat + " sodium: " + sodium + " sug: " +sugars)
}

displayFruitPic = function(url){
  console.log("this is the url that needs to be displayed : " + url);
}

//

getFruit(fruitName);

getNutrition(fruitName)


  // for giphy data/images/original/url/