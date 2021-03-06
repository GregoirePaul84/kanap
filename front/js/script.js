// *********** Récupération des produits via l'URL de l'API *********** //


const fetchApi = () => {
    fetch('http://localhost:3000/api/products')
    .then((response) => {
        console.log("Récupération des produits de l'API")
        return response.json();
    })
    .then((products) => {
        console.log(products)
        displayItems(products)
    })
    .catch((e) => alert("Récupération des données de l'API impossible"));
};



// *********** Intégration des produits dans le DOM *********** //

const displayItems = (products) => {
    let items = document.getElementById("items");
    for (let i in products) {
        items.innerHTML += `<a href="./product.html?id=${products[i]._id}">
        <article>
          <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
          <h3 class="productName">${products[i].name}</h3>
          <p class="productDescription">${products[i].description}</p>
        </article>
      </a>` 
    }
   

};

fetchApi();
