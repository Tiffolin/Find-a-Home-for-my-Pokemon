(function gameFunction(){
    window.onload = function(){
        //constant for the api key
        const APIKEY = "pLMJGOF2IcP7NNvktT34bU6DFp8n4qv2";

        //The function provided that loads scripts from a given path
        function loadScript(path, callback) {

            var done = false;
            var scriptElement = document.createElement('script');
        
            scriptElement.onload = handleLoad;
            scriptElement.onreadystatechange = handleReadyStateChange;
            scriptElement.onerror = handleError;
            scriptElement.src = path;
            document.body.appendChild(scriptElement);
        
            function handleLoad() {
                if (!done) {
                    done = true;
                    callback(path, "ok");
                }
            }
        
            function handleReadyStateChange() {
                var state;
        
                if (!done) {
                    state = scriptElement.readyState;
                    if (state === "complete") {
                        handleLoad();
                    }
                }
            }
            function handleError() {
                if (!done) {
                    done = true;
                    callback(path, "error");
                }
            }
        }

        //Load the javascript for the pokemon api, then load the javascript for the map api, then run the main javascript
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js", function loadPoke(){
            loadScript("pokemon.js", function loadMap(){
                loadScript("location.js", function mainApp(){

                    //Main code follows this point

                    //create a listener for the search button
                    $("#addPokemon").on("click", function(event) {
                        event.preventDefault();
                        
                        //take the value stored in the pokemon field of the form
                        var pokemonName = $("#pokemonInput").val().trim().toLowerCase();

                        //Search the pokemon api for the information on the pokemon

                        pkData(pokemonName, function pokeInfo(pokeJson){
                            //check if json is a valid response
                            if (pokeJson != null) {
    
                                //Parse the json for the pokemon habitat
                                var habitat = pokeJson.habitat.name
    
                                //convert the habitat into a search term for the map API
                                var keyword = "";
                                switch (habitat){
                                    case "cave":
                                        keyword = "escape room";
                                        break;
    
                                    case "forest": case "grassland":
                                        keyword = "botanical"
                                        break;
    
                                    case "mountain":
                                        keyword = "bouldering";
                                        break;
    
                                    case "rare":
                                        keyword = "attraction";
                                        break;
    
                                    case "rough-terrain":
                                        keyword = "fitness";
                                        break;
    
                                    case "sea":
                                        keyword = "rigging";
                                        break;
    
                                    case "urban":
                                        keyword = "city center";
                                        break;
    
                                    case "waters-edge":
                                        keyword = "beach";
                                }
                                //use iplookup to find out the latitude and longitude of user's current location
                                var queryURL = "https://www.extreme-ip-lookup.com/json/"
                                $.ajax({
                                    url: queryURL,
                                    method: "GET"
                                })
                                    .then(function(response) {
                                    var results = response;
                                    
                                    var lon = results.lon;
                                    var lat = results.lat;
    
                                    //give the lat, lon, and keyword to the Map Api to receive a singular location
                                    //within a response json which will be used to provide a location image, and address
                                    //PLACEHOLDER NAME FOR MAP API FUNCTION
                                    mapData(keyword, lat, lon, function mapInfo(mapJson){

                                        var placeName = mapJson.results[0].poi.name;
                                        if ((mapJson.results[0].address.streetNumber != null) && (mapJson.results[0].address.streetName != null)) {
                                            var placeAddress = mapJson.results[0].address.streetNumber + "  " + mapJson.results[0].address.streetName;
                                        } else {
                                            var placeAddress = "Not Available"
                                        }
        
                                        var maxlat = mapJson.results[0].viewport.topLeftPoint.lat;
                                        var maxlon = mapJson.results[0].viewport.btmRightPoint.lon;
                                        var minlat = mapJson.results[0].viewport.btmRightPoint.lat;
                                        var minlon = mapJson.results[0].viewport.topLeftPoint.lon;
        
                                        //Set the HTML elements to change according to the new information
        
                                        //set the img tag's src to the map api's site with the coordinates, change the pokemon picture and show the pointer.
                                        var mapurl = "https://api.tomtom.com/map/1/wms/?request=GetMap&srs=EPSG%3A4326&bbox=" + minlon + "%2C" + minlat  + "%2C" + maxlon + "%2C" + maxlat + "&width=607&height=607&format=image%2Fpng&layers=basic&styles=&version=1.1.1&key=" + APIKEY;
                                        
                                        $("#map").attr("src", mapurl)
                                        $("#pointer").show();
                                        $("#pokemonProfilePic").attr("src", "image/gen1/" + pokemonName + ".png")
                                        $("#habitat").html("Habitat: " + habitat.charAt(0).toUpperCase() + habitat.slice(1));
                                        $("#locationName").html("Name: " + placeName);
                                        $("#address").html("Address: " + placeAddress);
                                        $(".name").html(pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1));
                                        
                                    });
    
                                });
                            }
                        });


                    });

                })
            })
        })

    };
}());