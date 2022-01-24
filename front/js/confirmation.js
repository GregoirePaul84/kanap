// On créer une page confirmation.js pour éviter les conflits avec cart.js

const displayOrderId = () => {
    let orderId = localStorage.getItem("orderId");
    document.getElementById("orderId").innerText = `${orderId}`;
    localStorage.clear();
}

displayOrderId();