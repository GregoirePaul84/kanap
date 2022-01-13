// Récupération du local storage
let savedProductLocalStorrage = JSON.parse(localStorage.getItem("product"));
console.log(savedProductLocalStorrage);

// Affichage panier vide ou panier rempli
const displayCart = () => {

  // Si panier vide
  if (savedProductLocalStorrage == null) {
    document.querySelector("#cartAndFormContainer h1").innerHTML = `<h1> Votre panier est vide!</p>`;

  }

  // Si panier rempli
  else {

    // Création et insertion de l'élément article
  for (let i of savedProductLocalStorrage) {
    let createArticle = document.createElement("article");
    document.getElementById("cart__items").appendChild(createArticle);
    createArticle.className = "cart__item";
    createArticle.setAttribute("data-id", savedProductLocalStorrage[i].id)
    createArticle.setAttribute("data-color", savedProductLocalStorrage[i].color)
   

  // // Création et insertion de la div qui contient l'image
  // let createDivImg = document.createElement("div");
  // createArticle.appendChild(createDivImg);
  // createDivImg.className = "cart__item__img";

  // // Création de la balise img, insertion des attributs src et alt
  // let createImg = document.createElement("img");
  // createDivImg.appendChild(createImg);
  // // createImg.setAttribute ("src", objectValues[0]);
  // // createImg.setAttribute ("alt", objectValues[1]);

  // // Création et insertion de la div contenant la div suivante
  // let createDivContent = document.createElement("div");
  // createArticle.appendChild(createDivContent);
  // createDivContent.className = "cart__item__content";
  
  // // Création et insertion de la div contenant le nom du produit, la couleur, et le prix
  // let createDivDescription = document.createElement("div");
  // createDivContent.appendChild(createDivDescription);
  // createDivDescription.className = "cart__item__content__description";

  // // Création et insertion du <h2> nom du produit, du <p> pour la couleur, du <p> pour le prix
  // let createH2 = document.createElement("h2");
  // createDivDescription.appendChild(createH2);
  // createH2.innerText = storageArray[5];

  // let createColorP = document.createElement("p");
  // createDivDescription.appendChild(createColorP);
  // createColorP.innerText = storageArray[0];

  // let createPriceP = document.createElement("p");
  // createDivDescription.appendChild(createPriceP);
  // createPriceP.innerText = storageArray[6] + ",00" + " €";

  // // Création et insertion de la div contenant 2 div, une pour le choix de la quantité, une pour la suppression de produits
  // let createQuantityDiv = document.createElement("div");
  // createDivContent.appendChild(createQuantityDiv);
  // createQuantityDiv.className = "cart__item__content__settings";
 
  // // Création et insertion de la div du <p>, de l'input pour régler la quantité
  // let createInputDiv = document.createElement("div");
  // createQuantityDiv.appendChild(createInputDiv);
  // createInputDiv.className = "cart__item__content__settings__quantity";

  // let createQuantityP = document.createElement("p");
  // createInputDiv.appendChild(createQuantityP);
  // createQuantityP.innerText = "Qté : ";

  // let createQuantityInput = document.createElement("input");
  // createInputDiv.appendChild(createQuantityInput);
  // createQuantityInput.setAttribute("type", "number");
  // createQuantityInput.className = "itemQuantity";
  // createQuantityInput.setAttribute("name", "itemQuantity");
  // createQuantityInput.setAttribute("min", "1");
  // createQuantityInput.setAttribute("max", "100");
  // createQuantityInput.setAttribute("value", storageArray[1]);

  // // Création et insertion de la div contenant le <p> permettant de supprimer les produits
  // let createDeleteDiv = document.createElement("div");
  // createQuantityDiv.appendChild(createDeleteDiv);
  // createDeleteDiv.className = "cart__item__content__settings__delete";

  // // Création et insertion du <p> permettant de supprimer les produits
  // let createDeleteP = document.createElement("p");
  // createDeleteDiv.appendChild(createDeleteP);
  // createDeleteP.className = "deleteItem";
  // createDeleteP.innerText = "Supprimer";
  }

  }
  
};

displayCart ();

// // Supprimer un produit
// const deleteProducts = () => {
//   document.querySelector(".deleteItem").addEventListener ("click", function () {
//     console.log("supprimé");
//   })
// }

// deleteProducts ();
