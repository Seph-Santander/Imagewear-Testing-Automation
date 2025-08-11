const { checkoutMethod2, openCart, checkCouponCode} = require('../../components/checkouts');
const { loginCredentials } = require('../../components/simple_userLogin');
const { validateQuantityBtn } = require('../../components/addToCart_methods');

Feature('Checkout Item With GLSErherv Method');

Scenario('User Logs, Add an item, Check Coupon Code, then Checkout using GLSErherv Method', async ({ I }) => {
    const { email, password } = codeceptjs.config.get().custom;
    const couponCode = '1902testqa';
    const comment = 'this is a test order from 1902';
    const productUrl = 'https://imgwear246.1902dev1.com/karlowsky-graa-tjenerforstykke.html';

    //==========================================================================================================================
    //User Login
    await loginCredentials(I, email, password);
    I.wait(2);

    // Direct to Product Page
    I.amOnPage(productUrl);
    I.wait(1);

    // Adding Product while validating Quantity Button (Optional if theres Already a Product in Cart)
    await validateQuantityBtn(I);
    I.wait(5);

    //Opening Cart
    await openCart(I);
    I.wait(2);
    I.say('Waiting for cart summary...');
    I.waitForElement('.cart-summary', 10);

    //Checking Coupon Code || Applying Coupon Code
    await checkCouponCode(I, couponCode);
    I.wait(3);

    //Proceeding to Checkout GLSPakkeshop
    await checkoutMethod2(I, comment);
    I.wait(20);

});
