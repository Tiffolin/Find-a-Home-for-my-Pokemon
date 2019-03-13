var mapData = (function pokemonHabitat(){
    var p = function habitatFunction(habitat, lat, lon, callback){
      $.ajax({
              url: "https://api.tomtom.com/search/2/search/" + habitat + ".json?lat=" + lat + "&lon=" + lon + "&idxSet=POI&key=pLMJGOF2IcP7NNvktT34bU6DFp8n4qv2", 
              method: 'GET'
      })
        .then(function(response){
              var myData = response;
              callback(myData);
        });
    }

    return p;

}());