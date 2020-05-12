import {settings, select} from './settings.js';
import Product from './components/product.js';
import Cart from './components/cart.js';

const app = {
  initPages: function () {
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
  },

  initMenu: function () {
    const thisApp = this;
    // console.log('thisApp.data:', thisApp.data);
    for (let productData in thisApp.data.products) {
      // new Product(productData, thisApp.data.products[productData]);
      new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);
    }
  },

  initData: function () {
    const thisApp = this;

    thisApp.data = {};

    const url = settings.db.url + '/' + settings.db.product;

    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        console.log('parsedResponse:', parsedResponse);

        /* save parsedResponse as thisApp.data.products */
        thisApp.data.products = parsedResponse;

        /* execute initMenu method */
        thisApp.initMenu();
      });
    console.log('thisApp.data:', JSON.stringify(thisApp.data));
  },

  init: function () {
    const thisApp = this;
    // console.log('*** App starting ***');
    // console.log('thisApp:', thisApp);
    // console.log('classNames:', classNames);
    // console.log('settings:', settings);
    // console.log('templates:', templates);

    thisApp.initData();
    thisApp.initCart();
  },

  initCart: function () {
    const thisApp = this;

    // wrapper koszyka
    const cartElem = document.querySelector(select.containerOf.cart);
    // instancja klasy Cart. poza app wywołanie z pomocą app.cart, dodawanie prod do koszyka
    thisApp.cart = new Cart(cartElem);

    thisApp.productList = document.querySelector(select.containerOf.menu);

    thisApp.productList.addEventListener('add-to-cart', function(event) {
      app.cart.add(event.detail.product);
    });
  },
};

app.init();
