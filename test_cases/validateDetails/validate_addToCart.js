const { addToCart } = require('../components/addToCart_methods');
const { dynamic_adding_item } = require('../components/dynamic_addToCart');
const { loginCredentials } = require('../components/simple_userLogin');

Feature('User Login');

Scenario('User logs in with valid credentials and Add item to cart', async ({ I }) => {
    const { email, password } = codeceptjs.config.get().custom;

    const category = 'Elegante manager fodtøj';
    const product = "";



    await loginCredentials(I, email, password);
    I.wait(2);

    I.say('Login submitted. Waiting for dashboard...');

    await dynamic_adding_item(I, category, product)


});
