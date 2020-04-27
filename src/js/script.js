/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    templateOf: {
      menuProduct: '#template-menu-product',
    },
    containerOf: {
      menu: '#product-list',
      cart: '#cart',
    },
    all: {
      menuProducts: '#product-list > .product',
      menuProductsActive: '#product-list > .product.active',
      formInputs: 'input, select',
    },
    menuProduct: {
      clickable: '.product__header',
      form: '.product__order',
      priceElem: '.product__total-price .price',
      imageWrapper: '.product__images',
      amountWidget: '.widget-amount',
      cartButton: '[href="#add-to-cart"]',
    },
    widgets: {
      amount: {
        input: 'input[name="amount"]',
        linkDecrease: 'a[href="#less"]',
        linkIncrease: 'a[href="#more"]',
      },
    },
  };

  const classNames = {
    menuProduct: {
      wrapperActive: 'active',
      imageVisible: 'active',
    },
  };

  const settings = {
    amountWidget: {
      defaultValue: 1,
      defaultMin: 1,
      defaultMax: 9,
    }
  };

  const templates = {
    menuProduct: Handlebars.compile(document.querySelector(select.templateOf.menuProduct).innerHTML),
  };

  class Product {
    constructor(id, data) {
      const thisProduct = this;

      thisProduct.id = id;
      thisProduct.data = data;

      thisProduct.renderInMenu();
      thisProduct.getElements();
      thisProduct.initAccordion();
      thisProduct.initOrderForm();
      thisProduct.processOrder();

      console.log('new Product;', thisProduct);
    }

    renderInMenu() {
      const thisProduct = this;

      /* generate HTML based on template */
      const generatedHTML = templates.menuProduct(thisProduct.data);

      /* create element using utils.createElementFromHTML */
      thisProduct.element = utils.createDOMFromHTML(generatedHTML);

      /* find menu container */
      const menuContainer = document.querySelector(select.containerOf.menu);

      /* add elem to menu */
      menuContainer.appendChild(thisProduct.element);
    }

    getElements() {
      const thisProduct = this;

      thisProduct.accordionTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
      thisProduct.form = thisProduct.element.querySelector(select.menuProduct.form);
      thisProduct.formInputs = thisProduct.form.querySelectorAll(select.all.formInputs);
      thisProduct.cartButton = thisProduct.element.querySelector(select.menuProduct.cartButton);
      thisProduct.priceElem = thisProduct.element.querySelector(select.menuProduct.priceElem);
      thisProduct.imageWrapper = thisProduct.element.querySelector(select.menuProduct.imageWrapper);
    }

    initAccordion() {
      const thisProduct = this;

      /* find the clickable trigger (the element that should react to clicking)
      const productsHeader = thisProduct.element.querySelector(select.menuProduct.clickable); */
      /* START: click event listener to trigger */
      thisProduct.accordionTrigger.addEventListener('click', function (event) {
        console.log('clicked');

        event.preventDefault();
        console.log('preventDefault- działa');

        thisProduct.element.classList.toggle(select.menuProduct.clickable);

        const activeProducts = document.querySelectorAll('.active');
        console.log('activeProducts:', activeProducts);

        for (let activeProduct of activeProducts) {

          if (activeProduct != thisProduct.element) {
            activeProduct.classList.remove(select.menuProduct.clickable);
          }
        }
      });
    }

    initOrderForm() {
      const thisProduct = this;
      console.log('initOrderForm- działa');

      thisProduct.form.addEventListener('submit', function (event) {
        event.preventDefault();
        thisProduct.processOrder();
      });

      for (let input of thisProduct.formInputs) {
        input.addEventListener('change', function () {
          thisProduct.processOrder();
        });
      }

      thisProduct.cartButton.addEventListener('click', function (event) {
        event.preventDefault();
        thisProduct.processOrder();
      });
    }

    processOrder() {
      const thisProduct = this;
      console.log('processOrder- działa');

      /* read all data from the form (using utils.serializeFormToObject) and save it to const formData */
      const formData = utils.serializeFormToObject(thisProduct.form);
      console.log('formData:', formData);

      /* set variable price to equal thisProduct.data.price */
      let price = thisProduct.data.price;
      console.log('price:', price);

      /* START LOOP: for each paramId in thisProduct.data.params */
      for (let paramId of thisProduct.data.params) {
        /* save the element in thisProduct.data.params with key paramId as const param */
        const param = thisProduct.data.params(@paramId)

        /* START LOOP: for each optionId in param.options */
        for (let optionId of thisProduct.data.params.options) {
          /* save the element in param.options with key optionId as const option */
          const optionSelected = formData.hasOwnProperty(paramId) && formData[paramId].indexOf(optionId) > -1;
          /* START IF: if option is selected and option is not default */
          if (optionSelected && !option.default) {
            /* add price of option to variable price */
            totalPrice = price + dataSource.products.params.options.price;
          } /* END IF: if option is selected and option is not default */
          /* START ELSE IF: if option is not selected and option is default */
          if (optionSelected && option.default) {
            /* deduct price of option from price */
            totalPrice = price - dataSource.products.params.options.price;
          }
        }
      }
      thisProduct.priceElem(price);
      console.log(thisProduct.priceElem);
    }

  }

  const app = {
    initMenu: function () {
      const thisApp = this;
      console.log('thisApp.data:', thisApp.data);
      for (let productData in thisApp.data.products) {
        new Product(productData, thisApp.data.products[productData]);
      }
    },
    //to jest deklaracja metody app.initMenu

    initData: function () {
      const thisApp = this;

      thisApp.data = dataSource;
    },

    init: function () {
      const thisApp = this;
      console.log('*** App starting ***');
      console.log('thisApp:', thisApp);
      console.log('classNames:', classNames);
      console.log('settings:', settings);
      console.log('templates:', templates);

      thisApp.initData();
      thisApp.initMenu();
    },
  };

  app.init();

}
