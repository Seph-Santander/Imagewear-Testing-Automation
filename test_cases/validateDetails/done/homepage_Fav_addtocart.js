const { loginCredentials } = require('../../components/simple_userLogin');
const { scrollToCenter } = require('../../components/checkouts');
const { clickFavoriteAddToCartByIndex, fillQtyInputs } = require('../../components/addToCart_methods');

Feature('Validate Sections');

Scenario('User login and Check for Visibility of sections', async ({ I }) => {
    const { email, password } = codeceptjs.config.get().custom;
    const productName = 'Hvid Kalot med lufthuller';

    await loginCredentials(I, email, password);
    I.wait(5);

    I.say('Login submitted. Waiting for dashboard...');
    
    await scrollToCenter(I, '//*[@id="favorite-product"]/div/div/div[1]/div');
    I.wait(2);
    await scrollToCenter(I, '//*[@id="new-products"]/div/div/div[1]/div');
    I.wait(2);
    await scrollToCenter(I, '//*[@id="category_slider"]');
    I.wait(2);
    await scrollToCenter(I, '//*[@id="maincontent"]/div[2]/div/div[5]/div[1]');
    I.wait(2);

    I.amOnPage('/');

    await scrollToCenter(I, '//*[@id="favorite-product"]/div/div/div[1]/div');
    await clickFavoriteAddToCartByIndex(I, productName);
    I.wait(3);

    await fillQtyInputs (I, 2, 1);// Fill quantity inputs with 3 for the first product
    I.wait(2);
    I.say('Quantity inputs filled with 3 for the first product.');

    I.say('Clicking "Læg i kurv" for the first product...');
    I.seeElement('#product-addtocart-button'); // Confirm it exists

    I.click('#product-addtocart-button'); // Now click it
    I.wait(10);


});
