//simple Adding Product to Cart
const { scrollToCenter } = require('./checkouts');

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

// utils/sliderAddToCart.js
async function clickFavoriteAddToCartByIndex(I, productName) {
  const containerXPath = '//*[@id="favorite-product"]/div/div/div[1]/div';
  const productCardXPath = `${containerXPath}//div[contains(@class, 'product-item')]`;

  const arrowRightSelector = '.porto-icon-angle-right';
  const arrowLeftSelector = '.porto-icon-angle-left';

  const seenProducts = new Set();
  const maxScrolls = 15;

  I.say(`🔍 Searching for product: "${productName}"`);

  async function tryScroll(direction = 'left') {
    const arrowSelector = direction === 'right' ? arrowRightSelector : arrowLeftSelector;

    for (let scrollCount = 0; scrollCount < maxScrolls; scrollCount++) {
      let newProductFound = false;

      const productCount = await I.executeScript((xp) => {
        const result = document.evaluate(xp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        return result.snapshotLength;
      }, productCardXPath);

      for (let i = 1; i <= productCount; i++) {
        const nameXPath = `(${productCardXPath})[${i}]//a[contains(@class, 'product-item-link')]`;
        const addToCartXPath = `(${productCardXPath})[${i}]//button[contains(@class, 'tocart')]`;

        const isVisible = await I.grabNumberOfVisibleElements(nameXPath);
        if (!isVisible) continue;

        const name = await I.grabTextFrom(nameXPath);

        if (!seenProducts.has(name)) {
          newProductFound = true;
          seenProducts.add(name);
          I.say(`👁️ Checking product: ${name}`);

          if (name.includes(productName)) {
            I.say(`✅ Found: "${name}"`);
            await scrollToCenter(I, nameXPath);
            await I.wait(1);
            await I.click(addToCartXPath);
            return true;
          }
        }
      }

      if (!newProductFound) {
        I.say(`⚠️ No new products found during ${direction} scroll step ${scrollCount + 1}.`);
        return false;
      }

      I.say(`${direction === 'right' ? '➡️' : '⬅️'} Clicking ${direction} arrow (step ${scrollCount + 1})...`);
      const isArrowVisible = await I.grabNumberOfVisibleElements(arrowSelector);
      if (isArrowVisible) {
        await I.click(arrowSelector);
        await I.wait(1.5);
      } else {
        I.say(`❌ ${direction} arrow not visible.`);
        return false;
      }
    }

    return false;
  }

  const foundRight = await tryScroll('right');
  if (foundRight) return;

  I.say(`🔄 Redirecting to left scroll...`);
  const foundLeft = await tryScroll('left');
  if (foundLeft) return;

  throw new Error(`❌ Product "${productName}" not found after scrolling both directions.`);
}

//=============================================================================

async function clickNyeAddToCartByIndex(I, productName) {
  const containerXPath = '//*[@id="new-products"]/div/div/div[1]/div';
  const productCardXPath = `${containerXPath}//div[contains(@class, 'product-item')]`;

  const arrowRightSelector = '.porto-icon-angle-right';
  const arrowLeftSelector = '.porto-icon-angle-left';

  const seenProducts = new Set();
  const maxScrolls = 15;

  I.say(`🔍 Searching for product: "${productName}"`);

  async function tryScroll(direction = 'left') {
    const arrowSelector = direction === 'right' ? arrowRightSelector : arrowLeftSelector;

    for (let scrollCount = 0; scrollCount < maxScrolls; scrollCount++) {
      let newProductFound = false;

      const productCount = await I.executeScript((xp) => {
        const result = document.evaluate(xp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        return result.snapshotLength;
      }, productCardXPath);

      for (let i = 1; i <= productCount; i++) {
        const nameXPath = `(${productCardXPath})[${i}]//a[contains(@class, 'product-item-link')]`;
        const addToCartXPath = `(${productCardXPath})[${i}]//button[contains(@class, 'tocart')]`;

        const isVisible = await I.grabNumberOfVisibleElements(nameXPath);
        if (!isVisible) continue;

        const name = await I.grabTextFrom(nameXPath);

        if (!seenProducts.has(name)) {
          newProductFound = true;
          seenProducts.add(name);
          I.say(`👁️ Checking product: ${name}`);

          if (name.includes(productName)) {
            I.say(`✅ Found: "${name}"`);
            await scrollToCenter(I, nameXPath);
            await I.wait(1);
            await I.click(addToCartXPath);
            return true;
          }
        }
      }

      if (!newProductFound) {
        I.say(`⚠️ No new products found during ${direction} scroll step ${scrollCount + 1}.`);
        return false;
      }

      I.say(`${direction === 'right' ? '➡️' : '⬅️'} Clicking ${direction} arrow (step ${scrollCount + 1})...`);
      const isArrowVisible = await I.grabNumberOfVisibleElements(arrowSelector);
      if (isArrowVisible) {
        await I.click(arrowSelector);
        await I.wait(1.5);
      } else {
        I.say(`❌ ${direction} arrow not visible.`);
        return false;
      }
    }

    return false;
  }

  const foundRight = await tryScroll('right');
  if (foundRight) return;

  I.say(`🔄 Redirecting to left scroll...`);
  const foundLeft = await tryScroll('left');
  if (foundLeft) return;

  throw new Error(`❌ Product "${productName}" not found after scrolling both directions.`);
}

//==============================================================================



async function fillQtyInputs(I, numberToFill = 1, quantity = 1) {
  const inputSelector = 'input.wk-configurations-qty';
  const totalInputs = await I.grabNumberOfVisibleElements(inputSelector);
  I.say(`🔍 Found ${totalInputs} input(s)`);

  if (totalInputs === 0) {
    I.say('❌ No input fields found.');
    return;
  }

  const fillCount = Math.min(numberToFill, totalInputs);
  I.say(`🖊 Filling ${fillCount} input(s) with quantity "${quantity}"`);

  for (let i = 1; i <= fillCount; i++) {
    const xpath = `(//input[contains(@class, 'wk-configurations-qty')])[${i}]`;
    const locator = locate('input.wk-configurations-qty').at(i);

    await scrollToCenter(I, xpath); // Scroll before filling
    await I.wait(2);

    // Clear field first
    I.say(`🧹 Clearing input #${i}`);
    await I.clearField(locator);

    // Then fill it
    await I.fillField(locator, quantity.toString());
    I.say(`✅ Filled input #${i} with ${quantity}`);
  }
}





module.exports = {
  addToCart,
  addToCartMultiple,
  validateQuantityBtn,
  clickFavoriteAddToCartByIndex,
  clickNyeAddToCartByIndex,
  fillQtyInputs
};
