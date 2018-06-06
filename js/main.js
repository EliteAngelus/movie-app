// When the page loads the search form will grab the value entered and run the getMovies function with the value past. Also preventDefault to stop page from refreshing. 
$(document).ready(() => {
    $("#searchForm").on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
        console.log(searchText);
    });
});


// This function uses axios to use the API url and pass the users search entry into the url
function getMovies(searchText) {
    // omdb API with the variable storing the search entry.
    axios.get('https://www.omdbapi.com/?s=' + searchText + '&y=&plot=short&apikey=dc725946')
        // Response to the API URL
        .then((response) => {
            console.log(response);
            // Stores the repsonse data in the a variable called movies
            let movies = response.data.Search;
            // Creates an empty variable that will later store information we pass into it. 
            let output = '';
            // Iterates throught 
            $.each(movies, (index, movie) => {
                output += `
                <div class = "col-md-3">
                    <div class = "well text-center">
                        <img src="${movie.Poster}">
                        <h5> ${movie.Title}</h5>
                        <br>
                        <a onclick = "movieSelected ('${movie.imdbID}')"class = "btn btn-primary" href="#">Movie Details</a> 
                    </div>
                </div>
                `;
            });
            $("#movies").html(output);
        })
        .catch((error) => {
            console.log(error);
        });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id)
    window.location = 'movie.html';
    return false;

}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');
    axios.get('https://www.omdbapi.com/?i=' + movieId + '&y=&plot=short&apikey=dc725946')
        .then((response) => {
            console.log(response);
            let movie = response.data;
            let output = `
            <div class = "row">
                <div class = "col-md-4">
                    <img src="${movie.Poster}">
                </div>
                <div class = "col-md-8">
                <h2>${movie.Title}</h2>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                    <li class="list-group-item"><strong>Release:</strong> ${movie.Realeased}</li>
                    <li class="list-group-item"><strong>Rating:</strong> ${movie.imdbRating}</li>
                    <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                    <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                </ul>
                </div>
            </div>
            <div class="row">
                <div class= "well">
                <br>
                    <h3>Plot</h3>
                    ${movie.Plot}
                    <hr>

                    <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class= "btn btn-primary">View IMDB</a>
    
                    <a href = "index.html" class ="btn btn-primary"> Back To Home</a>
                    <hr>
            `;
            $("#movies").html(output);
        })
        .catch((error) => {
            console.log(error);
        });
}