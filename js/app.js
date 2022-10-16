const loadCocktails = search => {
    const noCocktail = document.getElementById('no-cocktail-message');
    if (search == '') {
        const detailsContainer = document.getElementById('details-container');
        detailsContainer.innerHTML = ``;
        noCocktail.classList.remove('d-none');
    }
    else {
        noCocktail.classList.add('d-none');
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
            .then(res => res.json())
            .then(data => displayCocktails(data.drinks))

    }
}
const displayCocktails = cocktails => {
    // console.log(cocktails);
    const cocktailsContainer = document.getElementById('cocktails-container');
    cocktailsContainer.innerHTML = ``;
    const noCocktail = document.getElementById('no-cocktail-message');
    // console.log(noCocktail);
    const detailsContainer = document.getElementById('details-container');
        detailsContainer.innerHTML = ``;

    if (cocktails == null) {
        noCocktail.classList.remove('d-none');
    }
    else {
        noCocktail.classList.add('d-none')
    }

    cocktails.forEach(cocktail => {
        // console.log(cocktail);
        const cocktailDiv = document.createElement('div');
        cocktailDiv.classList.add('col');
        cocktailDiv.innerHTML = `
        <div class="card p-5">
            <img src="${cocktail.strDrinkThumb}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${cocktail.strDrink}</h5>
                <p class="card-text">${cocktail.strInstructions.slice(0, 50)}</p>
                <a onclick="loadDetails(${cocktail.idDrink})" class="btn btn-primary">Lookup Details</a>
            </div>
        </div>
        `;
        cocktailsContainer.appendChild(cocktailDiv);
    });

}

document.getElementById('search-button').addEventListener('click', function () {
    // console.log('search button clicked');
    const searchField = document.getElementById('search-field');
    const searchFieldText = searchField.value;
    // console.log(searchFieldText);
    loadCocktails(searchFieldText);
})

const loadDetails = drinkId => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
        .then(res => res.json())
        .then(data => displayDetails(data.drinks[0]))
    // .catch(error => console.log(error))
}
const displayDetails = drinkDetails => {

    console.log(drinkDetails);
    const cocktailsContainer = document.getElementById('cocktails-container');
    cocktailsContainer.innerHTML = ``;
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = ``;
    const detailsParagraph = document.createElement('p');
    detailsParagraph.innerText = `${drinkDetails.strInstructions}`;
    detailsContainer.appendChild(detailsParagraph);

}

loadCocktails('orange');