const { checkoutMethod1} = require('../components/checkouts');
const { loginCredentials } = require('../components/simple_userLogin');

Feature('User Login');

Scenario('User logs in with valid credentials and Add item to cart', async ({ I }) => {
    const { email, password } = codeceptjs.config.get().custom;
      const couponCode = '1902testqa';
      const comment = 'this is a test order from 1902';

    await loginCredentials(I, email, password);
    I.wait(2);

    await checkoutMethod1(I, comment);
    I.wait(5);

});
