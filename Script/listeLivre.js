let option = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
}

let bookList = new Array(); //tableau livre
let authorsList = new Array(); // tableau auteurs
let categoriesList = new Array(); // tableau catégorie

let listAuthors = document.getElementById("listAuthors");
let listCategories = document.getElementById("listCategories");
let listBooks = document.getElementById("bookList");

listAuthors.addEventListener('change', chargeByAuthor)

// On créé l'écouteur d'evenements sur le load de notre page
window.addEventListener("DOMContentLoaded", jsonOnLoad);

// Fonction qui appele le chargement  du json
function jsonOnLoad() {
    fetch("./Data/books.json")
        .then((response) => {
            return response.json(); //On covertit la reponse en json
        })
        .then((data) => {
            console.log(data);
            createBooks(data);
        })
}

// Fonction qui affiche les livres.... mais aussi qui crééera les listes détoulantes
function createBooks(_books) {

    // On boucle sur l'ensemble des livres : je m'en servirai pour afficher mes livres plus tard
    for (let book of _books) {
        bookList.push(book);

        for (let x = 0; x < book.authors.length; x++) {
            let author = book.authors[x];

            // Je vais vérifier que l'auteur n'est pas dans ma liste des auteurs
            if (authorsList.indexOf(author) == -1) {
                authorsList.push(author);
            }
        }

        // Je ferais la même chose pour la liste des catégories
    }
    authorsList.sort();

    for (let i = 0; i < authorsList.length; i++) {
        let option = document.createElement("option");
        option.value = authorsList[i];
        option.innerText = authorsList[i];
        listAuthors.appendChild(option);
    }
    console.log(authorsList)

    showBooks(bookList)
}

function showBooks(_books) {
     listBooks.innerHTML = "";

    for (let y = 0; y < _books.length; y++) {
        let book = document.createElement("div");
        book.setAttribute("class", "card");

        if (_books[y].thumbnailUrl == undefined || _books[y].thumbnailUrl == null) {
            _books[y].thumbnailUrl = "https://p1.storage.canalblog.com/14/48/1145642/91330992_o.png"

        }

        let titre;
        if (_books[y].title.length > 20) {
            titre = _books[y].title.substring(0, 20) + "(...)";
        }
        else {
            titre = _books[y].title;
        }

        let description;
        let shortDescription;

        if(_books[y].shortDescription==undefined || _books[y].shortDescription ==null){ 
           _books[y].shortDescription=_books[y].longDescription.substring(0,20);
        }

        description=_books[y].shortDescription;
        if(_books[y].shortDescription >100){
            shortDescription=_books[y].shortDescription.substring(0,100) + "(...)";
        }
        else{
            shortDescription=_books[y].shortDescription

        }

        book.innerHTML = '<img src "' + books[y].thumbnailUrl + '"/>' +

            '<h1 class="booktitle"><span class="infobulle"title= "' +
            _books[y].title + '">' +
            titre + '</span></h1>'+
            '<h4> <span class="infobulle"title= "' +
            description + description ;
            '">' + shortDescription + '</span></h4>';

        listBooks.appendChild(book);
    }

}

// Fonction appelée lors du chargement d'auteur dans la liste déroulante
function chargeByAuthor() { }

// Fonction appelée lors du chargement de catégorie dans la liste déroulante
function chargeByCategory() { }