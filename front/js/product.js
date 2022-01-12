// Extraction de l'ID

let str = window.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get("id");

// Récupération de chaque produit de L'API selon son ID

const fetchApiId = async () => {
    await fetch('http://localhost:3000/api/products/' + idProduct)
    .then((response) => {
        console.log(response)
        return response.json();
    })
    .then((product) => {
        displayItemId(product);
        console.log("Récupération du produit de l'API");
    })
    .catch ((error) => alert("Récupération du produit impossible"));
}


// Intégration des produits uniques dans le DOM

const displayItemId = (product) => {

    // intégration du contenu de la balise title
    let headTitle = document.getElementsByTagName("title");
    headTitle.innerHTML = product.name;

    // intégration du nom du produit
    let productName = document.getElementById("title");
    productName.innerHTML = product.name;

    // intégration du prix du produit
    let productPrice = document.getElementById("price");
    productPrice.innerHTML = product.price;

    // intégration de la description du produit
    let productDescription = document.getElementById("description");
    productDescription.innerHTML = product.description;
    
    // intégration de l'image et de l'attribut alt du produit
    let productImg = document.querySelector(".item__img img");
    productImg.setAttribute ("src", product.imageUrl);
    productImg.setAttribute ("alt", product.altTxt);
    // intégration des couleurs disponibles
    for (let i of product.colors) {
        let newOptionTag = document.createElement("option");
        document.getElementById("colors").appendChild(newOptionTag);
        newOptionTag.innerHTML = i;
        newOptionTag.value = i;
    }
    
};

fetchApiId ();

// Ajout des produits sélectionnés dans le local storage

const addToCart = (product) => {
    
    document.getElementById("addToCart").addEventListener("click", function () {
        let chosenColor = document.getElementById("colors").value;
        let chosenQuantity = document.getElementById("quantity").value;
        let productImg = document.querySelector(".item__img img").getAttribute("src");
        let productAlt = document.querySelector(".item__img img").getAttribute("alt");
        let productName = document.getElementById("title").innerText;
        let productPrice = document.getElementById("price").innerText;

        console.log(productImg);
        // Alerte si couleur non choisie, enregistrement dans le local storage si conforme
        if (chosenColor == 0) {
            alert("Veuillez choisir une couleur disponible");
        } else {
            localStorage.setItem("color", chosenColor);
        };

        // Alerte si quantité non conforme, enregistrement dans le local storage si conforme
        if (chosenQuantity < 1 || chosenQuantity > 100) {
            alert("Veuillez choisir une quantité entre 1 et 100");
        } else {
            localStorage.setItem("quantity", chosenQuantity);
        };

        // Stockage de l'ID du produit dans le local storage

        if (chosenColor && chosenQuantity != null) {
            localStorage.setItem("ID", idProduct);
            localStorage.setItem("Img", productImg);
            localStorage.setItem("alt", productAlt);
            localStorage.setItem("name", productName);
            localStorage.setItem("price", productPrice);

        // Stockage des valeurs récupérées dans un tableau
            let storageArray = [localStorage.getItem("color"), localStorage.getItem("quantity"), localStorage.getItem("ID"), localStorage.getItem("Img"), localStorage.getItem("alt"), localStorage.getItem("name"), localStorage.getItem("price")];
            console.log(storageArray);
        } 
        
    })
};

addToCart ();

