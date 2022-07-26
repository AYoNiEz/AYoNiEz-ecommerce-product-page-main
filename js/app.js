const menu = document.querySelector(".nav-menu");
const hamburger = document.querySelector(".hamburger");
const close = document.getElementById("close");

const btnPlus = document.querySelector('#btnPlus');
const btnMinus = document.querySelector('#btnMinus');
const amountNumber = document.querySelector(".amout-number");



const btnNext = document.querySelector('.next');
const btnPrevious = document.querySelector('.prev');


const gallery = document.querySelectorAll('.pic');
const bannerImg = document.querySelector('.product-banner');

let numberValue = 1;
let productInCart = 0;
let price = 250.00;
let discount = 0.5;

const cart = document.querySelector(".cart-box");
const btnCart = document.querySelector(".cart-btn");

const btnAddToCart = document.querySelector(".btn");
const cartCount = document.querySelector(".cart-count")
const productInShoppingCart = document.querySelector(".product-in-cart")
const msgEmpty = document.querySelector(".msg-empty");
const checkOut = document.querySelector(".checkout");

const overlay = document.querySelector('.overlay');
const lightbox = document.querySelector('.lightbox');

let lightboxGallery;
let lightboxHero;


bannerImg.addEventListener('click', onBannerImgClick);


btnPlus.addEventListener('click', amountPlus);
btnMinus.addEventListener('click', amountMinus);

hamburger.addEventListener('click', openMenu);
close.addEventListener('click',closeMenu);

gallery.forEach(img => {
    img.addEventListener('click', onThumbClick);
});

btnNext.addEventListener('click', handleBtnClickNext);
btnPrevious.addEventListener('click', handleBtnClickPrevious);
btnAddToCart.addEventListener('click', addToCart);

function onThumbClick(event) {
    //clear active state for all thumbnails
    gallery.forEach(img => {
        img.classList.remove('active');
    });
    //set active thumbnail
    event.target.parentElement.classList.add('active');
    //update hero image
    bannerImg.src = event.target.src.replace('-thumbnail', '');
}


btnCart.addEventListener('click',openCart);

function openMenu() {
    menu.classList.remove('hidden');
}
function closeMenu(){
    menu.classList.add('hidden');
}
function openCart(){
    cart.classList.toggle('hidden');
}


function amountPlus(){
    setProductCounter(1);
}
function amountMinus(){
    setProductCounter(-1);
}

function setProductCounter(value){
    if ((numberValue + value) > 0) {
        numberValue += value;
        amountNumber.innerHTML = numberValue;
    }
}

function handleBtnClickNext() {
    let imageIndex = getCurrentImageIndex();
    imageIndex++;
    if (imageIndex > 4) {
        imageIndex = 1;
    }
    setHeroImage(imageIndex);
}

function handleBtnClickPrevious() {
    let imageIndex = getCurrentImageIndex();
    imageIndex--;
    if (imageIndex < 1) {
        imageIndex = 4;
    }
    setHeroImage(imageIndex);
}

function getCurrentImageIndex() {
    const imageIndex = parseInt(bannerImg.src.split('\\').pop().split('/').pop().replace('.jpg', '').replace('image-product-', ''));
    return imageIndex;
}

