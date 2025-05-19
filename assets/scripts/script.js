const addToCartButtons = document.querySelectorAll(".add-product-btn");
const cartItemsList = document.querySelector(".cart-items-list");
const totalDisplay = document.querySelector(".cart-summary .total p:last-child");

let cart = [];

addToCartButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const product = btn.closest(".cart");
    const name = product.querySelector(".product-desc").innerText;
    const price = parseFloat(product.querySelector(".price").innerText.replace("$", ""));
    const imageSrc = product.querySelector("img").src;

    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, imageSrc, quantity: 1 });
    }

    renderCart();
  });
});

function renderCart() {
  cartItemsList.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <img src="${item.imageSrc}" alt="Product" class="cart-item-img" />
      <div class="item-details">
        <span class="item-name">${item.name}</span>
        <span class="item-price">$${item.price.toFixed(2)}</span>
      </div>
      <div class="item-quantity-controls">
        <button class="decrease">-</button>
        <span>${item.quantity}</span>
        <button class="increase">+</button>
      </div>
      <button class="remove-item-btn">X</button>
    `;

    cartItem.querySelector(".increase").addEventListener("click", () => {
      item.quantity += 1;
      renderCart();
    });

    cartItem.querySelector(".decrease").addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        cart.splice(index, 1);
      }
      renderCart();
    });

    cartItem.querySelector(".remove-item-btn").addEventListener("click", () => {
      cart.splice(index, 1);
      renderCart();
    });

    cartItemsList.appendChild(cartItem);
  });

  totalDisplay.textContent = `$${total.toFixed(2)}`;
}

document.querySelector(".clear-cart-btn").addEventListener("click", () => {
  cart = [];
  renderCart();
});

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeToggle.classList.remove("fa-moon");
    themeToggle.classList.add("fa-sun");
  } else {
    themeToggle.classList.remove("fa-sun");
    themeToggle.classList.add("fa-moon");
  }
});

