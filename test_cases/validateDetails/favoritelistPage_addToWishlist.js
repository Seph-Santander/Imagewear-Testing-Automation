const { loginCredentials } = require('../components/simple_userLogin');
const { OpenFavoritesPage, inputQuantityBySize } = require('../components/favorites');
const { scrollToCenter} = require('../components/checkouts');

Feature('Adding Item to Wishlist');

Scenario('User logs in with valid credentials and Add item to wishlist', async ({ I }) => {
    const { email, password } = codeceptjs.config.get().custom;
    const wishComment = 'this is my fave!';

    await loginCredentials(I, email, password);
    I.wait(2);

    await OpenFavoritesPage(I);

    I.click('//button[./span[text()="Hoved kategori"]]');
    I.wait(4);
    I.click('//button[./span[text()="Steward"]]');
    I.wait(4);

    await scrollToCenter(I, '#product-item-comment-102376');
    I.wait(1);

    I.fillField('#product-item-comment-102376', wishComment);
    I.wait(1);

    await scrollToCenter(I, 'button[title="Opdater ønskeliste"]');
    I.wait(1);
    I.click('button[title="Opdater ønskeliste"]');
    I.wait(3);

    I.amOnPage('https://imgwear246.1902dev1.com/wishlist/');
    I.say('Reloading the wishlist page to verify the Comment was added');
    I.wait(3);

    I.click('//button[./span[text()="Steward"]]');
    I.wait(5);

    await scrollToCenter(I, '#product-item-comment-102376');
    I.wait(1);

    await scrollToCenter(I, 'Læg i kurv');
    I.wait(1);

    await inputQuantityBySize('C48', '1');
    await inputQuantityBySize('C60', '1');


    

//*[@id="wk-product-matrix"]/tbody/tr/td[2]

    // await scrollToCenter(I, 'input[name="matrix_qty[1044]"]');
    // I.fillField('input[name="matrix_qty[1044]"]', '1');
    // I.wait(0.5);

    // // Optionally, assert the value is set
    // I.seeInField('input[name="matrix_qty[1043]"]', '1');
    // I.seeInField('input[name="matrix_qty[1044]"]', '1');

    // await scrollToCenter(I, '#product-addtocart-button');
    // I.wait(1);

    // // Click the "Læg i kurv" button using I.click for reliability
    // I.click('#product-addtocart-button');
    // I.wait(20);


});
