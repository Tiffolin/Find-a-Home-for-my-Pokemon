var pkData = (function pokemonData(){
    var q = function pokemonFunction(pokemonName, callback){
        $.ajax({
            url: 'https://pokeapi.co/api/v2/pokemon-species/' + pokemonName , 
            method: 'GET'
        })
        
        .then(function(response){
            var myData = response;
            callback(myData);
        });
    }

    return q;
    
}());