const base_url="https://api.themoviedb.org/3/";
const APIKEY = "f6642a9e75698dbd0dfd566716c561f2";
const image_url="https://image.tmdb.org/t/p/w500";
const test = "https://api.themoviedb.org/3/movie/550?api_key=f6642a9e75698dbd0dfd566716c561f2&callback=test";

$('button').click(() => {
    const x = $('#search').val();
    console.log(x);
    $.ajax({url:base_url + "search/movie?api_key=" + APIKEY+ "&query=" + x , success: function(result){
            console.log(result)
            console.log(result.results)
        }
    });

});

/*
$("button").click(function(){
    $.ajax({url: base_url + "configuration?api_key=" + APIKEY, success: function(result){
            console.log(result)
        }});
});*/
