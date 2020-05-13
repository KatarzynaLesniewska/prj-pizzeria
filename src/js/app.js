import { settings, select, classNames } from './settings.js';
import Product from './components/product.js';
import Cart from './components/cart.js';
import Booking from './components/cart.js';

const app = {
  initBooking: function () {
    const thisApp = this;

    // znaleźć wraper booking
    const bookingElem = document.querySelector(select.containerOf.booking);

    // instancja klasy Booking. poza app wywołanie z pomocą app.booking,
    thisApp.booking = new Booking (bookingElem);
  },

  initPages: function () {
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace('#/', '');

    let pageMatchingHash = thisApp.pages[0].id;

    for (let page of thisApp.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);

    for (let link of thisApp.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();

        /* Get page id from href attribute */
        const id = clickedElement.getAttribute['href'].replace('#', '');

        /* run thisApp.activatePage with that id */
        thisApp.activatePage(id);

        /* change url hash */
        window.location.hash = '#/' + id;
      });
    }
  },

  initCart: function () {
    const thisApp = this;

    // wrapper koszyka
    const cartElem = document.querySelector(select.containerOf.cart);
    // instancja klasy Cart. poza app wywołanie z pomocą app.cart, dodawanie prod do koszyka
    thisApp.cart = new Cart(cartElem);

    thisApp.productList = document.querySelector(select.containerOf.menu);

    thisApp.productList.addEventListener('add-to-cart', function (event) {
      app.cart.add(event.detail.product);
    });
  },

  activatePage: function (pageId) {
    const thisApp = this;

    /* add class "active" to page with pageId/ [0] and remove it from all others not matching */
    for (let page of thisApp.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }

    /* add class "active" to matching links and remove it from non-matching */
    for (let link of thisApp.navLinks) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute['href'] == '#' + pageId
      );
    }
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

    thisApp.initPages();
    thisApp.initData();
    thisApp.initCart();
    thisApp.initBooking();
  },
};

app.init();

export default app;
