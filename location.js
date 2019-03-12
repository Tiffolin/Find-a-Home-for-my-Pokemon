(function pokemonHabitat(){
    function habitatFunction(habitat, lat, lon){
      $.ajax({
              url: "https://api.tomtom.com/search/2/search/" + habitat + ".json?lat=" + lat + "&lon=" + lon + "&idxSet=POI&key=pLMJGOF2IcP7NNvktT34bU6DFp8n4qv2", 
              method: 'GET'
      })
        .then(function(response){
              var myData = JSON.parse(response.data);
              return myData
        });
    }  
}());