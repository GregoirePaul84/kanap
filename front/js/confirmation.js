// On créer une page confirmation.js pour éviter les conflits avec cart.js

const displayOrderId = () => {
    let orderId = localStorage.getItem("orderId");
    document.getElementById("orderId").innerText = `${orderId}`;
    // On vite le local storrage pour permettre au client de recommander de nouveau
    localStorage.clear();
}

displayOrderId();