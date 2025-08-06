const { loginCredentials } = require('../../components/simple_userLogin');
const { validateQuantityBtn } = require('../../components/addToCart_methods');

Feature('Product Page Quantity Button Validation');

Scenario('Validating Product Page Quantity Button', async ({ I }) => {
    const { email, password } = codeceptjs.config.get().custom;
    const productUrl = 'https://imgwear246.1902dev1.com/karlowsky-graa-tjenerforstykke.html';

    await loginCredentials(I, email, password);
    I.wait(1);

    I.amOnPage(productUrl);
    I.wait(1);
    await validateQuantityBtn(I);
    I.wait(5);
});