$(document).ready(function(){
    
//The code below will represent the topic for each preloaded button
var topics= ["Halloween", "Thanksgiving", "Christmas"];

//The code below will append the information to the buttons already pre-loaded onto the screen with the GIFs GIPHY pulls up

    for (var i = 0; i < topics.length; i++){
        $("#gif-buttons").append("<button type='button' onclick ='searchGIF(\"" +
        topics[i] + "\")' class = 'btn btn-primary' value=' " + topics[i] + "'>" +
        topics[i] + " </button>");
    }
});

//This code is the preloaded buttons
function topicsButton() {
    //var userInput= $('#user-choice').val();
    //searchGIF(userInput);
}

//The function below will create buttons based on the searched word(s)
function userSubmit() {
    var userInput= $('#user-choice').val();

//This if statement will append the searched word(s) to the button
if (userInput) {
    $('#gif-buttons').append("<button type= 'button' onclick='searchGIF(\"" +
    userInput + "\")' class='btn btn-primary' value =' " + userInput + "'>" + userInput + "</button>");
    }
}


//The function below will link the GIPHY API
function searchGIF(search) {
    $.ajax({
        url: 'https://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=dc6zaTOxFJmzC&limit=10',
        method: 'GET',
    })
    .done(function(response) {
        displayGif(response);
    })
 }

//This function is tying the rating and sizing to the GIFs 
function displayGif(response) {
    $('#gifShow').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="unpauseIMG" style= "width:300px; height:300px">';

        //This code appends the GIFs to the body
        $('#gifShow').append(image);
}

//This code will start and stop the gifs
$('.unpauseIMG').on('click', function(){
    var state = $(this).attr('data-state');
    if (state == 'still'){
        $(this).attr('src', $(this).attr("data-animate"));
        $(this).attr('data-state', 'animate');
    }
    else {
        $(this).attr('src', $(this).attr("data-still"));
        $(this).attr('data-state', 'still');
    }
    });
 }