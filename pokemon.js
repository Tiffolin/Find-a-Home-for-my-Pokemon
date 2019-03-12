(function pokemonData(){
    function pokemonFunction(pokemonName){
        $.ajax({
            url: 'https://pokeapi.co/api/v2/pokemon-species/' + pokemonName , 
            method: 'GET'
        })
        
        .then(function(response){
            var myData = JSON.parse(response.data);
            return myData
        });
    }
    
}());