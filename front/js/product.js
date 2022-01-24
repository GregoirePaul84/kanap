// *********** Extraction de l'ID *********** //

let str = window.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get("id");

// *********** Récupération de chaque produit de L'API selon leur ID *********** //

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


// *********** Intégration des produits uniques dans le DOM *********** //


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

// *********** Ajout des produits sélectionnés dans le local storage *********** //


const addToCart = () => {
    
    document.getElementById("addToCart").addEventListener("click", function () {
        let chosenColor = document.getElementById("colors").value;
        let chosenQuantity = document.getElementById("quantity").value;
        let productImg = document.querySelector(".item__img img").getAttribute("src");
        let productAlt = document.querySelector(".item__img img").getAttribute("alt");
        let productName = document.getElementById("title").innerText;
        let productPrice = document.getElementById("price").innerText;

        // Alerte si couleur non choisie
        if (chosenColor == 0) {
            alert("Veuillez choisir une couleur disponible");
        } 

        // Alerte si quantité non conforme
        if (chosenQuantity < 1 || chosenQuantity > 100) {
            alert("Veuillez choisir une quantité entre 1 et 100");
        } 

        // Si la couleur est la quantité sont conformes

        if (chosenColor && chosenQuantity != 0 && chosenColor && chosenQuantity <= 100 ) {
        // Création d'un objet stocké dans le local storage
            
        let storrageObject = {
            id : idProduct,
            quantity : chosenQuantity,
            color : chosenColor,
            name : productName,
            imgUrl : productImg,
            altTxt : productAlt,
            price : productPrice
        };

        console.log(storrageObject);

        // Création d'une variable pour transformer le JSON dans le local storage en objet JS
        let savedProductLocalStorrage = JSON.parse(localStorage.getItem("product"));
        
        // Si déjà produit enregisté dans le local storage (si savedProductLocalStorrage != null alors == true)
        if (savedProductLocalStorrage){
            // Si Id et Couleur déjà existants dans le tableau, on augmente la quantité voulue
            const sameId = savedProductLocalStorrage.find((el) => el.id === idProduct && el.color === chosenColor);
            
            if (sameId) {
    
                /* On utilise parseInt pour convertir la chaîne de caractères en nombre entier
                On additionne la quantité voulue dans storrageObject à la quantité déjà présente dans sameId */
                let addQuantity = parseInt(storrageObject.quantity) + parseInt(sameId.quantity);
                // On assigne la nouvelle quantité calculée à sameId
                sameId.quantity = addQuantity;
                localStorage.setItem("product", JSON.stringify(savedProductLocalStorrage));
                if (storrageObject.quantity == 1) {
                    alert (`Le produit ${productName} a été ajouté au panier en ${chosenQuantity} exemplaire`);
                }
                else {
                    alert (`Le produit ${productName} a été ajouté au panier en ${chosenQuantity} exemplaires`);
                    console.log(savedProductLocalStorrage);
                }
            } else {
            savedProductLocalStorrage.push(storrageObject);
            localStorage.setItem("product", JSON.stringify(savedProductLocalStorrage))
                if (storrageObject.quantity == 1) {
                    alert (`Le produit ${productName} a été ajouté au panier en ${chosenQuantity} exemplaire`);
                }
                else {
                    alert (`Le produit ${productName} a été ajouté au panier en ${chosenQuantity} exemplaires`);
                    console.log(savedProductLocalStorrage);
                }
            
            }
        } 
         
        //  Si pas de produit enregistré dans le local storage (si savedProductLocalStorrage == null alors == false)
        else {
            // On crée un tableau vide
            savedProductLocalStorrage = [];
            // On y injecte l'objet
            savedProductLocalStorrage.push(storrageObject);
            // On crée la clé "product" et on le sérialise en format JSON dans le local storrage
            localStorage.setItem("product", JSON.stringify(savedProductLocalStorrage));
            if (storrageObject.quantity == 1) {
                alert (`Le produit ${productName} a été ajouté au panier en ${chosenQuantity} exemplaire`);
            }
            else {
                alert (`Le produit ${productName} a été ajouté au panier en ${chosenQuantity} exemplaires`);
                console.log(savedProductLocalStorrage);
            }
        }

        } 
        
    })

};



addToCart ();

