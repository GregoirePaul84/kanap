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
    
    // intégration de l'image du produit
    let productImg = document.querySelector(".item__img img");
    productImg.setAttribute ("src", product.imageUrl);

    // intégration des couleurs disponibles
    for (let i of product.colors) {
        let newOptionTag = document.createElement("option");
        document.getElementById("colors").appendChild(newOptionTag);
        newOptionTag.innerHTML = i;
        newOptionTag.value = i;
    }
    
    
};

fetchApiId ();