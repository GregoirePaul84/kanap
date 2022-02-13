// Fonction qui permet de modifier l'affichage du h1
function updateCartTitle(empty = false) {
	console.log('empty => ', empty)
	let cart = document.querySelector("#cartAndFormContainer h1")

	if (empty) {
		cart.innerHTML = '<h1> Votre panier est vide !</h1>'
	} else {
		cart.innerHTML = '<h1> Votre panier</h1>'
	}
}

// Récupération du local storage en fichier JS
let savedProductLocalStorage = JSON.parse(localStorage.getItem("product"));

// Création de la variable idProduct pour récupérer les ID du local storage
let idProduct = [];
for (let id in savedProductLocalStorage) {
	idProduct.push(savedProductLocalStorage[id].id);
}
console.log(idProduct);

// Création d'un tableau vide qui contiendra les données reçues via la ou les requêtes HTTP
let data = [];

// Fonction qui permet de mesurer la quantité de produits dans le local storage
function countArticle() {
	let count = 0;
	for (let p in savedProductLocalStorage) {
		let product = savedProductLocalStorage[p];
		count += product.quantity
	}

	return count;
}

// Fonction qui permet de supprimer le formulaire pour le client si le panier est vide
function deleteForm() {
	const formDiv = document.querySelector(".cart__order");
	formDiv.remove();
}


// *********** Affichage du panier vide ou rempli *********** //

// Si panier vide
if (savedProductLocalStorage == undefined) {
	updateCartTitle(true);
	document.getElementById("totalPlural").innerHTML = "";
	document.querySelector("#cartAndFormContainer h1").innerHTML = `<h1> Votre panier est vide !</p>`;
	document.getElementById("totalQuantity").innerText = "0";
	document.getElementById("totalPrice").innerText = `0` + ",00";
	deleteForm();
}

// Si panier rempli
else {

	if (countArticle() > 1) {
		document.getElementById("totalPlural").innerHTML = "s";
	}

	console.log(savedProductLocalStorage);

	// Fonction permettant de créer un tableau contenant toutes les informations puis d'afficher les produits dans le DOM
	function displayProducts() {

		// Création de 2 tableaux qui contiendront les données de l'API, ainsi que du local storage
		let dataObject = [];
		let storageObject = [];

		console.table(data);
		for (let l in data) {

			let object1 = {
				name: data[l].name,
				price: data[l].price,
				url: data[l].imageUrl,
				description: data[l].description,
				altTxt: data[l].altTxt
			}
			dataObject.push(object1);
			console.table(dataObject);
		}

		for (let m in savedProductLocalStorage) {

			let object2 = {
				id: savedProductLocalStorage[m].id,
				quantity: savedProductLocalStorage[m].quantity,
				color: savedProductLocalStorage[m].color
			}
			storageObject.push(object2);
			console.log(storageObject);
		}

		// Création d'un tableau contenant toutes les caractéristiques nécessaires à l'affichage des produits
		let allInfoArray = [];
		for (let i = 0; i < dataObject.length; i += 1) {
			item = {};
			item.name = dataObject[i].name,
				item.price = dataObject[i].price,
				item.description = dataObject[i].description,
				item.url = dataObject[i].url,
				item.altTxt = dataObject[i].altTxt,
				item.id = storageObject[i].id,
				item.quantity = storageObject[i].quantity,
				item.color = storageObject[i].color,

				allInfoArray.push(item);
		}

		console.table(allInfoArray);

		// Création et insertion des éléments permettant d'afficher le / les produits dans le DOM
		for (let i in allInfoArray) {

			// Création et insertion de la balise article
			let createArticle = document.createElement("article");
			document.getElementById("cart__items").appendChild(createArticle);
			createArticle.className = "cart__item";
			createArticle.setAttribute("data-id", allInfoArray[i].id)
			createArticle.setAttribute("data-color", allInfoArray[i].color)

			// Création et insertion de la div qui contient l'image
			let createDivImg = document.createElement("div");
			createArticle.appendChild(createDivImg);
			createDivImg.className = "cart__item__img";

			// Création de la balise img, insertion des attributs src et alt
			let createImg = document.createElement("img");
			createDivImg.appendChild(createImg);
			createImg.setAttribute("src", allInfoArray[i].url);
			createImg.setAttribute("alt", allInfoArray[i].altTxt);

			// Création et insertion de la div contenant la div suivante
			let createDivContent = document.createElement("div");
			createArticle.appendChild(createDivContent);
			createDivContent.className = "cart__item__content";

			// Création et insertion de la div contenant le nom du produit, la couleur, et le prix
			let createDivDescription = document.createElement("div");
			createDivContent.appendChild(createDivDescription);
			createDivDescription.className = "cart__item__content__description";

			// Création et insertion du <h2> nom du produit, du <p> pour la couleur, du <p> pour le prix
			let createH2 = document.createElement("h2");
			createDivDescription.appendChild(createH2);
			createH2.innerText = allInfoArray[i].name;

			let createColorP = document.createElement("p");
			createDivDescription.appendChild(createColorP);
			createColorP.innerText = allInfoArray[i].color;

			let createPriceP = document.createElement("p");
			createDivDescription.appendChild(createPriceP);
			createPriceP.innerText = allInfoArray[i].price + ",00" + " €";

			// Création et insertion de la div contenant 2 div, une pour le choix de la quantité, une pour la suppression de produits
			let createQuantityDiv = document.createElement("div");
			createDivContent.appendChild(createQuantityDiv);
			createQuantityDiv.className = "cart__item__content__settings";

			// Création et insertion de la div du <p>, de l'input pour régler la quantité
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
			createQuantityInput.setAttribute("value", allInfoArray[i].quantity);

			// Création et insertion de la div contenant le <p> permettant de supprimer les produits
			let createDeleteDiv = document.createElement("div");
			createQuantityDiv.appendChild(createDeleteDiv);
			createDeleteDiv.className = "cart__item__content__settings__delete";

			// Création et insertion du <p> permettant de supprimer les produits
			let createDeleteP = document.createElement("p");
			createDeleteDiv.appendChild(createDeleteP);
			createDeleteP.className = "deleteItem";
			createDeleteP.setAttribute('data-id', allInfoArray[i].id)
			createDeleteP.setAttribute('data-color', allInfoArray[i].color)
			createDeleteP.innerText = "Supprimer";

		}

		adjustQuantityCart();
		deleteProduct();
		calculateBasket();
		checkForm();
	}

	// Récupération du ou des produits de l'API selon les ID récupérés dans le local storage
	new Promise(async (resolve, reject)=>{
		let i = 0
		try{
			for (let h in idProduct) {
				await fetch('http://localhost:3000/api/products/' + idProduct[h])
					.then((response) => {
						console.log(response);
						return response.json();
					})
					.then((product) => {
						console.log(product);
						data.push(product);
						console.log(data);
						console.log("Récupération du produit de l'API");
						console.log(i++)
					})
					.catch((error) => alert("Récupération du produit impossible"));
			}
			resolve()
		}
		catch(e){
			reject(e)
		}
	})
	.then(_=>{
		displayProducts()
		calculateBasket()
	})
	.catch(console.log)
}


