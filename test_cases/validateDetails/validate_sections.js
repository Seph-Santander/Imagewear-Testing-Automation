const { loginCredentials } = require('../components/simple_userLogin');
const { scrollToCenter } = require('../components/checkouts');
const { clickFavoriteAddToCartByIndex } = require('../components/addToCart_methods');

Feature('Validate Sections');

Scenario('User login and Check for Visibility of sections', async ({ I }) => {
    const { email, password } = codeceptjs.config.get().custom;
    const productName = 'Cargo herre bukser - sorte - Nybo';

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


    await scrollToCenter(I, '//*[@id="favorite-product"]/div/div/div[1]/div');
    I.wait(2);

    await clickFavoriteAddToCartByIndex(I, productName);
    I.wait(10);
});
