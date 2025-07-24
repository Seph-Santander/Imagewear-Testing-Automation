const { addToCart } = require('../components/simple_addToCart');
const { loginCredentials } = require('../components/simple_userLogin');

Feature('User Login');

Scenario('User logs in with valid credentials and Add item to cart', async ({ I }) => {

    const email = 'nineteen02merry@gmail.com';
    const password = 'merry@190200';

    const category = 'Køkken & Kantine- Kokketøj';
    const product = "Karlowsky URBAN stone grey farvet forstykke";

    await loginCredentials(I, email, password);
    I.wait(2);

    I.say('Login submitted. Waiting for dashboard...');

    await addToCart(I, category, product)
});
