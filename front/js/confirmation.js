// On créer une page confirmation.js pour éviter les conflits avec cart.js

const displayOrderId = () => {

    let str = window.location.href;
    let url = new URL(str);
    let idProduct = url.searchParams.get("id");
    document.getElementById("orderId").innerText = idProduct;
    // On vide le local storage pour permettre au client de recommander de nouveau
    localStorage.clear();
}

displayOrderId();