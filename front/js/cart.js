
// Récupération du local storage en fichier JS
let savedProductLocalStorrage = JSON.parse(localStorage.getItem("product"));

// *********** Calcul des totaux de quantités et de prix *********** //

const calculateBasket = () => {

  // Affichage du nombre total de produits choisis
  let totalQuantity = 0;
  
  // On utilise forEach pour itérer sur chaque produit et parseInt pour convertir la chaine de caractères en nombre
  savedProductLocalStorrage.forEach(el => totalQuantity += parseInt(el.quantity));
  
  // On pointe vers l'ID qui affiche la quantité totale de produits
  if (totalQuantity === undefined) {
    document.getElementById("totalQuantity").innerText = "0";

  }else {
    document.getElementById("totalQuantity").innerText = `${totalQuantity}`;
  }
 
  // Affichage du prix total
  let totalPrice = 0;
  savedProductLocalStorrage.forEach(el => totalPrice += parseInt(el.price) * parseInt(el.quantity));
  
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
    const formDiv = document.querySelector(".cart__order");
    formDiv.remove();
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

  // *********** Suppression d'un produit depuis le panier *********** //

  const deleteProduct = () => {
  
  // On pointe sur tous les boutons supprimer
  const deleteItem = document.querySelectorAll(".deleteItem");
  console.log(deleteItem);
  for (let l = 0; l < deleteItem.length; l++) {
    deleteItem[l].addEventListener("click", () => {
      
      // Suppression de l'élément article du DOM
      let articleDOM = deleteItem[l].closest("article");
      articleDOM.remove();
      // Suppression des produits du localstorage selon leur id et couleur
      let deleteById = savedProductLocalStorrage[l].id;
      let deleteByColor = savedProductLocalStorrage[l].color;
      savedProductLocalStorrage = savedProductLocalStorrage.filter(el => el.id != deleteById || el.color != deleteByColor);
      localStorage.setItem("product", JSON.stringify(savedProductLocalStorrage));
      location.reload();
      // Si plus de produits, suppression de la clé product du localstorage et recalcul du panier
      if (deleteItem.length == 1) {
        localStorage.clear();
        calculateBasket();
      } else {
      calculateBasket();
      }
    
    })
  }
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

  // *********** Récupération des informations du formulaire *********** //

  // On pointe vers le formulaire, on accèdera à chaque input grâce aux attributs name
  const form = document.querySelector(".cart__order__form");

  // Caractères autorisés pour nom et prénom 
  let regExName = new RegExp ("^[A-Za-z. 'àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ-]{2,20}$");
  // Caractères autorisés pour l'adresse
  let regExAdress = new RegExp ("^[A-Za-z0-9. 'àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ-]{2,30}$");
  // Caractères autorisés pour la ville
  let regExCity = new RegExp ("^[A-Za-z. 'àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ-]{2,20}$");
  // Caractères autorisés pour l'email
  let regExEmail = new RegExp ("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");

  // *********** Vérification des données du PRENOM *********** //

  // Ecoute du prénom et réglage de sa conformité 
  form.firstName.addEventListener("change", function() {
    validFirstName(this)
  });

  const validFirstName = (inputFirstName) => {

  let firstNameTest = regExName.test(inputFirstName.value);
  console.log(firstNameTest);

  // Condition si le prénom indiqué par l'utilisateur est conforme ou non
  if (firstNameTest == true) {
    document.getElementById("firstNameErrorMsg").innerText = ``;
    return true;
  } else {
    document.getElementById("firstNameErrorMsg").innerText = `Prénom non conforme`;
    return false;
  }
  }

  // *********** Vérification des données du NOM DE FAMILLE *********** //

  form.lastName.addEventListener("change", function() {
    validLastName(this)
  });

  const validLastName = (inputLastName) => {

    let lastNameTest = regExName.test(inputLastName.value);
    console.log(lastNameTest);

    // Condition si le nom indiqué par l'utilisateur est conforme ou non
    if (lastNameTest == true) {
      document.getElementById("lastNameErrorMsg").innerText = ``;
      return true;
    } else {
      document.getElementById("lastNameErrorMsg").innerText = `Nom non conforme`;
      return false;
    }
  }

  // *********** Vérification des données de l'ADRESSE *********** //

  form.address.addEventListener("change", function() {
    validAddress(this)
  });

  const validAddress = (inputAddress) => {

    let validAddressTest = regExAdress.test(inputAddress.value);
    console.log(validAddressTest);

  // Condition si l'adresse indiquée par l'utilisateur est conforme ou non
  if (validAddressTest == true) {
    document.getElementById("addressErrorMsg").innerText = ``;
    return true;
  } else {
    document.getElementById("addressErrorMsg").innerText = `Veuillez saisir une adresse valide`;
    return false;
  }
  }

  // *********** Vérification des données de la VILLE *********** //

  form.city.addEventListener("change", function() {
    validCity(this)
  });

  const validCity = (inputCity) => {

    let validCityTest = regExCity.test(inputCity.value);
    console.log(validCityTest);

    // Condition si la ville indiquée par l'utilisateur est conforme ou non
    if (validCityTest == true) {
      document.getElementById("cityErrorMsg").innerText = ``;
      return true;
    } else {
      document.getElementById("cityErrorMsg").innerText = `Le nom de la ville semble erroné`;
      return false;
    }
  }

  // *********** Vérification des données de l'EMAIL *********** //

  form.email.addEventListener("change", function() {
    validEmail(this)
  });

  const validEmail = (inputEmail) => {
    let validEmailTest = regExEmail.test(inputEmail.value);
    console.log(validEmailTest);

    // Condition si l'email indiqué par l'utilisateur est conforme ou non
    if (validEmailTest == true) {
      document.getElementById("emailErrorMsg").innerText = ``;
      return true;
    } else {
      document.getElementById("emailErrorMsg").innerText = `Adresse mail non conforme`;
      return false;
    }
  }

  //*********** Soumission du formulaire *********** //

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    if (validFirstName(form.firstName) && validLastName(form.lastName) && validAddress(form.address) && validCity(form.city) && validEmail(form.email)) {

      console.log("formulaire valide");

      // Si formulaire valide on créer un tableau et on y intègre les id des produits choisis par le client
      let productId = [];
      for (let p in savedProductLocalStorrage) {
        productId.push(savedProductLocalStorrage[p].id)
      };

      // On créer un objet rassemblant toutes les informations du client, ainsi que l'id des produits
      let orderInfo = {
        contact: {
          firstName: form.firstName.value,
          lastName: form.lastName.value,
          address: form.address.value,
          city: form.city.value,
          email: form.email.value
        },
        products: productId
      };

      console.log(orderInfo);

      //*********** Envoi des données à l'API *********** //

      const postApi = fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(orderInfo)
      });

      postApi.then(async (response) => {
        try {
          const data = await response.json();
          console.log(data);
          localStorage.clear();
          // Récupération du numéro de commande et création d'une clé "orderId" dans le localstorage
          localStorage.setItem("orderId", data.orderId);
          // On passe l'ID de commande dans l'URL
          document.location.href = `./confirmation.html?id=${data.orderId}`;

        } catch (e){
          console.log(e);
        }
      })

    } else {
      console.log("formulaire non valide");
    }

  });


}
  
};

displayCart ();



