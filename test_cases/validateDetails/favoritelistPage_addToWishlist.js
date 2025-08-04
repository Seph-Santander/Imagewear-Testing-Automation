const { loginCredentials } = require('../components/simple_userLogin');
const { OpenFavoritesPage } = require('../components/favorites');
const { scrollToCenter } = require('../components/checkouts');

Feature('Adding Item to Wishlist');

Scenario('User logs in and adds item to wishlist with comment and quantity', async ({ I }) => {
  const { email, password } = codeceptjs.config.get().custom;
  const wishComment = 'this is my fave!';

  // Login
  await loginCredentials(I, email, password);
  I.wait(2);

  // Open Wishlist page
  await OpenFavoritesPage(I);

  // Filter by category: "Hoved kategori" > "Steward"
  I.click('//button[./span[text()="Hoved kategori"]]');
  I.waitForElement('//button[./span[text()="Steward"]]', 10);
  I.click('//button[./span[text()="Steward"]]');
  I.wait(2);

  // Add comment to a specific product
  const commentSelector = '#product-item-comment-102376';
  await scrollToCenter(I, commentSelector);
  I.fillField(commentSelector, wishComment);

  // Update wishlist
  await scrollToCenter(I, 'button[title="Opdater ønskeliste"]');
  I.click('button[title="Opdater ønskeliste"]');
  I.wait(3);

  // Reload wishlist page
  I.amOnPage('https://imgwear246.1902dev1.com/wishlist/');
  I.say('Reloading the wishlist page to verify the comment was saved');
  I.wait(3);

  // Filter category again after reload
  I.click('//button[./span[text()="Steward"]]');
  I.wait(3);

  // Confirm comment is still there
  await scrollToCenter(I, commentSelector);
  I.seeInField(commentSelector, wishComment);

  // Open configuration modal
  await scrollToCenter(I, 'Vælg størrelse');
  I.click('Vælg størrelse');

  // Wait for modal to appear
  I.waitForElement('.mfp-content', 60);
  I.say('Modal appeared.');

  // Use updated selector for quantity input
  const quantityInput = '//*[@data-attribute-position="1043"]';
  I.waitForElement(quantityInput, 60);
  I.say('Quantity input field is visible.');

  await scrollToCenter(I, quantityInput);

  // Interact with quantity input inside modal
  within('.mfp-content', () => {
    I.click(quantityInput);
    I.fillField(quantityInput, '1');
  });

  I.say('Set quantity to 1 inside modal.');
});
