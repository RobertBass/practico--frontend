let menuEmail = document.querySelector(".navbar-email");
let desktopMenu = document.querySelector(".desktop-menu");
let mobileMenu = document.querySelector(".mobile-menu");
let hamMenu = document.querySelector(".menu");
let shopMenu = document.querySelector(".navbar-shopping-cart");
let closeIcon = document.querySelector(".product-detail-close");
let shoppingCartContainer = document.querySelector("#shoppingCartContainer");
let cardsContainer = document.querySelector(".cards-container");
let body = document.querySelector("body");
let orderContainer = document.querySelector(".my-order-content");
let backtoHomeBtn = document.querySelector("#back-to-home");
let CheckoutBtn = document.querySelector("#checkout")
let prodDetail;
let productList = [];
let shoppingCart = [];



/***************************************************************************************************
  ARRAY OF PRODUCTS
****************************************************************************************************/



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

/****************************************************************************************************
 RENDER OF PRODUCTS IN MAIN WINDOW
*****************************************************************************************************/

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


/****************************************************************************************************
 RENDER OF PRODUCTS IN SHOPPING CART
*****************************************************************************************************/

function renderProductsListOfCart(){
  orderContainer.innerHTML = "";
  let groupItems = [];
  let aux = shoppingCart;

  while(aux.length > 0){

    let group = aux.filter((product) => {
      return product.name === aux[0].name;
    });

    groupItems.push(group);
    
    aux = aux.filter((product) => {
      return product.name !== group[0].name;
    });
  }

  groupItems.forEach((groups) => {
    let subTotal = 0;
    let quantity = 0;
    let priceGroup = groups[0].price;
    let nameGroup = groups[0].name;
    let imgGroup = groups[0].img;

    for(article of groups){
      subTotal += article.price;
      quantity++;
    }

    let productInCart = document.createElement("div");
    productInCart.classList.add("shopping-cart");
    productInCart.innerHTML = 
        `<figure>
          <img
            src="${imgGroup}"
            alt="${nameGroup}">
        </figure>
        <p>${nameGroup}</p>
        <p class="shopping-cart__price">($${priceGroup} x ${quantity}) $${subTotal}</p>
        <img src="./src/icons/icon_close.png" alt="close">`

    orderContainer.appendChild(productInCart);
  });
}

/******************************************************************************************************
  OPEN DETAIL OF PRODUCT SELECTED
*******************************************************************************************************/

function openDetail(product) {
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
  
  productDetailContainer.addEventListener("click",toggleProductDetailContainer('#productDetail'));

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
  toggleItem(productDetailContainer);
}

/******************************************************************************************************
  FILTER CATEGORIES
*******************************************************************************************************/

function filterProducts(category, itemSelected){
  let categories = Array.from(document.querySelectorAll('a'));
  let menus = categories.filter((item) => {
    return item.classList.contains('item');
  });

  menus.forEach((item) => {
    if(item.classList.contains('item-active')){
      item.classList.remove('item-active');
    }
  });

  menus.forEach((item) => {
    if(item.textContent === itemSelected.textContent){
      item.classList.add('item-active');
    }
  });

  cardsContainer.innerHTML = "";

  if(!mobileMenu.classList.contains('inactive')){
    toggleOption(mobileMenu);
  }

  if(category === 'All'){
    renderProducts(productList);
    return;
  }

  let filteredProducts = productList.filter((product) => {
    return product.category == category;
  });

  renderProducts(filteredProducts);

}

/******************************************************************************************************
  EVENT LISTENER
*******************************************************************************************************/

menuEmail.addEventListener("click", toggleDesktopMenu);
function toggleDesktopMenu() {
  toggleOption(shoppingCartContainer);
  toggleOption(mobileMenu);
  toggleProductDetailContainer("#productDetail");
  desktopMenu.classList.toggle("inactive");
}


hamMenu.addEventListener("click", toggleMobileMenu);
function toggleMobileMenu() {
  toggleOption(shoppingCartContainer);
  toggleOption(desktopMenu);
  toggleProductDetailContainer("#productDetail");
  mobileMenu.classList.toggle("inactive");
}


shopMenu.addEventListener("click", toggleShopMenu);
function toggleShopMenu() {
  toggleOption(mobileMenu);
  toggleOption(desktopMenu);
  toggleProductDetailContainer("#productDetail");
  shoppingCartContainer.classList.toggle("inactive");
  if (shoppingCartContainer.classList.contains("inactive")) {
    cardsContainer.classList.remove("cards-container--aside-open");
  } if (window.innerWidth <= 640) {
      body.classList.toggle("no-scroll");
  }
}

backtoHomeBtn.addEventListener('click', toggleShopMenu);

/****************************************************************************************************
  ADD TO SHOPPING CART FUNCTIONS
*****************************************************************************************************/

function addToShoppingCart(product, btn){
  let itemToCart = btn.lastElementChild;
  itemToCart.classList.add("to-cart-animation");

  setTimeout(() => {
    itemToCart.classList.remove("to-cart-animation");
  }, 10000);

  shoppingCart.push(product);
  counter();
  renderProductsListOfCart();
  refreshOrderTotal();
}


function counter(){
  let itemsCounter = document.querySelector("#items-counter");
  if(parseInt(shoppingCart.length) === 0){
    itemsCounter.classList.add("inactive");
  } else{
    itemsCounter.classList.remove("inactive");
  }
  itemsCounter.innerHTML = shoppingCart.length;
}


function refreshOrderTotal(){
  let orderTotal = document.querySelector("#order-total");
  let total = 0;
  shoppingCart.forEach((product) =>{
    total += product.price;
  });

  orderTotal.innerHTML = `$ ${total}`;
}

//*****************************************************************************************************
// OTHER FUNCTIONS
//*****************************************************************************************************

function toggleItem(item) {
  item.classList.toggle("inactive");
}


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
      toggleItem(item);
    });
  }
}

function removeNoScroll() {
  let isThereActiveProduct = document.querySelectorAll("#productDetail").length > 0;

  if(window.innerWidth > 640){
    body.classList.remove("no-scroll");
  } else if (isThereActiveProduct){
    body.classList.add("no-scroll");
    cardsContainer.classList.remove("cards-container--aside-open");

  }

  if(isThereActiveProduct && window.innerWidth > 640){
    cardsContainer.classList.add("cards-container--aside-open");
  }
}


//***********************************************************************************************************
// CALLING FUNCTIONS
//***********************************************************************************************************

renderProducts(productList);
renderProductsListOfCart();
counter();
refreshOrderTotal();
window.onresize = removeNoScroll;
//CheckoutBtn.onclick = () => { alert("Muchas gracias por ver esta demo, aún le faltan muchas funcionalidades, pero seguiré actualizando el proyecto..."); };