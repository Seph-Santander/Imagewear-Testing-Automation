const { loginCredentials } = require('../../components/simple_userLogin');
const { validateQuantityBtn } = require('../../components/addToCart_methods');

Feature('Validating Product Page Quantity Button');

Scenario('Validating Product Page Quantity Button', async ({ I }) => {
    const { email, password } = codeceptjs.config.get().custom;

    const productUrl = 'https://imgwear246.1902dev1.com/karlowsky-graa-tjenerforstykke.html';

    //==========================================================================================================================
    //User Login
    await loginCredentials(I, email, password);
    I.wait(1);

    //Redirect to Product Page
    I.amOnPage(productUrl);
    I.wait(1);

    //Adding Quantity Value to the Product then Add to Cart
    await validateQuantityBtn(I);
    I.wait(10);
});