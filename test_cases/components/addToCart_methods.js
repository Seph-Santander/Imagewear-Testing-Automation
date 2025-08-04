//simple Adding Product to Cart

async function addToCart(I, category, productname) {

  I.say('Clicking "Kategorier"...');
  I.click(locate('.level-top.static-menu-item').withText('Kategorier'));

  I.say(`Clicking category: ${category}`);
  I.click(category);

  I.say('Waiting for product grid to load...');
  I.waitForElement('.columns', 10); 

  let productFound = false;

  while (!productFound) {
    I.say(`Looking for product: ${productname}`);

    const isVisible = await I.grabNumberOfVisibleElements(
      locate('.product-item-link').withText(productname)
    );

    if (isVisible > 0) {
      I.say(`Product "${productname}" found. Clicking it...`);
      I.click(locate('.product-item-link').withText(productname));
      productFound = true;

      I.click(locate('#product-addtocart-button').withText('Læg i kurv'));
        I.wait(5);


    } else {
      I.say('Product not found yet. Checking for "Load More"...');
      const loadMoreVisible = await I.grabNumberOfVisibleElements('.btn-load-more');

      if (loadMoreVisible > 0) {
        I.say('Scrolling to "Load More" button...');
        await I.executeScript(() => {
          const btn = document.querySelector('.btn-load-more');
          if (btn) {
            btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });

        I.wait(2); 

        I.say('Clicking "Load More"...');
        I.click('.btn-load-more');
        I.wait(4);
      } else {
        I.say(`No more products to load. Product "${productname}" not found.`);
        throw new Error(`Product "${productname}" not found.`);
      }
    }
  }
};

//Adding Multiple Products to Cart With Different Sizes

async function addToCartMultiple(I, category, subcategories, productname) {
  I.say('Clicking "Kategorier"...');
  I.click(locate('.level-top.static-menu-item').withText('Kategorier'));

  I.say(`Clicking category: ${category}`);
  I.click(category);

  I.say('Waiting for product grid to load...');
  I.waitForElement('.columns', 5);

  I.say(`Clicking subcategory: ${subcategories}`);
  I.click(locate('.subcategories-box').withText(subcategories));

  let productFound = false;

  while (!productFound) {
    I.say(`Looking for product: ${productname}`);

    const isVisible = await I.grabNumberOfVisibleElements(
      locate('.product-item-link').withText(productname)
    );

    if (isVisible > 0) {
      I.say(`Product "${productname}" found. Clicking it...`);
      I.click(locate('.product-item-link').withText(productname));
      productFound = true;

      I.fillField('.wk-configurations-qty[data-attribute-position="115"]', '1');
      I.fillField('.wk-configurations-qty[data-attribute-position="4"]', '1');
      I.fillField('.wk-configurations-qty[data-attribute-position="6"]', '1');

      I.click(locate('#product-addtocart-button').withText('Læg i kurv'));
      I.wait(5);

    } else {
      I.say('Product not found yet. Checking for "Load More"...');
      const loadMoreVisible = await I.grabNumberOfVisibleElements('.btn-load-more');

      if (loadMoreVisible > 0) {
        I.say('Scrolling to "Load More" button...');
        await I.executeScript(() => {
          const btn = document.querySelector('.btn-load-more');
          if (btn) {
            btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });

        I.wait(1);

        I.say('Clicking "Load More"...');
        I.click('.btn-load-more');
        I.wait(3);
      } else {
        I.say(`No more products to load. Product "${productname}" not found.`);
        throw new Error(`Product "${productname}" not found.`);
      }
    }
  }
};

async function validateQuantityBtn(I) {
  I.say('Clicking increment button...');
  I.click(locate('.qty-inc'));
  I.wait(1);

  I.say('Waiting for add-to-cart button to appear...');
  I.waitForElement('#product-addtocart-button', 10); // Wait up to 10 seconds

  I.say('Validating quantity increment button...');
  I.seeElement('#product-addtocart-button'); // Confirm it exists

  I.click('#product-addtocart-button'); // Now click it

  I.say('Validating that the quantity has been incremented...');
}


module.exports = {
  addToCart,
  addToCartMultiple,
  validateQuantityBtn
};
