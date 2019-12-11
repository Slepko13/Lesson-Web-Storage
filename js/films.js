class MoviePage {
    constructor(page) {
        this.page = page;
        this.title = $('#movieTitle').val();
        this.type = $('#movieType').val();
    }


    getMovies() {


        const url = `http://www.omdbapi.com/?page=${this.page}&s=${this.title}&type=${this.type}&apikey=c19821a5`;


        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);

                let moviesArray = data.Search;
                if (!moviesArray) $('ol').append("Movie not found");

                console.log(moviesArray);

                // for (let key in moviesArray[0]) {
                //     console.log(key, moviesArray[0][key]);
                // }
                let i = 0;
                moviesArray.forEach(data => {
                    let movieTitle = $(`<div></div>`).text(data.Title);
                    let li = $(`<li></li>`).html(movieTitle);
                    let details = $(`<button class="detailsButton" id=${i} value=${i} 
                    onclick="getDetails(                                            
                        '${data.Year}',
                        '${data.imdbID}',
                        '${data.Type}',
                        '${data.Poster}'
                        )"></button>`).text("Details");
                    let addToFavorites = $(`<button class="addFavorites" 
                        onclick="addToFavorites(                            
                            '${data.imdbID}'                          
                            )"></button>`).text("Add Fav");

                    // let getFavorites = $(`<button class="getFavorites" 
                    // onclick="getFavorites( 

                    //     obj

                    //     )"></button>`).text("Add Fav");




                    $('ol').append(li).append(details).append(addToFavorites);

                    i++;
                });
                let allDetailsButtons = $(`.detailsButton`);
                console.log(allDetailsButtons);
                console.log(allDetailsButtons[3].value);

            })
            .catch(error => console.log(error));

    }

    removePage() {
        $('ol').empty();
    }


}

console.log(localStorage);

function getFavorites() {
    $('.favorites').empty();
    console.log(localStorage);

    let favoritesList = JSON.parse(localStorage.getItem('favoritesObj'));
    for (let key in favoritesList) {
        const url = `http://www.omdbapi.com/?i=${favoritesList[key]}&apikey=c19821a5`;
        console.log(key);
        fetch(url).then(response => response.json())
            .then(data => {
                    console.log(data);

                    let favoriteTitle = $(`<div></div>`).text(data.Title);
                    $('.favorites').append(favoriteTitle);

                }

            )
    }
}

function getDetails(year, id, type, poster) {

    $(`.detailsData`).empty();
    // let titlePrint = $(`<div></div>`).html(`Title : ${title}`);
    let yearPrint = $(`<div></div>`).html(`Year : ${year}`);

    let idPrint = $(`<div></div>`).html(`imdbID : ${id}`);
    console.log(id);
    let typePrint = $(`<div></div>`).html(`Type : ${type}`);
    console.log(type);

    console.log(poster);
    let posterPrint = $(`<img src="${poster}">`);
    console.log(year);
    $(`.detailsData`).append(yearPrint).append(idPrint).append(typePrint).append(posterPrint);

}


function addToFavorites(id) {

    let favoritesItems = JSON.parse(localStorage.getItem('favoritesObj'));

    if (!favoritesItems) {
        favoritesItems = {};
    }
    if (Object.values(favoritesItems).indexOf(id) < 0) {
        let countID = Object.keys(favoritesItems).length;
        favoritesItems[`id${countID}`] = id;
        localStorage.setItem('favoritesObj', JSON.stringify(favoritesItems));
        countID++;
    }
}




let pageNumber = 1;

function getFirstPage() {
    $(`.detailsData`).empty();
    pageNumber = 1;
    let firstPage = new MoviePage(pageNumber);
    firstPage.removePage();
    firstPage.getMovies();
    $('.pageNumber').text(pageNumber);
    if (pageNumber == 1) {
        $('#prevPage').attr("disabled", true);
    }

}


function getNextPage() {
    let nextPage = new MoviePage(pageNumber + 1);
    nextPage.removePage();
    nextPage.getMovies();
    pageNumber++;
    $('.pageNumber').text(pageNumber);
    if (pageNumber > 1) {
        $('#prevPage').removeAttr("disabled");
    }
}


function getPrevPage() {
    let prevPage = new MoviePage(pageNumber - 1);
    prevPage.removePage();
    prevPage.getMovies();
    pageNumber--;
    $('.pageNumber').text(pageNumber);
    if (pageNumber == 1) {
        $('#prevPage').attr("disabled", true);
    }
}