// *********** Calcul des totaux de quantités et de prix *********** //

const calculateBasket = () => {

	// Ajout de la couleur et quantité du local storage vers le tableau data
	for (let o in savedProductLocalStorage) {

		data[o].color = savedProductLocalStorage[o].color;
		data[o].quantity = savedProductLocalStorage[o].quantity;

		console.table(data);
	}

	// Calcul du prix total
	let totalPrice = 0;
	data.forEach(el => totalPrice += el.price * el.quantity);
	console.log(totalPrice);

	// On utilise forEach pour itérer sur chaque produit et parseInt pour convertir la chaine de caractères en nombre
	let totalQuantity = 0;
	savedProductLocalStorage.forEach(el => totalQuantity += parseInt(el.quantity, 10));
	console.log(totalQuantity);

	// On pointe vers les ID qui affichent la quantité et le prix total des produits et on y insère les informations
	if (totalQuantity == 0) {

		updateCartTitle(true);
		document.getElementById("totalQuantity").innerText = "0";
		document.getElementById("totalPlural").innerHTML = "";

	} else {
		console.log('totalQuantity => ', totalQuantity)
		updateCartTitle(false)
		document.getElementById("totalQuantity").innerText = `${totalQuantity}`;
	}

	const calculatedPrice = document.getElementById("totalPrice");
	calculatedPrice.innerText = totalPrice + ",00";
}



// *********** Suppression d'un produit depuis le panier *********** //

