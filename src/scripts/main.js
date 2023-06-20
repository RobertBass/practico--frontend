let menuEmail = document.querySelector('.navbar-email');
let desktopMenu = document.querySelector('.desktop-menu');
let mobileMenu = document.querySelector('.mobile-menu');
let hamMenu = document.querySelector('.menu')
let shopMenu = document.querySelector('.navbar-shopping-cart');
let closeIcon = document.querySelector('.product-detail-close');
let shoppingCartContainer = document.querySelector('#shoppingCartContainer');
let cardsContainer = document.querySelector('.cards-container');
let body = document.querySelector("body");

menuEmail.addEventListener('click', toggleDesktopMenu);
hamMenu.addEventListener('click', toggleMobileMenu);
shopMenu.addEventListener('click', toggleShopMenu);

function toggleDesktopMenu(){
    const isShopMenuClosed = shoppingCartContainer.classList.contains('inactive');
    const isMobileMenuClosed = mobileMenu.classList.contains('inactive');
    const isProductDetailClosed = productDetailContainer.classList.contains('inactive');
    if(!isShopMenuClosed){
        shoppingCartContainer.classList.add('inactive');
    } else if(!isMobileMenuClosed){
        mobileMenu.classList.add('inactive');
    } else if(!isProductDetailClosed){
        productDetailContainer.classList.add('inactive');
    }

    desktopMenu.classList.toggle('inactive');
}

function toggleMobileMenu(){
    const isShopMenuClosed = shoppingCartContainer.classList.contains('inactive');
    const isDesktopMenuClosed = desktopMenu.classList.contains('inactive');
    const isProductDetailClosed = productDetailContainer.classList.contains('inactive');
    if(!isShopMenuClosed){
        shoppingCartContainer.classList.add('inactive');
    } else if(!isDesktopMenuClosed){
        desktopMenu.classList.add('inactive');
    } else if(!isProductDetailClosed){
        productDetailContainer.classList.add('inactive');
    }

    mobileMenu.classList.toggle('inactive');
}

function toggleShopMenu(){
    const isMobileMenuClosed = mobileMenu.classList.contains('inactive');
    const isDesktopMenuClosed = desktopMenu.classList.contains('inactive');
    const isProductDetailClosed = productDetailContainer.classList.contains('inactive');
    if(!isMobileMenuClosed){
        mobileMenu.classList.add('inactive');
    } else if(!isDesktopMenuClosed){
        desktopMenu.classList.add('inactive');
    } else if(!isProductDetailClosed){
        productDetailContainer.classList.add('inactive');
    }

    shoppingCartContainer.classList.toggle('inactive');
}

function openDetail(product){
  let isThereActiveProduct =
    document.querySelectorAll("#productDetail").length > 0;
  if (isThereActiveProduct) {
    document.querySelectorAll("#productDetail").forEach((element) => {
      element.remove();
    });
  }

  let productDetailContainer = document.createElement('aside');
  productDetailContainer.id = 'productDetail';
  productDetailContainer.classList.add('aside-content');
  productDetailContainer.innerHTML = `<div class="product-detail-close" onclick="removeProductDetail()">
    <img src="./src/icons/icon_close.png" alt="close" />
    </div>`;

  let img = document.createElement('img');
  img.src = product.img;
  img.alt = product.name;

  let productInfoContainer = document.createElement('div');
  productInfoContainer.classList.add('product-info');
  productInfoContainer.innerHTML = `<p>$ ${product.price}</p><p>${product.name}</p><p>${product.detail}</p>`

  let btn = document.createElement('button');
  btn.classList.add('primary-button', 'add-to-cart-button');
  btn.onclick = function(){addToShoppingCart(product, btn)};
  btn.innerHTML = `<img src="./src/icons/bt_add_to_cart.svg" alt="add" /> <p>Add to Cart</p>
                    <span class="item-to-cart"></span>`;

  productDetailContainer.append(img, productInfoContainer, btn);

  if(window.innerWidth > 992){
    cardsContainer.classList.add("cards-container--aside-open");
  } else{
    body.classList.add("no-scroll");
  }
  body.append(productDetailContainer);

  //productDetailContainer.classList.remove("inactive");
}

function removeProductDetail(){
    body.classList.remove("no-scroll");
    
    let productResume = document.querySelector("#productDetail");
    productResume.remove();
    cardsContainer.classList.remove("cards-container--aside-open");
  }

function closeDetail(){
    productDetailContainer.classList.add('inactive');
}

const productList = [];
productList.push({
    name: 'Bike',
    price: 120,
    img: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    detail: `With its practical position, this bike also fulfills a decorative,
     as your hall or workspace`,
     category: 'Others'
});

productList.push({
    name: 'Televisor',
    price: 500,
    img: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    detail: 'TV 60 " Smart TV',
    category: 'Electronics'
});

productList.push({
    name: 'Computadora',
    price: 1200,
    img: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    detail: 'Intel Core i9 11th generation, 32GB RAM, SSD 1TB',
    category: 'Electronics'
});

function renderProducts(arr){
    for(product of arr){
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
    
        const productImg = document.createElement('img');
        productImg.setAttribute('src', product.img);
        productImg.setAttribute('class', 'prod');
        productImg.onclick = function(){openDetail(product);};
    
        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info');
    
        const productInfoDiv = document.createElement('div');
    
        const productPrice = document.createElement('p');
        productPrice.innerText = '$ ' + product.price;
    
        const productName = document.createElement('p');
        productName.innerText = product.name;
    
        const productInfoFigure = document.createElement('figure');
        const productImgCart = document.createElement('img');
        productImgCart.setAttribute('src', './src/icons/bt_add_to_cart.svg');
        productImgCart.setAttribute('alt', 'bike');
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

renderProducts(productList);





