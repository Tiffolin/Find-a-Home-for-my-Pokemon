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
            loadScript(pokemon.js, function loadMap(){
                //PLACEHOLDER NAME FOR MAP FILE
                loadScript(MAPFILE.js, function mainApp(){

                    //Main code follows this point

                    //create a listener for the search button
                    $("#addPokemon").on("click", function(event) {
                        event.preventDefault();
                        
                        //take the value stored in the pokemon field of the form
                        var pokemonName = $("#pokemonInput").val().trim();

                        //Search the pokemon api for the information on the pokemon
                        //PLACEHOLDER NAME FOR POKEMON API FUNCTION
                        var pokeJson = POKEAPIFUNC(pokemonName)

                        //check if json is a valid response
                        if (pokeJson != null) {

                            //Parse the json for the pokemon habitat
                            //https://pokeapi.co/api/v2/pokemon-species/{pokemon-name-here}/                            
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
                                //PLACEHOLDER NO TERM
                                    keyword = "";
                                    break;

                                case "rare":
                                    keyword = "attraction";
                                    break;

                                case "rough-terrain":
                                    keyword = "fitness";
                                    break;

                                case "sea":
                                    keyword = "harbour";
                                    break;

                                case "urban":
                                    keyword = "city center";
                                    break;

                                case "waters-edge":
                                    keyword = "beach";
                                    break;
                            }

                            //use iplookup to find out the latitude and longitude of user's current location
                            var queryURL = "extreme-ip-lookup.com/json/"
                            $.ajax({
                                url: queryURL,
                                method: "GET"
                            })
                                .then(function(response) {
                                var results = response.data;

                                var lon = results.lon;
                                var lat = results.lat;

                                //give the lat, lon, and keyword to the Map Api to receive a singular location
                                //within a response json which will be used to provide a location image, and address
                                //PLACEHOLDER NAME FOR MAP API FUNCTION
                                var mapJson = MAPAPIFUNC(lon, lat, habitat);

                                var placeName = mapJson.results[0].poi.name;
                                var placeAddress = mapJson.results[0].address.streetNumber + mapJson.results[0].address.streetName;


                                var maxlat = mapJson.results[0].viewport.topLeftPoint.lat;
                                var maxlon = mapJson.results[0].viewport.btmRightPoint.lon;
                                var minlat = mapJson.results[0].viewport.btmRightPoint.lat;
                                var minlon = mapJson.results[0].viewport.topLeftPoint.lon;

                                //Set the HTML elements to change according to the new information

                                //TO BE DONE:
                                //1) Incorporate the name and/or address of the final location into an element
                                //2) set the img tag's src to the map api's site with the coordinates 


                            });
                        }

                    });




                })
            })
        })

    };
}());