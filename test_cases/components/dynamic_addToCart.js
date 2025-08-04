const { randomScrolltoCenter, scrollToCenter } = require('./checkouts');

async function dynamic_adding_item(I, category, product) {
  I.say('🗂 Clicking "Kategorier"...');
  I.click(locate('.level-top.static-menu-item').withText('Kategorier'));

  I.say(`📁 Clicking category: ${category}`);
  I.click(category);

  I.say('⏳ Waiting for product grid to load...');
  I.waitForElement('.columns', 10);

  // ✅ If product is not specified, skip search and go straight to random
  if (!product || product.trim() === '') {
    I.say('⚠️ No product specified. Proceeding to random product selection...');
    return await pickRandomProduct(I);
  }

  I.say(`🔍 Looking for product: "${product}"`);

  let productFound = false;

  while (!productFound) {
    const productBlock = locate('.product-item')
      .withDescendant(locate('.product-item-link').withText(product))
      .withDescendant(locate('button').withAttr({ title: 'Læg i kurv' }));

    const found = await I.grabNumberOfVisibleElements(productBlock);

    if (found > 0) {
      I.say(`✅ Found product "${product}". Attempting to click "Læg i kurv"...`);

      const productContainerXpath = `//div[contains(@class, "product-item")][.//a[contains(text(), "${product}")]]`;
      await randomScrolltoCenter(I, productContainerXpath);
      await I.wait(1);

      I.click(productBlock.find('button').withAttr({ title: 'Læg i kurv' }));
      await I.wait(10);
      productFound = true;
      return true;
    }

    I.say('📄 Product not found on this page. Checking for "Load more"...');
    const loadMoreVisible = await I.grabNumberOfVisibleElements('.btn-load-more');

    if (loadMoreVisible > 0) {
      I.say('🔄 Scrolling to and clicking "Load more"...');
      await scrollToCenter(I, '.btn-load-more');
      await I.wait(1);
      I.click('.btn-load-more');
      I.wait(7); // Wait for new items to load
    } else {
      I.say(`❌ No more products to load. Product "${product}" not found.`);
      break;
    }
  }

  // 🔁 Fallback to random if product wasn't found
  if (!productFound) {
    return await pickRandomProduct(I);
  }

  return true;
}

// ✅ Helper function to pick a random product
async function pickRandomProduct(I) {
  I.say('🔁 Attempting to select a random product as fallback...');

  await I.wait(2); // Let DOM settle
  const totalButtons = await I.grabNumberOfVisibleElements('//button[@title="Læg i kurv"]');
  I.say(`🎯 Total "Læg i kurv" buttons found: ${totalButtons}`);

  if (totalButtons > 0) {
    const randomIndex = Math.floor(Math.random() * totalButtons) + 1;
    const randomXpath = `(//button[@title="Læg i kurv"])[${randomIndex}]`;

    try {
      I.say(`🎲 Clicking random "Læg i kurv" button at index ${randomIndex}`);
      await randomScrolltoCenter(I, randomXpath);
      await I.wait(1);
      I.click(randomXpath);
      return true;
    } catch (e) {
      I.say(`❌ Error clicking random button: ${e.message}`);
      return false;
    }
  } else {
    I.say('❌ No "Læg i kurv" buttons available on the page.');
    return false;
  }
}

module.exports = {
  dynamic_adding_item
};