function setHeroImage(imageIndex) {
    bannerImg.src = `./images/image-product-${imageIndex}.jpg`;
    //images are not sync
    gallery.forEach(img => {
        img.classList.remove('active');
    });
    //set active thumbnail
    gallery[imageIndex-1].classList.add('active');
}
function addToCart(){
    productInCart += numberValue;

    const productHTMLElement = `
        <div class="item">
            <img class="product-image" src="/images/image-product-1-thumbnail.jpg" alt="product-1-thumbnail">
            <div class="details">
              <div class="product-name">Autumn Limited Edition...</div>
              <div class="price-group">
                <div class="price">$${(price*discount).toFixed(2)}</div> x
                <div class="count">${productInCart}</div>
                <div class="total-amount">$${(price*discount*productInCart).toFixed(2)}</div>
              </div>
            </div>
            <img id="btnDelete" src="/images/icon-delete.svg" alt="delete">
        </div>
    `;

    productInShoppingCart.innerHTML = productHTMLElement;
    updateCart()

    const deleteProduct = document.querySelector("#btnDelete");

    deleteProduct.addEventListener('click', onBtnDeleteClick)
    //console.log(productInCart);
}
function updateCart(){
    updateCartIcon()
    updateMsgEmpty()
    updateCheckOut()
}
function updateCartIcon(){
    cartCount.textContent = productInCart;

    if (cartCount == 0) {
        if(!cartCount.classList.contains('hidden')){
            cartCount.classList.add('hidden');
        }
    }else{
        cartCount.classList.remove('hidden');
    }
}
function updateMsgEmpty(){
  if(productInCart == 0){
    if(msgEmpty.classList.contains('hidden')){
        msgEmpty.classList.remove('hidden');
    }
  }else{
    if(!msgEmpty.classList.contains('hidden')){
        msgEmpty.classList.add('hidden');
    }
  }
}
function updateCheckOut(){
    if(productInCart == 0){
        if(!checkOut.classList.contains('hidden')){
            checkOut.classList.add('hidden');
        }
    }else{
        checkOut.classList.remove('hidden');
    }
}
function onBtnDeleteClick() {
    productInCart--;
    updateCart();

    const el = document.querySelector('.count');
    const totalAmount = document.querySelector('.total-amount');
    el.innerHTML = productInCart;
    totalAmount.innerHTML = `$${(price*discount*productInCart).toFixed(2)}`;

    if (productInCart == 0) {
        productInShoppingCart.innerHTML = '';
    }
}
function onBannerImgClick() {
    if (window.innerWidth >= 1440) {
        if (overlay.childElementCount == 1) {
            const newNode = lightbox.cloneNode(true);
            overlay.appendChild(newNode);

            const btnOverlayClose = document.querySelector('#btnOverlayClose');
            btnOverlayClose.addEventListener('click', onBtnOverlayClose);

            lightboxGallery = overlay.querySelectorAll('.pic');
            lightboxHero = overlay.querySelector('.product-banner');
            lightboxGallery.forEach(img => {
                img.addEventListener('click', onThumbClickLightbox);
            });

            const btnOverlayNext = overlay.querySelector('.next');
            const btnOverlayPrevious = overlay.querySelector('.prev');
            btnOverlayNext.addEventListener('click', handleBtnClickNextOverlay);
            btnOverlayPrevious.addEventListener('click', handleBtnClickPreviousOverlay);
        }
        overlay.classList.remove('hidden');
    }
}

function onBtnOverlayClose() {
    overlay.classList.add('hidden');
}

function onThumbClickLightbox(event) {
    //clear active state for all thumbnails
    lightboxGallery.forEach(img => {
        img.classList.remove('active');
    });
    //set active thumbnail
    event.target.parentElement.classList.add('active');
    //update hero image
    lightboxHero.src = event.target.src.replace('-thumbnail', '');
}


function handleBtnClickNextOverlay() {
    let imageIndex = getOverlayCurrentImageIndex();
    imageIndex++;
    if (imageIndex > 4) {
        imageIndex = 1;
    }
    setOverlayHeroImage(imageIndex);
}

function handleBtnClickPreviousOverlay() {
    let imageIndex = getOverlayCurrentImageIndex();
    imageIndex--;
    if (imageIndex < 1) {
        imageIndex = 4;
    }
    setOverlayHeroImage(imageIndex);
}

function getOverlayCurrentImageIndex() {
    const imageIndex = parseInt(lightboxHero.src.split('\\').pop().split('/').pop().replace('.jpg', '').replace('image-product-', ''));
    return imageIndex;
}

function setOverlayHeroImage(imageIndex) {
    lightboxHero.src = `./images/image-product-${imageIndex}.jpg`;
    //images are not sync
    lightboxGallery.forEach(img => {
        img.classList.remove('active');
    });
    //set active thumbnail
    lightboxGallery[imageIndex-1].classList.add('active');
}
