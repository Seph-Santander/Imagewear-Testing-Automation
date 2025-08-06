const { addToCartMultiple } = require('../components/addToCart_methods');
const { loginCredentials } = require('../components/simple_userLogin');

Feature('User Login');

Scenario('User logs in with valid credentials and Add item to cart', async ({ I }) => {

    const { email, password } = codeceptjs.config.get().custom;

    const category = 'Køkken & Kantine- Kokketøj';
    const subcategories = 'Kokkejakker';
    const product = "Karlowsky Kortærmet work trøje - Anthrazite";

    

    await loginCredentials(I, email, password);
    I.wait(2);

    I.say('Login submitted. Waiting for dashboard...');

    await addToCartMultiple(I, category, subcategories, product);
    I.wait(5);
});
