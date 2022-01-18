
// Récupération du local storage en fichier JS
let savedProductLocalStorrage = JSON.parse(localStorage.getItem("product"));
console.table(savedProductLocalStorrage);

// *********** Calcul des totaux de quantités et de prix *********** //

const calculateBasket = () => {

  // Affichage du nombre total de produits choisis
  let totalQuantity = 0;
  
  // On utilise forEach pour itérer sur chaque produit et parseInt pour convertir la chaine de caractères en nombre
  savedProductLocalStorrage.forEach(el => totalQuantity += parseInt(el.quantity));
  console.log(totalQuantity);
  
  // On pointe vers l'ID qui affiche la quantité totale de produits
  if (totalQuantity === undefined) {
    document.getElementById("totalQuantity").innerText = "0";

  }else {
    document.getElementById("totalQuantity").innerText = `${totalQuantity}`;
  }
 
  // Affichage du prix total
  let totalPrice = 0;
  savedProductLocalStorrage.forEach(el => totalPrice += parseInt(el.price) * parseInt(el.quantity));
  console.log(totalPrice);
  
  // On pointe vers l'ID qui affiche le prix total des produits
  if (totalPrice === undefined) {
    document.getElementById("totalPrice").innerText = `00` + ",00";
  } else {
    document.getElementById("totalPrice").innerText = `${totalPrice}` + ",00";
  }
  
  
  }

// *********** Affichage du panier vide ou rempli *********** //

const displayCart = () => {

  // Si panier vide
  if (savedProductLocalStorrage == null) {
    document.querySelector("#cartAndFormContainer h1").innerHTML = `<h1> Votre panier est vide!</p>`;
    document.getElementById("totalQuantity").innerText = "0";
    document.getElementById("totalPrice").innerText = `0` + ",00";
  }

  // Si panier rempli
  else {

  // Création et insertion de l'élément article
  for (let j in savedProductLocalStorrage) {
    let createArticle = document.createElement("article");
    document.getElementById("cart__items").appendChild(createArticle);
    createArticle.className = "cart__item";
    createArticle.setAttribute("data-id", savedProductLocalStorrage[j].id)
    createArticle.setAttribute("data-color", savedProductLocalStorrage[j].color)
  

  // Création et insertion de la div qui contient l'image
  let createDivImg = document.createElement("div");
  createArticle.appendChild(createDivImg);
  createDivImg.className = "cart__item__img";

  // // Création de la balise img, insertion des attributs src et alt
  let createImg = document.createElement("img");
  createDivImg.appendChild(createImg);
  createImg.setAttribute ("src", savedProductLocalStorrage[j].imgUrl);
  createImg.setAttribute ("alt", savedProductLocalStorrage[j].altTxt);

  // // Création et insertion de la div contenant la div suivante
  let createDivContent = document.createElement("div");
  createArticle.appendChild(createDivContent);
  createDivContent.className = "cart__item__content";
  
  // Création et insertion de la div contenant le nom du produit, la couleur, et le prix
  let createDivDescription = document.createElement("div");
  createDivContent.appendChild(createDivDescription);
  createDivDescription.className = "cart__item__content__description";

  // // Création et insertion du <h2> nom du produit, du <p> pour la couleur, du <p> pour le prix
  let createH2 = document.createElement("h2");
  createDivDescription.appendChild(createH2);
  createH2.innerText = savedProductLocalStorrage[j].name;

  let createColorP = document.createElement("p");
  createDivDescription.appendChild(createColorP);
  createColorP.innerText = savedProductLocalStorrage[j].color;

  let createPriceP = document.createElement("p");
  createDivDescription.appendChild(createPriceP);
  createPriceP.innerText = savedProductLocalStorrage[j].price + ",00" + " €";

  // // Création et insertion de la div contenant 2 div, une pour le choix de la quantité, une pour la suppression de produits
  let createQuantityDiv = document.createElement("div");
  createDivContent.appendChild(createQuantityDiv);
  createQuantityDiv.className = "cart__item__content__settings";
 
  // // Création et insertion de la div du <p>, de l'input pour régler la quantité
  let createInputDiv = document.createElement("div");
  createQuantityDiv.appendChild(createInputDiv);
  createInputDiv.className = "cart__item__content__settings__quantity";

  let createQuantityP = document.createElement("p");
  createInputDiv.appendChild(createQuantityP);
  createQuantityP.innerText = "Qté : ";

  let createQuantityInput = document.createElement("input");
  createInputDiv.appendChild(createQuantityInput);
  createQuantityInput.setAttribute("type", "number");
  createQuantityInput.className = "itemQuantity";
  createQuantityInput.setAttribute("name", "itemQuantity");
  createQuantityInput.setAttribute("min", "1");
  createQuantityInput.setAttribute("max", "100");
  createQuantityInput.setAttribute("value", savedProductLocalStorrage[j].quantity);

  // // Création et insertion de la div contenant le <p> permettant de supprimer les produits
  let createDeleteDiv = document.createElement("div");
  createQuantityDiv.appendChild(createDeleteDiv);
  createDeleteDiv.className = "cart__item__content__settings__delete";

  // // Création et insertion du <p> permettant de supprimer les produits
  let createDeleteP = document.createElement("p");
  createDeleteDiv.appendChild(createDeleteP);
  createDeleteP.className = "deleteItem";
  createDeleteP.innerText = "Supprimer";
  }

  calculateBasket();

  }
  
};

displayCart ();


// *********** Suppression d'un produit depuis le panier *********** //

const deleteProduct = () => {
  
      // On pointe sur tous les boutons supprimer
      const deleteItem = document.querySelectorAll(".deleteItem");
      console.log(deleteItem);
      for (let l = 0; l < deleteItem.length; l++) {
        deleteItem[l].addEventListener("click", (event) => {
        event.preventDefault();
        // Suppression de l'élément article du DOM
        let articleDOM = deleteItem[l].closest("article");
        articleDOM.remove();
        // Suppression des produits du localstorage selon leur id ou couleur
        let deleteById = savedProductLocalStorrage[l].id;
        let deleteByColor = savedProductLocalStorrage[l].color;
        savedProductLocalStorrage = savedProductLocalStorrage.filter(el => el.id != deleteById || el.color != deleteByColor);
        localStorage.setItem("product", JSON.stringify(savedProductLocalStorrage));
        // Rafraichissement de la page pour mettre à jour la console
        location.reload();
        // Suppression de la clé product du localstorage et recalcul du panier
        if (deleteItem.length == 1) {
          localStorage.clear();
          calculateBasket();
        } else {
          calculateBasket();
        }
        
        }
        
        )}

}

deleteProduct ();

// *********** Ajustement des quantités dans le localstorrage via le panier *********** //

const adjustQuantityCart = () => {
  // On pointe sur les inputs qui permettent de régler la quantité
  const adjustQuantity = document.querySelectorAll(".itemQuantity");
  // On utilise la méthode forEarch pour changer la quantité sur chaque élément du tableau
  adjustQuantity.forEach(function (btn, index) {
    btn.addEventListener("change", function() {
      savedProductLocalStorrage = JSON.parse(localStorage.getItem("product"));
      // On attribue la valeur de input(btn.value) pour chaque quantité de chaque produit
      savedProductLocalStorrage[index].quantity = btn.value;
      // On injecte la nouvelle valeur dans le local storage
      localStorage.setItem("product", JSON.stringify(savedProductLocalStorrage));
      calculateBasket();
    })
  })
}

adjustQuantityCart();

