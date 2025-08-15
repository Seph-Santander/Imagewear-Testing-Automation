const { loginCredentials } = require('../../components/simple_userLogin');
const { scrollToCenter } = require('../../components/checkouts');
const { clickNyeAddToCartByIndex, fillQtyInputs } = require('../../components/addToCart_methods');

Feature('Validate Sections and Nye Produkter to Cart');

Scenario('User login and Adding Product from Nye Produkter Section to Cart', async ({ I }) => {
    const { email, password } = codeceptjs.config.get().custom;

    const productName = 'Nyhed Vent Sikkerhedssko m/boa';

    //==========================================================================================================================

    //User Login
    await loginCredentials(I, email, password);
    I.wait(5);

    //Refreshing the Page
    I.amOnPage('/');

    //Asserting the Nye Produkter 
    await scrollToCenter(I, '//*[@id="new-products"]/div/div/div[1]/div');

    //Selecting the Product
    await clickNyeAddToCartByIndex(I, productName);
    I.wait(3);

    //Filling Quantity Value to Specific Input Field 
    await fillQtyInputs (I, 2, 1);//Parameter: (I, [Number of Input Field in the Product Page], Quantity Value)
    I.wait(2);

    I.seeElement('#product-addtocart-button');

    //Clicking Add to Cart Button
    I.click('#product-addtocart-button');
    I.wait(10);

});
