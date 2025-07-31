const { randomScrolltoCenter } = require('./checkouts'); // Adjust path if needed

async function dynamic_adding_item(I, category, product) {
  I.say('Clicking "Kategorier"...');
  I.click(locate('.level-top.static-menu-item').withText('Kategorier'));

  I.say(`Clicking category: ${category}`);
  I.click(category);

  I.say('Waiting for product grid to load...');
  I.waitForElement('.columns', 10);

  I.say('Checking if "Læg i kurv" buttons are present...');
  const addToCartButtons = await I.grabNumberOfVisibleElements('//button[@title="Læg i kurv"]');

  if (addToCartButtons > 0) {
    I.say(`✅ Found ${addToCartButtons} "Læg i kurv" button(s). Looking for specific product: "${product}"`);

    if (product && product.trim() !== '') {
      const productBlock = locate('.product-item')
        .withDescendant(locate('.product-item-link').withText(product))
        .withDescendant(locate('button').withAttr({ title: 'Læg i kurv' }));

      const productFound = await I.grabNumberOfVisibleElements(productBlock);

      if (productFound > 0) {
        I.say(`🛒 Clicking "Læg i kurv" for product "${product}"`);
        await randomScrolltoCenter(I, `//div[contains(@class, "product-item")][.//a[contains(text(), "${product}")]]//button[@title="Læg i kurv"]`);
        I.click(productBlock.find('button').withAttr({ title: 'Læg i kurv' }));
        return true;
      } else {
        I.say(`⚠️ Product "${product}" not found or no direct add to cart. Falling back...`);
      }
    }

    const randomIndex = Math.floor(Math.random() * addToCartButtons) + 1;
    const xpath = `(//button[@title="Læg i kurv"])[${randomIndex}]`;

    I.say(`🎲 Scrolling to and clicking random "Læg i kurv" button #${randomIndex}`);
    await randomScrolltoCenter(I, xpath);
    I.click(xpath);
    I.wait(10);
    return true;
  } else {
    I.say('❌ No "Læg i kurv" buttons found in this category.');
    return false;
  }
}

module.exports = { dynamic_adding_item };
