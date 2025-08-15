const { loginCredentials } = require('../../components/simple_userLogin');
const { OpenFavoritesPage } = require('../../components/favorites');
const { scrollToCenter, checkoutMethod1, checkCouponCode } = require('../../components/checkouts');

Feature('Adding Item to Wishlist');

Scenario('User logs in and adds item to wishlist with comment and quantity', async ({ I }) => {
  const { email, password } = codeceptjs.config.get().custom;
  
  const couponCode = '1902testqa';
  const comment = 'this is a test order from 1902';
  const wishComment = 'this is my fave!';

  //==========================================================================================================================
  //User Login
  await loginCredentials(I, email, password);
  I.wait(2);

  //Open Wishlist page
  await OpenFavoritesPage(I);

  // Filter by category
  I.click('//button[./span[text()="Hoved kategori"]]');
  I.waitForElement('//button[./span[text()="Steward"]]', 10);
  I.click('//button[./span[text()="Steward"]]');
  I.wait(2);

  // Add comment
  const commentSelector = '#product-item-comment-102376';
  await scrollToCenter(I, commentSelector);
  I.fillField(commentSelector, wishComment);

  // Update wishlist
  await scrollToCenter(I, 'button[title="Opdater ønskeliste"]');
  I.wait(1);
  I.forceClick('button[title="Opdater ønskeliste"]');
  I.wait(3);

  // Reload the Page
  I.amOnPage('https://imgwear246.1902dev1.com/wishlist/');
  I.wait(3);
  I.click('//button[./span[text()="Steward"]]');
  I.wait(3);
  await scrollToCenter(I, commentSelector);
  I.seeInField(commentSelector, wishComment);

  // Open the Modal
  await scrollToCenter(I, 'Vælg størrelse');
  I.click('Vælg størrelse');
  I.waitForElement('.mfp-content', 10);

  // Wait for the iframe to be present
  I.waitForElement('iframe.mfp-iframe', 10);

  // Switch into iframe context
  I.switchTo('iframe.mfp-iframe');

  // Now interact with the input field inside the iframe
  //Adding 1 Value to Input Field
  I.waitForElement('input[name="matrix_qty[1043]"]', 10);
  await scrollToCenter(I, 'input[name="matrix_qty[1043]"]');
  I.fillField('input[name="matrix_qty[1043]"]', '1');

  I.waitForElement('input[name="matrix_qty[1044]"]', 10);
  await scrollToCenter(I, 'input[name="matrix_qty[1044]"]');
  I.fillField('input[name="matrix_qty[1044]"]', '1');

  // Optionally trigger change
  I.executeScript(() => {
    const inputs = [
      document.querySelector('input[name="matrix_qty[1043]"]'),
      document.querySelector('input[name="matrix_qty[1044]"]')
    ];

    inputs.forEach((input, index) => {
      if (input) {
        input.value = '1'; // Set value to 1
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        console.log(`✅ Input ${index + 1} updated and events dispatched.`);
      } else {
        console.warn(`⚠️ Input ${index + 1} not found.`);
      }
    });
  });
  I.wait(2);

  // Clicking Add to Cart
  await scrollToCenter(I, '#product-addtocart-button');
  I.waitForElement('#product-addtocart-button', 10);
  I.click('#product-addtocart-button');

  I.wait(5);

  await scrollToCenter(I, 'button[data-role="action"][data-action="confirm"]');
  I.waitForElement('button[data-role="action"][data-action="confirm"]', 10);
  I.click('button[data-role="action"][data-action="confirm"]');
  I.say('Confirmed: Clicked "Fortsæt med at shoppe".');

  //Back to the Main Content
  I.switchTo();
  I.wait(10);
  
  //Opening Cart
  I.click('.action.viewcart');
  I.wait(5);

  // Checking Coupon Code || Applying Coupon Code
  await checkCouponCode(I, couponCode);
  I.wait(5);

  // Proceeding to Checkout GLSPakkeshop
  await checkoutMethod1(I, comment);
  I.wait(20);

});
