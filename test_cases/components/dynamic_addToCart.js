const { randomScrolltoCenter, scrollToCenter } = require('./checkouts');

async function dynamic_adding_item(I, category, product) {
  I.say('Clicking "Kategorier"...');
  I.click(locate('.level-top.static-menu-item').withText('Kategorier'));

  I.say(`Clicking category: ${category}`);
  I.click(category);

  I.say('Waiting for product grid to load...');
  I.waitForElement('.columns', 10);

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
      I.say(`❌ No more products to load. Product "${product}" not found.`)
      break;
    }
  }

  // 🔁 Random fallback
  const addToCartButtons = await I.grabNumberOfVisibleElements('//button[@title="Læg i kurv"]');
  if (addToCartButtons > 0) {
    const randomIndex = Math.floor(Math.random() * addToCartButtons) + 1;
    const randomXpath = `(//button[@title="Læg i kurv"])[${randomIndex}]`;

    I.say(`🎲 Scrolling to and clicking random "Læg i kurv" button #${randomIndex}`);
    await randomScrolltoCenter(I, randomXpath);
    await I.wait(1);
    I.click(randomXpath);
    I.wait(10);
    return true;
  } else {
    I.say('❌ Still no "Læg i kurv" buttons available.');
    return false;
  }
}

module.exports = {
  dynamic_adding_item
};
