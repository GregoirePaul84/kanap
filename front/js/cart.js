let storageArray = [localStorage.getItem("color"), localStorage.getItem("quantity"), localStorage.getItem("ID")];
console.log(storageArray);

// Affichage panier vide
const emptyCart = () => {
  if (storageArray == 0) {
    document.getElementById("cart__items").innerHTML = `<p>Votre panier est vide!</p>`
  }
};

emptyCart ();

// Affichage des produits dans le panier 

const displayCart = (storageArray) => {
    let productCart = document.getElementById("cart__items");
    
};

displayCart ();