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
    let headTitle = document.getElementsByTagName("title");
    let productName = document.getElementById("title");
    let productPrice = document.getElementById("price");
    let productDescription = document.getElementById("description");
    let productImg = document.querySelector(".item__img img");
    
    headTitle.innerHTML = product.name;
    productName.innerHTML = product.name;
    productPrice.innerHTML = product.price;
    productDescription.innerHTML = product.description;
    productImg.setAttribute ("src", product.imageUrl);
};

fetchApiId ();