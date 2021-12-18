const fruitName = "apple"; //testing input, DOESN'T CHANGE it's CONSTANT, we may want to change this back to let/var if we want to attach this to the user input

/* create input 
var formSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();
  
    // get value from input element
    var username = nameInputEl.value.trim();
  
    if (username) {
      getUserRepos(username);
  
      // clear old content
      repoContainerEl.textContent = '';
      nameInputEl.value = '';
    } else {
      alert('Please enter a GitHub username');
    }
  };
*/


// https://api.giphy.com/v1/gifs/search?q=orange&api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN&limit=1

https://media2.giphy.com/media/3o7TKPdUkkbCAVqWk0/giphy_s.gif?cid=235416f56gn986s06ekq0eurvvdajhu5cv8tuad2es098bd9&rid=giphy_s.gif&ct=g


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
          //console.log(information);
          //console.log ("finding the url : " + information.data[0].images.original.url)
          // displayFruit (data);   // use this to call the function that displays the data.
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

var getNutrition = function (inputFood) {
  // format the Fruityvice api url
  var apiUrl = "https://trackapi.nutritionix.com/natural/nutrients";
  console.log("Fruit: ", inputFood)
  // make a get request to url
  fetch(apiUrl, {
    method: "POST",
    body: { food_name: inputFood},
    headers: { "x-app-id": "f84371c0", "x-app-key": "5681a0f0793909d41e71f141f7911a66", "x-remote-user-id": 0 }

  })
    .then(function (response) {
      // request was successful
      console.log("HELLO ? ", response)
      if (response.ok) {
        console.log(response);
        response.json().then(function (information) {
          console.log(information);
          // displayFruit (data);   // use this to call the function that displays the data.
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      console.log(error)
    });
};

getFruit(fruitName);

getNutrition(fruitName)
  // for giphy data/images/original/url/