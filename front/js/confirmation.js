// On créer une page confirmation.js pour éviter les conflits avec cart.js

const displayOrderId = () => {
    let str = window.location.href;
    let url = new URL(str);
    let orderId = url.searchParams.get("id");
    document.getElementById("orderId").innerText = `${orderId}`;
    // On vide le local storrage pour permettre au client de recommander de nouveau
    localStorage.clear();
}

displayOrderId();