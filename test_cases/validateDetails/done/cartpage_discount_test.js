const { loginCredentials } = require('../../components/simple_userLogin');
const { validateQuantityBtn } = require('../../components/addToCart_methods');
const { openCart, scrollElementToCenter, fillBonesInputsAndApplyCoupon, applyCouponIfNeeded, CartchangeQuantity, clickCancelCouponButton } = require('../../components/checkouts');

Feature('Product Page Quantity Button Validation');

Scenario('Validating Product Page Quantity Button', async ({ I }) => {
    const { email, password } = codeceptjs.config.get().custom;
    const couponCode = '1902testqa';
    
    const productUrl = 'https://imgwear246.1902dev1.com/karlowsky-graa-tjenerforstykke.html';

    await loginCredentials(I, email, password);
    I.wait(5);

    I.amOnPage(productUrl);
    I.wait(1);
    
    await validateQuantityBtn(I);
    I.wait(5);

    await openCart(I);
    I.wait(5);

    await fillBonesInputsAndApplyCoupon(I);
    I.wait(5);
    await applyCouponIfNeeded(I, couponCode);
    I.wait(5);
    // await clickCancelCouponButton(I);
    await CartchangeQuantity(I, "decrease", 1);
    I.wait(5);

    I.say('Scrolling and clicking "Proceed to Checkout"...');
    I.waitForElement('[data-role="proceed-to-checkout"]', 10);
    I.click('[data-role="proceed-to-checkout"]');

    I.wait(20);


});