const { checkoutMethod1 } = require('../components/checkouts');
const { loginCredentials } = require('../components/simple_userLogin');

Feature('User Login');

Scenario('User logs in with valid credentials and Add item to cart', async ({ I }) => {
    const email = 'nineteen02merry@gmail.com';
    const password = 'merry@190200';

    await loginCredentials(I, email, password);
    I.wait(2);

    await checkoutMethod1(I)

});