const deleteProduct = () => {

	console.log(savedProductLocalStorage);

	// On pointe sur tous les boutons supprimer
	const deleteItem = document.querySelectorAll(".deleteItem");
	console.log(deleteItem);

	for (let l = 0; l < deleteItem.length; l++) {

		deleteItem[l].addEventListener("click", () => {
			let deleteById = deleteItem[l].getAttribute('data-id');
			let deleteByColor = deleteItem[l].getAttribute('data-color');
			
			// Suppression des produits du localstorage selon leur id et couleur
			savedProductLocalStorage = savedProductLocalStorage.filter(el => el.id != deleteById || el.color != deleteByColor);
			localStorage.setItem("product", JSON.stringify(savedProductLocalStorage));

			// Suppression des produits dans le tableau data
			let deleteData = data.filter(p => p._id == deleteById)[0];
			let deleteIdData = deleteData._id;
			let deleteColorData = deleteData.color;
			data = data.filter(el => el._id != deleteIdData || el.color != deleteColorData);

			// Suppression de l'élément article du DOM
			let articleDOM = deleteItem[l].closest("article");
			articleDOM.remove();
			
			// Si plus de produits, suppression de la clé product du localstorage et recalcul du panier, suppression du formulaire
			if (savedProductLocalStorage.length == 0) {
				
				document.getElementById("totalPlural").innerHTML = "";
				localStorage.clear();
				calculateBasket();
				deleteForm();

			// Si un seul produit, correction de l'orthographe
			} else if (savedProductLocalStorage.length == 1) {

				document.getElementById("totalPlural").innerHTML = "";
				calculateBasket();

			} else {

				calculateBasket();

			}

			adjustQuantityCart();
		})
	}
}



// *********** Ajustement des quantités dans le localstorage via le panier *********** //
function adjustQuantityCart() {

	// On pointe sur les inputs qui permettent de régler la quantité
	const adjustQuantity = document.querySelectorAll(".itemQuantity");
	
	// On utilise la méthode forEach pour changer la quantité sur chaque élément du tableau
	adjustQuantity.forEach(function (btn, index) {
		
		btn.onchange = function () {

			if (btn.value < 1 || btn.value > 100) {
				alert("Vous ne pouvez choisir qu'une quantité comprise entre 1 et 100");
				
			} else {
			
				savedProductLocalStorage = JSON.parse(localStorage.getItem("product"));
				
				// On attribue la valeur de input(btn.value) pour chaque quantité de chaque produit
				savedProductLocalStorage[index].quantity = parseInt(btn.value,10);
				
				// On injecte la nouvelle valeur dans le local storage
				localStorage.setItem("product", JSON.stringify(savedProductLocalStorage));
				
				// Correction de l'orthographe
				if (btn.value <= 1) {
					document.getElementById("totalPlural").innerHTML = "";
				}

				if (countArticle() > 1) {
					document.getElementById("totalPlural").innerHTML = "s";
				}

			calculateBasket();
			}		
		}
	})
}


// *********** Récupération des informations du formulaire *********** //

// On pointe vers le formulaire, on accèdera à chaque input grâce aux attributs name
const form = document.querySelector(".cart__order__form");

// Caractères autorisés pour nom et prénom 
let regExName = new RegExp("^[A-Za-z. 'àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ-]{2,20}$");
// Caractères autorisés pour l'adresse
let regExAdress = new RegExp("^[A-Za-z0-9. 'àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ-]{2,30}$");
// Caractères autorisés pour la ville
let regExCity = new RegExp("^[A-Za-z. 'àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ-]{2,20}$");
// Caractères autorisés pour l'email
let regExEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$|^$");


function checkForm() {

	// *********** Vérification des données du PRENOM *********** //

	// Ecoute du prénom et réglage de sa conformité 
	form.firstName.addEventListener("change", function () {
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
			document.getElementById("firstNameErrorMsg").innerText = `Votre prénom ne peut contenir que des lettres et caractères spéciaux`;
			return false;
		}
	}

	// *********** Vérification des données du NOM DE FAMILLE *********** //

	form.lastName.addEventListener("change", function () {
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
			document.getElementById("lastNameErrorMsg").innerText = `Votre nom ne peut contenir que des lettres et caractères spéciaux`;
			return false;
		}
	}

	// *********** Vérification des données de l'ADRESSE *********** //

	form.address.addEventListener("change", function () {
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

	form.city.addEventListener("change", function () {
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

	form.email.addEventListener("change", function () {
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

	// Au clic sur le bouton "commander", on vérifie si toutes les données sont correctes. Si oui, on appelle la fonction sendForm
	form.addEventListener("submit", function (e) {

		e.preventDefault();

		if (validFirstName(form.firstName) && validLastName(form.lastName) && validAddress(form.address) && validCity(form.city) && validEmail(form.email)) {

			console.log("formulaire valide");
			sendForm();

		} else {

			console.log("formulaire non valide");
		}
	})

}


//*********** Soumission du formulaire *********** //

function sendForm() {

	// Si formulaire valide on crée un tableau et on y intègre les id des produits choisis par le client
	let productId = [];

	for (let p in savedProductLocalStorage) {
		productId.push(savedProductLocalStorage[p].id)
	};

	// On crée un objet rassemblant toutes les informations du client, ainsi que l'id des produits
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

	// Envoi des données à l'API //

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
			// On passe l'ID de commande dans l'URL
			document.location.href = `./confirmation.html?id=${data.orderId}`;

		} catch (e) {
			console.log(e);
		}
	})

};