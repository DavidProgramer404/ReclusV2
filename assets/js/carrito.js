let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage();
    updateCartBadge();
    updateCartModal();
});

function addToCart(productName, productPrice, productImage) {
    const product = { name: productName, price: productPrice, image: productImage, quantity: 1 };
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    saveCartToLocalStorage();
    updateCartBadge();
    updateCartModal();
    showAddToCartMessage(productName);
}

function updateCartBadge() {
    const cartBadge = document.getElementById('cartBadge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
}

function updateCartModal() {
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item', 'd-flex', 'align-items-center', 'mb-2');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="img-fluid" style="width: 50px; height: 50px; margin-right: 10px;">
            <div>
                <div>${item.name}</div>
                <div>${item.quantity} x $${item.price}</div>
            </div>
            <button class="btn btn-danger btn-sm ml-auto" onclick="removeFromCart('${item.name}')">Eliminar</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    const totalPriceElement = document.getElementById('totalPrice');
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalPriceElement.textContent = `Total: $${totalPrice}`;
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    saveCartToLocalStorage();
    updateCartBadge();
    updateCartModal();
}

function proceedToPayment() {
    if (cart.length === 0) {
        alert('El carrito está vacío.');
        return;
    }

    // Aquí puedes agregar la lógica para procesar el pago
    alert('Procesando el pago...');
    cart = [];
    saveCartToLocalStorage();
    updateCartBadge();
    updateCartModal();
}

function showAddToCartMessage(productName) {
    const addToCartMessage = document.getElementById('addToCartMessage');
    addToCartMessage.textContent = `${productName} se ha agregado al carrito.`;

    const addToCartModal = new bootstrap.Modal(document.getElementById('addToCartModal'));
    addToCartModal.show();
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}