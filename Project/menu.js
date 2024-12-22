async function fetchData() {
    const response = await fetch('https://6762d1f417ec5852cae7350f.mockapi.io/food');
    const data = await response.json();

    try {
        const menuContainer = document.querySelector('.menu-container');
        menuContainer.innerHTML = '';

        data.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('menu-item');

            const button = document.createElement('button');
            button.classList.add('add-to-cart');
            button.textContent = 'Add to cart';
            button.onclick = function () {
                alert(`${item.name} added to cart!`)
                addToCart(item.id);
            };
            // <button class="add-to-cart" menu-id="${item.id}"'}>Add to cart</button>
            menuItem.innerHTML = `
                            <h2>${item.name}</h2>
                            <img src="${item.image}?lock=${item.id}" alt="Pricepage">
                            <span>€${item.price}</span>`;
            menuItem.appendChild(button);

            menuContainer.appendChild(menuItem);
        });
    } catch (error) {
        // console.error("¡ ⛰️ ~ file: menu.js:30 ~ fetchData ~ error⛰️ !", error);
    }

    try {
        const cartContainer = document.querySelector('.cart-container');
        cartContainer.innerHTML = '';
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length !== 0) {
            const cartCount = document.querySelector('.cart-count');
            cartCount.textContent = cart.length;

            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                const details = data.find(dataItem => dataItem.id === item.id);

                cartItem.innerHTML = `
                            <h2>${details.name}</h2>
                            <img src="${details.image}?lock=${details.id}" alt="Pricepage">
                            <span>€${details.price}</span>
                            <span>Quantity: ${item.count}</span>`;

                const removeButton = document.createElement('button');
                removeButton.classList.add('remove-from-cart');
                removeButton.textContent = 'Remove from cart';
                removeButton.onclick = function () {
                    removeFromCart(item.id);
                };
                cartItem.appendChild(removeButton);

                cartContainer.appendChild(cartItem);
            });
        }
    } catch (error) {
        console.error("¡ ⛰️ ~ file: menu.js:30 ~ fetchData ~ error⛰️ !", error);
    }

}

fetchData();

//adds to cart to localstorage
function addToCart(itemId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex(item => item.id === itemId);
    if (index !== -1) {
        cart[index].count++;
    } else {
        cart.push({ id: itemId, count: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log("¡ ⛰️ ~ file: menu.js:33 ~ addToCart ~ cart⛰️ !", cart);
    updateCartCounter();
}

function removeFromCart(itemId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const newCart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(newCart));
    updateCartCounter();
    fetchData();
}


function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.length;
    cartCount.style.display = 'block';
    if (cart.length === 0) {
        cartCount.style.display = 'none';
        return
    }
}
updateCartCounter()