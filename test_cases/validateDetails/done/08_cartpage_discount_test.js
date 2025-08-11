const { loginCredentials } = require('../../components/simple_userLogin');
const { validateQuantityBtn } = require('../../components/addToCart_methods');
const { openCart, fillBonesInputsAndApplyCoupon, applyCouponIfNeeded, CartchangeQuantity } = require('../../components/checkouts');

Feature('Product Page Quantity Button Validation');

Scenario('Validating Product Page Quantity Button', async ({ I }) => {
    const { email, password } = codeceptjs.config.get().custom;
    const couponCode = '1902testqa';
    const productCouponCode = '1902 test';
    const productUrl = 'https://imgwear246.1902dev1.com/karlowsky-graa-tjenerforstykke.html';

    //==========================================================================================================================
    //User Login
    await loginCredentials(I, email, password);
    I.wait(5);

    //Redirect to Product Page
    I.amOnPage(productUrl);
    I.wait(1);
    
    //Adding Quantity Value to the Product then Add to Cart
    await validateQuantityBtn(I);
    I.wait(5);

    //Opening Cart
    await openCart(I);
    I.wait(5);

    //Adding Coupon Code to each Product
    await fillBonesInputsAndApplyCoupon(I, productCouponCode);
    I.wait(5);

    //Check if theres already Coupon code, then Input if none
    await applyCouponIfNeeded(I, couponCode);
    I.wait(5);
    
    //Increase or Decrease Quantity Value of the product
    await CartchangeQuantity(I, "decrease", 1);// Parameter: (I, [decrease, increase], [number of clicks])
    I.wait(5);

    //Proceeding to Check out
    I.say('Scrolling and clicking "Proceed to Checkout"...');
    I.waitForElement('[data-role="proceed-to-checkout"]', 10);
    I.click('[data-role="proceed-to-checkout"]');

    I.wait(20);
});