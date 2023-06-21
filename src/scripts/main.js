let menuEmail = document.querySelector(".navbar-email");
let desktopMenu = document.querySelector(".desktop-menu");
let mobileMenu = document.querySelector(".mobile-menu");
let hamMenu = document.querySelector(".menu");
let shopMenu = document.querySelector(".navbar-shopping-cart");
let closeIcon = document.querySelector(".product-detail-close");
let shoppingCartContainer = document.querySelector("#shoppingCartContainer");
let cardsContainer = document.querySelector(".cards-container");
let prodDetail;
let body = document.querySelector("body");

//***************************************************************************************************
//***************************************************************************************************

const productList = [];

productList.push({
  id: 1,
  name: "Computer",
  price: 1200,
  img: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  detail: "Intel Core i9 11th generation, 32GB RAM, SSD 1TB",
  category: "Electronics",
});

productList.push({
  id: 2,
  name: "Bike",
  price: 120,
  img: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  detail: `With its practical position, this bike also fulfills a decorative,
                as your hall or workspace`,
  category: "Others",
});

productList.push({
  id: 3,
  name: "Smart TV",
  price: 500,
  img: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  detail: 'TV 60 " Smart TV',
  category: "Electronics",
});

productList.push({
  id: 4,
  name: "Smartphone",
  price: 750,
  img: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  detail: "Xiaomi Redmi Note 11 Pro",
  category: "Electronics",
});

//***************************************************************************************************
//***************************************************************************************************

function renderProducts(arr) {
  for (let product of arr) {
    let productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.id = product.id;

    let productImg = document.createElement("img");
    productImg.setAttribute("src", product.img);
    productImg.setAttribute("class", "prod");
    productImg.id = product.id;
    productImg.onclick = function () {
      openDetail(product);
    };

    let productInfo = document.createElement("div");
    productInfo.classList.add("product-info");

    let productInfoDiv = document.createElement("div");

    let productPrice = document.createElement("p");
    productPrice.innerText = "$ " + product.price;

    let productName = document.createElement("p");
    productName.innerText = product.name;

    let productInfoFigure = document.createElement("figure");

    let productImgCart = document.createElement("img");
    productImgCart.setAttribute("src", "./src/icons/bt_add_to_cart.svg");
    //productImgCart.setAttribute('alt', 'bike');

    productInfoFigure.appendChild(productImgCart);
    productInfoDiv.appendChild(productPrice);
    productInfoDiv.appendChild(productName);
    productInfo.appendChild(productInfoDiv);
    productInfo.appendChild(productInfoFigure);
    productCard.appendChild(productImg);
    productCard.appendChild(productInfo);
    cardsContainer.appendChild(productCard);
  }
}

//******************************************************************************************************
//******************************************************************************************************

function openDetail(product) {
  console.log(product);
  let isThereActiveProduct =
    document.querySelectorAll("#productDetail").length > 0;
  if (isThereActiveProduct) {
    document.querySelectorAll("#productDetail").forEach((element) => {
      element.remove();
    });
  }

  var productDetailContainer = document.createElement("aside");
  productDetailContainer.id = "productDetail";
  productDetailContainer.classList.add("aside-content", "inactive");
  productDetailContainer.innerHTML = `<div class="product-detail-close" onclick="removeProductDetail()">
                                            <img src="./src/icons/icon_close.png" alt="close" />
                                        </div>`;
  
  productDetailContainer.addEventListener("click",toggleProductDetailContainer);

  let img = document.createElement("img");
  img.src = product.img;
  img.alt = product.name;

  let productInfoContainer = document.createElement("div");
  productInfoContainer.classList.add("product-info");
  productInfoContainer.innerHTML = `<p>$ ${product.price}</p>
                                      <p>${product.name}</p>
                                      <p>${product.detail}</p>`;

  let btn = document.createElement("button");
  btn.classList.add("primary-button", "add-to-cart-button");
  btn.onclick = function () {
    addToShoppingCart(product, btn);
  };
  btn.innerHTML = `<img src="./src/icons/bt_add_to_cart.svg" alt="add" /> <p>Add to Cart</p>
                      <span class="item-to-cart">+1</span>`;

  productDetailContainer.append(img, productInfoContainer, btn);

  if (window.innerWidth > 640) {
    cardsContainer.classList.add("cards-container--aside-open");
  } else {
    body.classList.add("no-scroll");
  }
  body.append(productDetailContainer);
  toggleProductDetail(productDetailContainer);
}

//******************************************************************************************************
//******************************************************************************************************

menuEmail.addEventListener("click", toggleDesktopMenu);

function toggleDesktopMenu() {
  toggleOption(shoppingCartContainer);
  toggleOption(mobileMenu);
  toggleProductDetailContainer("#productDetail");
  desktopMenu.classList.toggle("inactive");
}

//***************************************************************************************************
//***************************************************************************************************

hamMenu.addEventListener("click", toggleMobileMenu);

function toggleMobileMenu() {
  toggleOption(shoppingCartContainer);
  toggleOption(desktopMenu);
  toggleProductDetailContainer("#productDetail");
  mobileMenu.classList.toggle("inactive");
}

//***************************************************************************************************
//***************************************************************************************************

shopMenu.addEventListener("click", toggleShopMenu);

function toggleShopMenu() {
  toggleOption(mobileMenu);
  toggleOption(desktopMenu);
  toggleProductDetailContainer("#productDetail");
  shoppingCartContainer.classList.toggle("inactive");
  if (shoppingCartContainer.classList.contains("inactive")) {
    cardsContainer.classList.remove("cards-container--aside-open");
  }
  if (window.innerWidth <= 640) {
    body.classList.toggle("no-scroll");
  }
}

//****************************************************************************************************
//****************************************************************************************************

//*****************************************************************************************************
//***************************************************************************************************

function toggleProductDetail(query) {
  query.classList.toggle("inactive");
}

//*****************************************************************************************************
//***************************************************************************************************

function removeProductDetail() {
  body.classList.remove("no-scroll");
  let closeDetail = document.querySelector("#productDetail");
  closeDetail.remove();
  cardsContainer.classList.remove("cards-container--aside-open");
}

function toggleOption(element) {
  const question = element.classList.contains("inactive");
  if (!question) {
    element.classList.add("inactive");
  }
}

function toggleProductDetailContainer(element) {
  let item = document.querySelector(element);
  const question = document.querySelectorAll(element).length > 0;
  if (question) {
    document.querySelectorAll(element).forEach((value) => {
      value.remove();
      toggleProductDetail(item);
    });
  }
}

renderProducts(productList);